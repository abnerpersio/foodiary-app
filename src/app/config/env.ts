import z from "zod";

const schema = z.object({
  apiBaseUrl: z.string().min(1),
  cognitoClientId: z.string().min(1),
  cognitoDomain: z.string().min(1),
});

export const Env = schema.parse({
  apiBaseUrl: process.env.EXPO_PUBLIC_API_BASE_URL,
  cognitoClientId: process.env.EXPO_PUBLIC_COGNITO_CLIENT_ID,
  cognitoDomain: process.env.EXPO_PUBLIC_COGNITO_DOMAIN,
});
