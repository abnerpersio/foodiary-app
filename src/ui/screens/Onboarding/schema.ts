import { onboradingBaseSchema } from "@/ui/utils/onboarding";
import z from "zod";

export const onboardingSchema = onboradingBaseSchema.extend({
  account: z
    .object({
      name: z.string().min(1, "Informe seu nome"),
      email: z.email("Informe um e-mail válido"),
      password: z.string().min(8, "Pelo menos 8 caracteres"),
      confirmPassword: z.string().min(1, "Confirme a sua senha"),
    })
    .refine(({ password, confirmPassword }) => password === confirmPassword, {
      path: ["confirmPassword"],
      message: "As senhas não coincidem",
    }),
});

export type OnboardingSchema = z.infer<typeof onboardingSchema>;
