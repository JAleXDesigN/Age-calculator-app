import { isValidDate } from "../helpers";

export const initialValues: Values = {
  day: "",
  month: "",
  year: "",
  date: "",
};

export const validationRules: ValidateInput = (values) => ({
  day: (value) => {
    const day = Number(value);
    if (value.length === 0) return "This field is required";
    if (!(day > 0 && day <= 31)) return "Must be a valid day";
    return null;
  },
  month: (value) => {
    const month = Number(value);
    if (value.length === 0) return "This field is required";
    if (!(month > 0 && month <= 12)) return "Must be a valid month";
    return null;
  },
  year: (value) => {
    const year = Number(value);
    if (value.length === 0) return "This field is required";
    if (year >= new Date().getFullYear()) return "Must be in the past";
    return null;
  },
  date: () => {
    const { day, month, year } = values;

    return isValidDate(`${year}-${month}-${day}`)
      ? null
      : "Must be a valid date";
  },
});
