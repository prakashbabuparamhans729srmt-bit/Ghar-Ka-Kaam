import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

const key = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

export const aiFeaturesEnabled = !!key;

export const ai = genkit({
  plugins: aiFeaturesEnabled ? [googleAI()] : [],
  model: 'googleai/gemini-2.5-flash',
});
