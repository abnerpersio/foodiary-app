import { Gender } from "@/app/types/Gender";
import { birthDateSchema } from "@/ui/utils/birthDate";
import { z } from "zod";

export const editProfileSchema = z.object({
  name: z.string().min(1, "Informe o nome"),
  birthDate: birthDateSchema,
  height: z.string().min(1, "Informe a altura"),
  weight: z.string().min(1, "Informe o peso"),
  gender: z.enum(Gender, { error: "Selecione o gênero" }),
});

export type EditProfileSchema = z.infer<typeof editProfileSchema>;
