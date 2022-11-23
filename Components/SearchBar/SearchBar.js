import React from "react";
import "./SearchBar.scss";

function SearchBar() {
  return (
    <div className="SearchBar">
      <input
        className="SearchBar__input"
        type="text"
        placeholder={"Search"}
      />
    </div>
  );
}

export default SearchBar;
