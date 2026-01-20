"use server";

import { verifyProvider } from "@/ai/flows/provider-verification";
import { z } from "zod";

const formSchema = z.object({
  serviceType: z.string(),
  experience: z.coerce.number(),
  certifications: z.array(z.string()),
  workArea: z.string(),
  name: z.string(),
  mobile: z.string().min(10, { message: "validation_mobile_10_digits" }),
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
      message: "form_invalid",
      issues,
    };
  }
  
  // We remove mobile from data sent to AI verification
  const { mobile, ...aiData } = parsed.data;

  try {
    const result = await verifyProvider(aiData);
    if (!result.isValid) {
      return {
        message: "ai_verification_failed",
        data: result,
      };
    }
    return {
      message: "verification_successful",
      data: result,
    };
  } catch (e) {
    return {
      message: "verification_error",
    };
  }
}
