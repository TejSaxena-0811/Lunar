import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  format,
  isSameMonth,
} from "date-fns";

export function generateCalendar(date) {
  const startMonth = startOfMonth(date);
  const endMonth = endOfMonth(date);

  const startDate = startOfWeek(startMonth);
  const endDate = endOfWeek(endMonth);

  const days = [];
  let current = startDate;

  while (current <= endDate) {
    days.push(current);
    current = addDays(current, 1);
  }

  return days;
}

export function formatDay(date) {
  return format(date, "d");
}

export function isCurrentMonth(date, currentMonth) {
  return isSameMonth(date, currentMonth);
}