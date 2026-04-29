import { onboradingBaseSchema } from "@/ui/utils/onboarding";
import z from "zod";

export const completeProfileSchema = onboradingBaseSchema.extend({
  name: z.string().min(1, "Informe seu nome"),
});

export type CompleteProfileSchema = z.infer<typeof completeProfileSchema>;
