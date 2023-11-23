import styles from "./_.module.css";
type InputProps = {
  search: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
export const SearchInput = ({ search, handleSearch }: InputProps) => {
  return (
    <div
      style={{
        textAlign: "center",
      }}
    >
      <h1>Mythical Creatures</h1>
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => handleSearch(e)}
        className={styles["input-element"]}
      />
    </div>
  );
};
