import React, { useEffect } from "react";
import { useRef } from "react";

import classes from "./SearchBox.module.css";

import * as Icons from "../UI/Icons/Icons";

const SearchBox = (props) => {
  const searchTermInputRef = useRef();

  function submitFormHandler(event) {
    event.preventDefault();

    const enteredInput = searchTermInputRef.current.value;

    fetch("/api/video-games", {
      method: "POST",
      body: JSON.stringify(enteredInput),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  return (
    <React.Fragment>
      <h1>Let's find your next {props.item}</h1>
      <form onSubmit={submitFormHandler} className={classes.wrap}>
        <div className={classes.search}>
          <input
            type="text"
            ref={searchTermInputRef}
            className={classes.searchTerm}
            placeholder={props.placeholder}
          />
          <button type="submit" className={classes.searchButton}>
            {Icons.SearchIcon}
          </button>
        </div>
      </form>
    </React.Fragment>
  );
};
export default SearchBox;
