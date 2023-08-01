import { type FC, type InputHTMLAttributes } from "react";
import styles from "./Input.module.css";

type InputAttributes = InputHTMLAttributes<HTMLInputElement>;

interface InputProps extends Omit<InputAttributes, "className" | "type"> {
  id: string;
  label: string;
  error?: string | boolean;
  errorMessageId?: string;
}

const { root, label: _label, input, message } = styles;

const Input: FC<InputProps> = ({
  id,
  label,
  error,
  errorMessageId,
  ...rest
}) => {
  return (
    <div className={root}>
      <label
        htmlFor={id}
        className={_label}
        data-error={error ? true : undefined}
      >
        {label}
      </label>
      <input
        type="text"
        id={id}
        inputMode="numeric"
        className={input}
        aria-invalid={error ? true : undefined}
        aria-errormessage={
          errorMessageId ? errorMessageId : error ? `error-${id}` : undefined
        }
        aria-autocomplete="none"
        {...rest}
      />
      {typeof error === "string" && (
        <span
          id={errorMessageId ? errorMessageId : `error-${id}`}
          role="alert"
          className={message}
        >
          {error}
        </span>
      )}
    </div>
  );
};

export default Input;
