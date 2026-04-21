import z from "zod";

const schema = z.object({
  apiBaseUrl: z.string().min(1),
});

export const Env = schema.parse({
  apiBaseUrl: process.env.EXPO_PUBLIC_API_BASE_URL,
});
