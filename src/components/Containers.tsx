import { ReactNode, useId } from "react";
import styles from "./_.module.css";
import { scrollToTop } from "./helpers";
import { Fire } from "@/icons/Icons";

type Container = { children: ReactNode };

export const ListElement = ({ children }: Container) => {
  return <li className={styles["listElementStyle"]}>{children}</li>;
};

interface NameProps {
  name: string;
  color: string;
  handleOpenRadar: () => void;
  handleOpenStats: () => void;
  children: ReactNode[];
}
export const NameButtons = ({
  name,
  color,
  handleOpenRadar,
  handleOpenStats,
  children,
}: NameProps) => {
  const id = useId().replace(/:/g, "_") + "_button";

  return (
    <div id="name" className={styles["name-ctn"] + " " + id}>
      <style>
        {`

              .${id}:hover {
                border-color: ${color};
                color: ${color};
                transition : 0.3s ease-in;
              }
              
      `}
      </style>
      <Fire />
      <span className={styles["name-style"]} style={{ color: color }}>
        {name}
      </span>
      <button className={styles["button-style"] + " " + id} onClick={handleOpenStats}>
        {children[0]}
      </button>
      <button
        data-btn-color={id}
        className={styles["button-style"] + " " + id}
        onClick={handleOpenRadar}
      >
        {children[1]}
      </button>
    </div>
  );
};

// button {
//   border-radius: 8px;
//   border: 1px solid transparent;
//   padding: 0.6em 1.2em;
//   font-size: 1em;
//   font-weight: 500;
//   font-family: inherit;
//   background-color: #1a1a1a;
//   cursor: pointer;
//   transition: border-color 0.25s;
//   color: #fff;
// }

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

export const Anchor = () => {
  return (
    <div
      style={{
        position: "fixed",
        right: "0",
        top: "0",
        padding: "7px",
        backgroundColor: "grey",
        color: "white",
        borderRadius: "50%",
        margin: "5%",
        fontSize: ".8em",
      }}
    >
      <a href="#" onClick={scrollToTop}>
        Top
      </a>
    </div>
  );
};
