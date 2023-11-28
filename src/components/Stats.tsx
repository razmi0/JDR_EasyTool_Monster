import { useId } from "react";
import styles from "./_.module.css";

type StatsProps = {
  label: string;
  value: string;
  open: boolean;
  color: string;
};
export const Stats = ({ label, value, open, color }: StatsProps) => {
  const summaryId = useId().replace(/:/g, "_") + "_stats";
  const labelId = useId().replace(/:/g, "_") + "_label";

  return (
    <>
      <style>
        {`
          summary#${summaryId}::marker {
            color: ${color};
          }
          span#${labelId}:hover {
            color: ${color};
            cursor: pointer;
          }

          
      `}
      </style>
      <details className={styles["stats-details"]} open={open}>
        <summary id={summaryId}>
          <span className={styles["stats-summary-text"]} id={labelId}>
            {label.charAt(0).toUpperCase() + label.slice(1)}
          </span>
        </summary>
        <div style={{ fontWeight: "bold" }}>{value}</div>
      </details>
    </>
  );
};
