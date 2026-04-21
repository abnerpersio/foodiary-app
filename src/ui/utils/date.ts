export const formatDate = (date: Date) =>
  new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

export const isBefore = (a: Date, b: Date) => {
  const first = new Date(a);
  const last = new Date(b);
  first.setHours(0, 0, 0, 0);
  last.setHours(0, 0, 0, 0);
  const diff = Math.trunc((first.getTime() - last.getTime()) / DAY);
  return diff <= 0;
};

export const addYears = (date: Date, qty: number) => {
  const final = new Date(date);
  final.setFullYear(final.getFullYear() + qty);
  return final;
};
