export const DAYS_OF_WEEK = ["일", "월", "화", "수", "목", "금", "토"] as const;

export function getDaysInMonth(date: Date): (Date | null)[] {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();

  const days: (Date | null)[] = [];

  for (let i = 0; i < startingDayOfWeek; i++) days.push(null);
  for (let day = 1; day <= daysInMonth; day++) days.push(new Date(year, month, day));

  return days;
}

export function isSameDay(date1: Date | null, date2: Date | null) {
  if (!date1 || !date2) return false;
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
}

export function isInRange(date: Date, startDate: Date | null, endDate: Date | null) {
  if (!startDate || !endDate) return false;
  return date >= startDate && date <= endDate;
}

export function formatDateRange(startDate: Date | null, endDate: Date | null) {
  if (!startDate) return "날짜를 선택해주세요";
  const startStr = `${startDate.getMonth() + 1}/${startDate.getDate()}`;
  if (!endDate) return `${startStr} ~ ?`;
  const endStr = `${endDate.getMonth() + 1}/${endDate.getDate()}`;
  return `${startStr} ~ ${endStr}`;
}

export function monthLabel(date: Date) {
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월`;
}

export function isToday(date: Date) {
  return isSameDay(date, new Date());
}
