import styles from "./_.module.css";
type InputProps = {
  search: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
export const SearchInput = ({ search, handleSearch }: InputProps) => {
  return (
    <>
      <h1
        style={{
          width: "100%",
          textAlign: "center",
        }}
      >
        Mythical Creatures
      </h1>
      <div
        style={{
          textAlign: "center",
          position: "sticky",
          top: "0",
        }}
      >
        <div style={{}}>
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => handleSearch(e)}
            className={styles["input-element"]}
          />
        </div>
      </div>
    </>
  );
};
