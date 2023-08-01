import type { FC } from "react";
import styles from "./Info.module.css";

interface InfoProps {
  value: number | null;
  label: "days" | "months" | "years";
}

const { root, info_value, info_label } = styles;

const Info: FC<InfoProps> = ({ value, label }) => {
  return (
    <div className={root}>
      <span className={info_value}>{value ? value : "- -"}</span>
      <span className={info_label}>{label}</span>
    </div>
  );
};

export default Info;
