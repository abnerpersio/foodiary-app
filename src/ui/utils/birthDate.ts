import { addYears, isBefore } from "@/ui/utils/date";
import z from "zod";

const MIN_YEARS = 14;

export const birthDateSchema = z.date("Insira uma data").refine(
  (date) => {
    const minDate = addYears(new Date(), -MIN_YEARS);
    return isBefore(date, minDate);
  },
  {
    message: `Você deve ter pelo menos ${MIN_YEARS} anos`,
  },
);
