import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import styles from "./SearchBar.module.css";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [placeholder, setPlaceholder] = useState("Search Twitter");

  const handleSubmit = (e) => {
    e.preventDefault();
  
  }; 
 

  const handleInputFocus = () => {
    setPlaceholder("Try searching for people, topics, or keywords");
  };

  const handleInputBlur = () => {
    setPlaceholder("Search Twitter");
  };
  console.log(query);

  return (
    <form className={styles.searchBar} onSubmit={handleSubmit}>
      <input
        type="text"
        className={styles.searchInput}
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
      />
      <button type="submit" className={styles.searchButton}>
        <FaSearch />
      </button>
    </form>
  );
};

export default SearchBar;
