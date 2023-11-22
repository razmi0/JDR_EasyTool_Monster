import { ReactNode } from "react";
import styles from "./_.module.css";

type Container = { children: ReactNode };
export const ListElement = ({ children }: Container) => {
  return <li className={styles["listElementStyle"]}>{children}</li>;
};

interface NameProps extends Container {
  name: string;
  handleClick: () => void;
}
export const Name = ({ name, handleClick, children }: NameProps) => {
  return (
    <div id="name" className={styles["name-ctn"]}>
      <span className={styles["name-style"]}> {name} </span>
      <button className={styles["button-style"]} onClick={handleClick}>
        {children}
      </button>
    </div>
  );
};

export const StatsAndChart = ({ children }: Container) => {
  return (
    <div id="stats&chart" className={styles["statsAndChart-ctn"]}>
      {children}
    </div>
  );
};

export const StatsContainer = ({ children }: Container) => {
  return <div id="stats">{children}</div>;
};

interface ChartProps extends Container {
  isOpen: boolean;
}

export const ChartContainer = ({ children, isOpen }: ChartProps) => {
  const classes = styles["chart-ctn"] + " " + styles["chart-size"];
  return (
    <div id="chart" className={styles["chart-global-ctn"]}>
      {isOpen ? (
        <div className={classes}>{children}</div>
      ) : (
        <div className={styles["chart-size"]} />
      )}
    </div>
  );
};

export const ChartTitle = ({ children }: Container) => {
  return <span className={styles["chart-title"]}>{children}</span>;
};
