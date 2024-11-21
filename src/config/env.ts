import { z } from 'zod';

const envSchema = z.object({
  FMP_API_KEY: z.string().min(1, { message: 'API Key must not be empty' }),
  FMP_API_URL: z.string().url({ message: 'Must be a valid URL' }),
});

export const env = (() => {
  try {
    return envSchema.parse({
      FMP_API_KEY: import.meta.env.VITE_FMP_API_KEY,
      FMP_API_URL: import.meta.env.VITE_FMP_API_URL,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Environment Variable Validation Failed:', error.errors);
      throw new Error('Invalid environment configuration');
    }
    throw error;
  }
})();
