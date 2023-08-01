type Keys = "years" | "months" | "days";
export type AgeResult = Record<Keys, number | null>;

export const isValidDate = (date: string) => {
  const [year, month, day] = date.split("-").map(Number);
  const dateObj = new Date(year, month - 1, day);

  return (
    dateObj.getFullYear() === year &&
    dateObj.getMonth() + 1 === month &&
    dateObj.getDate() === day
  );
};

export const calculateAge = (date: string) => {
  const birthdate = new Date(date).getTime();
  const currentDate = new Date().getTime();

  // Calculate the difference in milliseconds between both dates
  const difference = currentDate - birthdate;

  // Calculate age: years, months and days
  const age: AgeResult = { years: null, months: null, days: null };
  age.years = Math.floor(difference / (365.25 * 24 * 60 * 60 * 1000));
  const ageInMs = difference - age.years * 365.25 * 24 * 60 * 60 * 1000;
  age.months = Math.floor(ageInMs / (30.44 * 24 * 60 * 60 * 1000));
  const edadEnDias = ageInMs - age.months * 30.44 * 24 * 60 * 60 * 1000;
  age.days = Math.floor(edadEnDias / (24 * 60 * 60 * 1000));

  return age;
};
