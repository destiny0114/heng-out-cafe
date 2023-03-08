import { ChangeEvent } from "react";
import styles from "@styles/SearchBar.module.css";
import SearchIcon from "@assets/images/search.svg";

type SearchBarProps = {
  onTermSubmit: (term: string) => void;
};

const SearchBar = ({ onTermSubmit }: SearchBarProps) => {
  const onInputChanged = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    onTermSubmit(e.target.value.toLowerCase());
  };

  return (
    <div className={styles.search}>
      <SearchIcon />
      <input type="text" placeholder="Search" onChange={onInputChanged} />
    </div>
  );
};

export default SearchBar;
