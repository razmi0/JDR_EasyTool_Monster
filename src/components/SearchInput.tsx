import styles from "./_.module.css";
type InputProps = {
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchedSize: number;
};
export const SearchInput = ({ handleSearch, searchedSize }: InputProps) => {
  return (
    <>
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
            onChange={(e) => handleSearch(e)}
            className={styles["input-element"]}
          />
          <small style={{ marginLeft: "5px" }}>{searchedSize}</small>
        </div>
      </div>
    </>
  );
};
