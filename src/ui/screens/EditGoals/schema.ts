import { z } from "zod";

export const goalsSchema = z.object({
  calories: z.string().min(1, "Informe as calorias"),
  carbohydrates: z.string().min(1, "Informe os carboidratos"),
  proteins: z.string().min(1, "Informe as proteínas"),
  fats: z.string().min(1, "Informe as gorduras"),
});

export type GoalsSchema = z.infer<typeof goalsSchema>;
