'use server';
/**
 * @fileOverview This file defines an AI-powered provider matching flow for the Ghar Ka Kaam platform.
 *
 * It takes customer requirements and provider details as input and uses AI to find the best provider.
 * @fileOverview This file defines an AI-powered provider matching flow for the Ghar Ka Kaam platform.
 *
 * It takes customer requirements and provider details as input and uses AI to find the best provider.
 * - findBestProvider - A function that handles the provider matching process.
 * - FindBestProviderInput - The input type for the findBestProvider function.
 * - FindBestProviderOutput - The return type for the findBestProvider function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FindBestProviderInputSchema = z.object({
  serviceType: z.string().describe('The type of service requested (e.g., plumbing, electrical).'),
  customerLocation: z.string().describe('The location of the customer requesting the service.'),
  customerRequirements: z.string().describe('Specific requirements or preferences of the customer.'),
  providerDetails: z.array(
    z.object({
      providerId: z.string().describe('Unique identifier for the service provider.'),
      realTimeLocation: z.string().describe('The provider\'s current location.'),
      rating: z.number().describe('The provider\'s average rating.'),
      completionRate: z.number().describe('The percentage of jobs completed by the provider.'),
      responseTime: z.string().describe('The average response time of the provider.'),
      price: z.number().describe('The starting price for the provider\'s services.'),
      skills: z.array(z.string()).describe('List of skills of the provider'),
    })
  ).describe('An array of provider objects with their details.'),
});
export type FindBestProviderInput = z.infer<typeof FindBestProviderInputSchema>;

const FindBestProviderOutputSchema = z.object({
  bestProviderId: z.string().describe('The ID of the provider that best matches the customer requirements.'),
  reasoning: z.string().describe('Explanation of why this provider was chosen.'),
});
export type FindBestProviderOutput = z.infer<typeof FindBestProviderOutputSchema>;

export async function findBestProvider(input: FindBestProviderInput): Promise<FindBestProviderOutput> {
  return findBestProviderFlow(input);
}

const prompt = ai.definePrompt({
  name: 'findBestProviderPrompt',
  input: {schema: FindBestProviderInputSchema},
  output: {schema: FindBestProviderOutputSchema},
  prompt: `You are an AI assistant designed to find the best service provider for a customer, given their requirements and a list of available providers.

Here's the customer's service request:
Service Type: {{{serviceType}}}
Customer Location: {{{customerLocation}}}
Customer Requirements: {{{customerRequirements}}}

Here are the available providers:
{{#each providerDetails}}
Provider ID: {{{providerId}}}
Real-Time Location: {{{realTimeLocation}}}
Rating: {{{rating}}}
Completion Rate: {{{completionRate}}}
Response Time: {{{responseTime}}}
Price: {{{price}}}
Skills: {{skills}}
{{/each}}

Based on this information, select the best provider and explain your reasoning. Consider factors such as proximity, rating, skills relevant to the service type, and any specific customer requirements.

Return only JSON. Make sure you return a valid JSON.
Here is the schema for the output:
${JSON.stringify(FindBestProviderOutputSchema.describe)}
`,
});

const findBestProviderFlow = ai.defineFlow(
  {
    name: 'findBestProviderFlow',
    inputSchema: FindBestProviderInputSchema,
    outputSchema: FindBestProviderOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
