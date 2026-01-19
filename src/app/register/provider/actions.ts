"use server";

import { verifyProvider } from "@/ai/flows/provider-verification";
import { z } from "zod";

const formSchema = z.object({
  serviceType: z.string(),
  experience: z.coerce.number(),
  certifications: z.array(z.string()),
  workArea: z.string(),
  name: z.string(),
  documents: z.array(z.string()),
});

export type FormState = {
  message: string;
  fields?: Record<string, string>;
  issues?: string[];
  data?: {
    isValid: boolean;
    reason: string;
  };
};

export async function onRegister(
  prevState: FormState,
  data: FormData
): Promise<FormState> {
  const formData = Object.fromEntries(data);
  const parsed = formSchema.safeParse({
    ...formData,
    certifications: data.getAll("certifications"),
    documents: data.getAll("documents"),
  });

  if (!parsed.success) {
    const issues = parsed.error.issues.map((issue) => issue.message);
    return {
      message: "फॉर्म अमान्य है।",
      issues,
    };
  }

  try {
    const result = await verifyProvider(parsed.data);
    if (!result.isValid) {
      return {
        message: "AI सत्यापन विफल",
        data: result,
      };
    }
    return {
      message: "सत्यापन सफल!",
      data: result,
    };
  } catch (e) {
    return {
      message: "सत्यापन के दौरान एक त्रुटि हुई।",
    };
  }
}
