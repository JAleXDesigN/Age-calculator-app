import { useCallback, useRef, useState } from "react";
import { setShouldValidate } from "../helpers";

const useDate = ({
  initialValues = {} as Values,
  validationRules,
  onSubmit,
}: UseDate) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<Partial<Errors>>({});

  const shouldValidate = useRef(setShouldValidate(initialValues, false));

  const setFieldValue = useCallback((path: keyof Values, value: string) => {
    setValues((prev) => ({ ...prev, [path]: value }));
  }, []);

  const setFieldError = useCallback(
    (path: keyof Values, value: string | null) => {
      const copyErrors = { ...errors, date: errors.date };
      value ? (copyErrors[path] = value) : delete copyErrors[path];
      if (errors[path] && errors[path] === value) return;
      setErrors(copyErrors);
    },
    [errors]
  );

  const updateShouldValidate = useCallback(
    (path: keyof Values, value: boolean) => {
      shouldValidate.current = { ...shouldValidate.current, [path]: value };
    },
    []
  );

  const validateField = useCallback(
    (path: keyof Values, value: string) => {
      if (!shouldValidate.current[path]) return;
      const updatedValues = { ...values, [path]: value };
      const rules = validationRules(updatedValues);
      const errorPath = rules[path](value);
      setFieldError(path, errorPath);
    },
    [values, setFieldError, validationRules]
  );

  const handleReset = useCallback(() => {
    setValues(initialValues);
    setErrors({} as Errors);
    shouldValidate.current = setShouldValidate(initialValues, false);
  }, [initialValues]);

  const getInputProps = useCallback(
    (path: keyof Values) => {
      const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const { value } = event.currentTarget;
        if (isNaN(Number(value))) return;

        setFieldValue(path, value);
        validateField(path, value);
      };

      const onBlur: React.FocusEventHandler<HTMLInputElement> = (event) => {
        const { value } = event.currentTarget;
        if (value === initialValues[path] && !shouldValidate.current[path]) {
          return;
        }
        if (value.length === 1) setFieldValue(path, `0${value}`);
        updateShouldValidate(path, true);
        validateField(path, value);
      };

      const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = () => {
        if (errors.date && shouldValidate.current[path]) {
          setErrors({});
        }
      };

      return {
        onChange,
        onBlur,
        onKeyDown,
      };
    },
    [initialValues, errors, setFieldValue, updateShouldValidate, validateField]
  );

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = useCallback(
    (event) => {
      event.preventDefault();
      shouldValidate.current = setShouldValidate(initialValues, true);

      const paths: Fields[] = ["day", "month", "year", "date"];
      const rules = validationRules(values);
      const newErrors = {} as Errors;

      for (const path of paths) {
        if (path !== "date" || Object.keys(newErrors).length === 0) {
          const errorPath = rules[path](values[path]);
          if (errorPath) {
            newErrors[path] = errorPath;
          }
        }
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
      } else {
        const { year, month, day } = values;
        const newDateValue = `${year}-${month}-${day}`;
        setFieldValue("date", newDateValue);

        // New object with the updated "date" field value
        const updatedValues = { ...values, date: newDateValue };
        onSubmit(updatedValues, handleReset);
      }
    },
    [
      initialValues,
      values,
      handleReset,
      setFieldValue,
      validationRules,
      onSubmit,
    ]
  );

  return {
    values,
    errors,
    getInputProps,
    handleSubmit,
  };
};

export default useDate;
