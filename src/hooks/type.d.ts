type Fields = "day" | "month" | "year" | "date";
type Values = Record<Fields, string>;
type Errors = Record<Fields, string>;

type ShouldValidate = React.MutableRefObject<Record<keyof Values, boolean>>;

type Validate = Record<Fields, (value: string) => string | null>;

type ValidateInput = (values: Values) => Validate;

interface UseDate {
  initialValues: Values;
  validationRules: ValidateInput;
  onSubmit: (values: Values, reset: () => void) => void;
}
