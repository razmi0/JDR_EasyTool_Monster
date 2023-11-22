import styles from "./_.module.css";

type StatsProps = {
  label: string;
  value: string;
  open: boolean;
};
export const Stats = ({ label, value, open }: StatsProps) => {
  return (
    <details className={styles["stats-flex-ctn"]} open={open}>
      <summary>
        <span className={styles["stats-text"]}>
          {label.charAt(0).toUpperCase() + label.slice(1)}
        </span>
      </summary>
      <div style={{ marginLeft: "50px" }}>{value}</div>
    </details>
  );
};
