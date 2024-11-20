export const getTodayDate = () => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

export const getSpecialDayBeforeDate = (target: Date, days: number) => {
  const date = new Date(target);
  date.setDate(date.getDate() - days);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const getDatesInRange = (targetDate: string, range: number) => {
  const dates: string[] = [];
  const target = new Date(targetDate);
  for (let i = 0; i < range; i++) {
    dates.push(getSpecialDayBeforeDate(target, i + 1));
  }
  return dates;
};