import styles from "./Button.module.css";

const { root } = styles;

const Button = () => {
  return (
    <button
      type="submit"
      className={root}
      aria-label="Calculate age"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 46 44"
      >
        <path
          d="M1 22c7.3-.3 22 3.6 22 22m0 0V0m22 22c-7.3-.3-22 3.6-22 22"
          fill="none"
          stroke="#FFF"
          strokeWidth="2"
        />
      </svg>
    </button>
  );
};

export default Button;
