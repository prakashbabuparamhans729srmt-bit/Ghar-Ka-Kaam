// This file implements the Genkit flow for verifying service providers through background checks and certifications using AI.

'use server';

/**
 * @fileOverview Verifies service providers through background checks and certifications using AI.
 *
 * - verifyProvider - A function that handles the provider verification process.
 * - VerifyProviderInput - The input type for the verifyProvider function.
 * - VerifyProviderOutput - The return type for the verifyProvider function.
 */

import {ai, aiFeaturesEnabled} from '@/ai/genkit';
import {z} from 'genkit';

const VerifyProviderInputSchema = z.object({
  name: z.string().describe('The name of the service provider.'),
  experience: z.number().describe('The years of experience of the service provider.'),
  certifications: z.array(z.string()).describe('The list of certifications of the service provider.'),
  documents: z.array(z.string()).describe('The documents of the service provider as data URIs that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.'),
});
export type VerifyProviderInput = z.infer<typeof VerifyProviderInputSchema>;

const VerifyProviderOutputSchema = z.object({
  isValid: z.boolean().describe('Whether the service provider is valid or not.'),
  reason: z.string().describe('The reason for the validity of the service provider.'),
});
export type VerifyProviderOutput = z.infer<typeof VerifyProviderOutputSchema>;

let verifyProviderFlow: (input: VerifyProviderInput) => Promise<VerifyProviderOutput>;

if (aiFeaturesEnabled) {
  const prompt = ai.definePrompt({
    name: 'verifyProviderPrompt',
    input: {schema: VerifyProviderInputSchema},
    output: {schema: VerifyProviderOutputSchema},
    prompt: `You are an expert in verifying service providers.

  You will use the following information to determine whether the service provider is valid or not.

  Name: {{{name}}}
  Experience: {{{experience}}}
  Certifications: {{#each certifications}}- {{{this}}}\n{{/each}}
  Documents: {{#each documents}}{{media url=this}}\n{{/each}}

  Based on the information provided, determine whether the service provider is valid or not. If the service provider is not valid, provide a reason.
`,
  });

  verifyProviderFlow = ai.defineFlow(
    {
      name: 'verifyProviderFlow',
      inputSchema: VerifyProviderInputSchema,
      outputSchema: VerifyProviderOutputSchema,
    },
    async input => {
      const {output} = await prompt(input);
      return output!;
    }
  );
}


export async function verifyProvider(input: VerifyProviderInput): Promise<VerifyProviderOutput> {
  if (!aiFeaturesEnabled) {
    return {
      isValid: false,
      reason: 'ai_verification_unavailable',
    };
  }
  return verifyProviderFlow(input);
}
