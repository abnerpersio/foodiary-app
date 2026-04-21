import { ActivityLevel } from "@/app/types/ActivityLevel";
import { Gender } from "@/app/types/Gender";
import { Goal } from "@/app/types/Goal";
import { addYears, isBefore } from "@/ui/utils/date";
import z from "zod";

const MIN_YEARS = 14;

export const onboardingSchema = z.object({
  goal: z.enum(Goal),
  gender: z.enum(Gender),
  birthDate: z.date("Insira uma data").refine(
    (date) => {
      const minDate = addYears(new Date(), -MIN_YEARS);
      return isBefore(date, minDate);
    },
    {
      message: `Você deve ter pelo menos ${MIN_YEARS} anos`,
    },
  ),
  height: z.string().min(1, "Informe a sua altura"),
  weight: z.string().min(1, "Informe o seu peso"),
  activityLevel: z.enum(ActivityLevel),
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
