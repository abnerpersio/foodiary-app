import { ActivityLevel } from "@/app/types/ActivityLevel";
import { Gender } from "@/app/types/Gender";
import { Goal } from "@/app/types/Goal";
import z from "zod";
import { birthDateSchema } from "./birthDate";

export const onboradingBaseSchema = z.object({
  goal: z.enum(Goal),
  gender: z.enum(Gender),
  birthDate: birthDateSchema,
  height: z.string().min(1, "Informe a sua altura"),
  weight: z.string().min(1, "Informe o seu peso"),
  activityLevel: z.enum(ActivityLevel),
});

export type OnboardingBaseSchema = z.infer<typeof onboradingBaseSchema>;
