import { useEffect, type FC, useState } from "react";
import styles from "./Info.module.css";

interface InfoProps {
  value: number | null;
  label: "days" | "months" | "years";
}

const { root, info_value, info_label } = styles;

const Info: FC<InfoProps> = ({ value, label }) => {
  const [animatedValue, setAnimatedValue] = useState<number | null>(null);

  useEffect(() => {
    const animateValue = (start: number, end: number, duration: number) => {
      const startTime = performance.now();

      const updateValue = (currentTime: number) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        const _animatedValue = Math.round(start + progress * (end - start));

        setAnimatedValue(_animatedValue);

        if (progress < 1) {
          requestAnimationFrame(updateValue);
        }
      };

      requestAnimationFrame(updateValue);
    };

    if (value !== null) {
      const startValue = 0;
      const endValue = value;
      const animationDuration = 1000;

      animateValue(startValue, endValue, animationDuration);
    }
  }, [value]);

  return (
    <div className={root}>
      <span className={info_value}>
        {animatedValue ? animatedValue : "- -"}
      </span>
      <span className={info_label}>{label}</span>
    </div>
  );
};

export default Info;
