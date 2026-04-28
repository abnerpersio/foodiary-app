export const SECOND = 1000;
export const MINUTE = 60 * SECOND;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;
const MINUTE_TO_SECOND = 60;

export const isBefore = (a: Date, b: Date) => {
  const first = new Date(a);
  const last = new Date(b);
  first.setHours(0, 0, 0, 0);
  last.setHours(0, 0, 0, 0);
  const diff = Math.trunc((first.getTime() - last.getTime()) / DAY);
  return diff <= 0;
};

export const isAfter = (a: Date, b: Date) => {
  const first = new Date(a);
  const last = new Date(b);
  first.setHours(0, 0, 0, 0);
  last.setHours(0, 0, 0, 0);
  const diff = Math.trunc((first.getTime() - last.getTime()) / DAY);
  return diff > 0;
};

export const isSame = (a: Date, b: Date) => {
  return a.toDateString() === b.toDateString();
};

export const addYears = (date: Date, qty: number) => {
  const final = new Date(date);
  final.setFullYear(final.getFullYear() + qty);
  return final;
};

export const formatSeconds = (seconds: number) => {
  const minutes = Math.floor(seconds / MINUTE_TO_SECOND);
  const remainingSeconds = Math.floor(seconds % MINUTE_TO_SECOND);

  return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
};
