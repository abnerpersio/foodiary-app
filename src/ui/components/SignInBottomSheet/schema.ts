import z from "zod";

export const signInSchema = z.object({
  email: z.email("Informe um email válido"),
  password: z.string().min(1, "Digite sua senha"),
});

export type SignInSchema = z.infer<typeof signInSchema>;
