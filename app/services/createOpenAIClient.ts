import OpenAI from 'openai';
import { EphemeralSession } from './ephemeralSession';

/**
 * Creates an OpenAI client using an ephemeral session key
 * @param session The ephemeral session containing the API key
 * @returns An OpenAI client instance
 */
export function createOpenAIClient(session: EphemeralSession): OpenAI {
  if (!session || !session.client_secret || !session.client_secret.value) {
    throw new Error('Invalid session: missing client_secret or value');
  }

  return new OpenAI({
    apiKey: session.client_secret.value,
    dangerouslyAllowBrowser: true, // Required for client-side usage
  });
}

/**
 * Creates an OpenAI client using the environment API key
 * This should only be used server-side
 * @returns An OpenAI client instance
 */
export function createServerOpenAIClient(): OpenAI {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('Missing OPENAI_API_KEY environment variable');
  }

  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
} 