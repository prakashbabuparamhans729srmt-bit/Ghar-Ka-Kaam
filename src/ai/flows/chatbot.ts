'use server';
/**
 * @fileOverview A simple chatbot flow for Ghar Ka Kaam.
 *
 * - chat - A function to handle chat interactions.
 * - ChatInput - The input type for the chat function.
 * - ChatOutput - The return type for the chat function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChatInputSchema = z.object({
    history: z.array(z.object({
        role: z.enum(['user', 'model']),
        content: z.string(),
    })).describe('The chat history.'),
  message: z.string().describe('The user\'s message.'),
});
export type ChatInput = z.infer<typeof ChatInputSchema>;

export type ChatOutput = string;

export async function chat(input: ChatInput): Promise<ChatOutput> {
  return chatFlow(input);
}

const prompt = ai.definePrompt({
  name: 'chatbotPrompt',
  input: {schema: ChatInputSchema},
  prompt: `You are a helpful assistant for "Ghar Ka Kaam", a platform that connects customers with home service providers. Your name is "Kaam-Bot".
  Keep your responses concise and helpful. The user is asking for help on the platform.

  Here is the chat history so far:
  {{#each history}}
  {{role}}: {{{content}}}
  {{/each}}

  And here is the new message from the user:
  user: {{{message}}}

  Generate the next response as the model.
`,
});

const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: ChatInputSchema,
    outputSchema: z.string(),
  },
  async ({history, message}) => {
    const response = await prompt({
        history,
        message,
    });
    return response.text;
  }
);
