import { useState } from "react";
import { calculateAge, type AgeResult } from "../helpers";
import { useDate } from "../hooks";
import { initialValues, validationRules } from "../validations/rules";
import Button from "./Button";
import styles from "./Calculator.module.css";
import Info from "./Info";
import Input from "./Input";

const {
  section,
  form,
  inputs_group,
  aria_submit,
  divider_left,
  divider_right,
  results_group,
} = styles;

type InputInfo = {
  id: string;
  length: number;
  label: Fields;
  placeholder: string;
};

const inputs: InputInfo[] = [
  {
    id: "input-day",
    length: 2,
    label: "day",
    placeholder: "15",
  },
  {
    id: "input-month",
    length: 2,
    label: "month",
    placeholder: "03",
  },
  {
    id: "input-year",
    length: 4,
    label: "year",
    placeholder: "1999",
  },
];

const Calculator = () => {
  const [result, setResult] = useState<AgeResult>({
    years: null,
    months: null,
    days: null,
  });
  const { values, errors, getInputProps, handleSubmit } = useDate({
    initialValues,
    validationRules,
    onSubmit: (values, reset) => {
      setResult(calculateAge(values.date));
      reset();
    },
  });

  return (
    <section className={section}>
      <form
        className={form}
        onSubmit={handleSubmit}
      >
        <div className={inputs_group}>
          {inputs.map(({ id, label, length, placeholder }) => (
            <Input
              key={id}
              id={id}
              label={label}
              maxLength={length}
              placeholder={placeholder}
              value={values[label]}
              error={
                errors[label]
                  ? errors[label]
                  : label === "day"
                  ? errors.date
                  : Boolean(errors.date)
              }
              errorMessageId={errors.date ? "invalid-date" : undefined}
              {...getInputProps(label)}
            />
          ))}
        </div>

        <div className={aria_submit}>
          <hr className={divider_left} />
          <Button />
          <hr className={divider_right} />
        </div>
      </form>

      <div className={results_group}>
        <Info
          value={result.years}
          label="years"
        />
        <Info
          value={result.months}
          label="months"
        />
        <Info
          value={result.days}
          label="days"
        />
      </div>
    </section>
  );
};

export default Calculator;
