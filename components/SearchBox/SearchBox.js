import React, { useEffect } from "react";
import classes from "./SearchBox.module.css";

import * as Icons from "../UI/Icons/Icons";

const SearchBox = (props) => {
  return (
    <React.Fragment>
      <h1>Let's find your next {props.item}</h1>
      <div className={classes.wrap}>
        <div className={classes.search}>
          <input
            type="text"
            className={classes.searchTerm}
            placeholder={props.placeholder}
          />
          <button type="submit" className={classes.searchButton}>
            {Icons.SearchIcon}
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};
export default SearchBox;
