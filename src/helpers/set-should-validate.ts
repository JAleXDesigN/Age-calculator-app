export const setShouldValidate = <T>(values: T, value: boolean) => {
  const result = {} as Record<keyof T, boolean>;

  for (const key in values) {
    if (Object.prototype.hasOwnProperty.call(values, key)) {
      result[key] = value;
    }
  }

  return result;
};
