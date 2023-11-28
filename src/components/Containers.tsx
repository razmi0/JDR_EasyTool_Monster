import { ElementType, HTMLAttributes, ReactNode, forwardRef, useId } from "react";
import styles from "./_.module.css";
import { scrollToTop } from "../helpers/helpers";
import { Fire } from "@/components/icons/Icons";

type Container = { children: ReactNode };
interface ListProps extends HTMLAttributes<HTMLLIElement> {}
export const ListElement = forwardRef<HTMLLIElement, ListProps>((props, ref) => {
  return (
    <li ref={ref} className={styles["listElementStyle"]} {...props}>
      {props.children}
    </li>
  );
});

interface NameProps {
  name: string;
  color: string;
  reveal: boolean;
  handleOpenRadar: () => void;
  handleOpenStats: () => void;
  handleSeeCreature: () => void;
  handleOpenIFrame: () => void;
  children: ReactNode[];
}
export const VisibilityManager = ({
  name,
  color,
  reveal,
  handleOpenRadar,
  handleOpenStats,
  handleSeeCreature,
  handleOpenIFrame,
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
      <div style={{ display: "flex", placeItems: "center" }}>
        <Fire />
        <span className={styles["name-style"]} style={{ color: color }}>
          {name}
        </span>
      </div>
      <div style={{ display: "flex", gap: "10px" }}>
        {reveal && (
          <>
            <Button id={id} onClick={handleOpenStats}>
              {children[0]}
            </Button>
            <Button id={id} onClick={handleOpenRadar}>
              {children[1]}
            </Button>
            <Button id={id} onClick={handleOpenIFrame}>
              {children[2]}
            </Button>
          </>
        )}
        <Button id={id} onClick={handleSeeCreature}>
          {children[3]}
        </Button>
      </div>
    </div>
  );
};
interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}
const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <button {...props} className={styles["button-style"] + " " + props.id}>
      {children}
    </button>
  );
};

interface TitleProps extends Container {
  as?: ElementType & ("h1" | "h2" | "h3" | "h4" | "h5" | "h6");
}
export const Title = ({ children, as: Element = "h1" }: TitleProps) => {
  return <Element style={{ width: "100%", textAlign: "center" }}>{children}</Element>;
};

/* <button className={styles["button-style"] + " " + id} onClick={handleOpenStats}>
          {children[0]}
        </button>
        <button
          data-btn-color={id}
          className={styles["button-style"] + " " + id}
          onClick={handleOpenRadar}
        >
          {children[1]}
        </button>
        <button className={styles["button-style"] + " " + id} onClick={handleSeeCreature}>
          {children[2]}
        </button> */

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
        fontSize: ".6em",
      }}
    >
      <a href="#" onClick={scrollToTop}>
        Top
      </a>
    </div>
  );
};
