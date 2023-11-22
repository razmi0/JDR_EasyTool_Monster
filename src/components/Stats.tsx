import styles from "./_.module.css";

type StatsProps = {
  label: string;
  value: string;
};
export const Stats = ({ label, value }: StatsProps) => {
  return (
    <div className={styles["stats-flex-ctn"]}>
      <div>
        <span className={styles["stats-text"]}>
          {label.charAt(0).toUpperCase() + label.slice(1)}
        </span>{" "}
        : {value}
      </div>
    </div>
  );
};
