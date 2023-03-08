import { startOfWeek, endOfWeek } from "date-fns";

export function getCurrentWeek(date) {
  const weekStart = startOfWeek(date, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(date, { weekStartsOn: 1 });
  return { weekStart, weekEnd };
}
