import React, { useEffect, useState } from "react";
import { useRef } from "react";
import Recommendations from "../recommendations/recommendations";
import Recommendation from "../Recommendation/Reccomendation";
import Loader from "../UI/Loader/Loader";

import classes from "./SpotBox.module.css";

import * as Icons from "../UI/Icons/Icons";

const SpotBox = (props) => {
  const searchTermInputRef = useRef();
  const [items, setItems] = useState([]);
  const [errorHeader, setErrorHeader] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function submitFormHandler(event) {
    event.preventDefault();
    setIsLoading(true);

    const enteredInput = searchTermInputRef.current.value;

    fetch("/api/video-games", {
      method: "POST",
      body: JSON.stringify(enteredInput),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result.length === 0) {
          setErrorHeader("Could not find any video-game");
          return;
        }
        setItems(data.result)
        setIsLoading(false);
      }
        )
      .catch(error=>console.log(error));
  }

  const standardRecommendations = (
    <React.Fragment>
      <Recommendation item="Videogame 1"/>
      <Recommendation item="Videogame 2" />
      <Recommendation item="Videogame 3" />
    </React.Fragment>
    )

  const fetchedRecommendations = items.map((item, index) => (
    <Recommendation key={index} item={item.title} />
  ));
  

  return (
    <React.Fragment>
      <h1>Let's find your next {props.item}</h1>
      <h2 className={classes.errorHeader}>{errorHeader}</h2>
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
      {isLoading ? <Loader isLoading={isLoading} /> : null}
      <Recommendations>
          {fetchedRecommendations.length >= 1 ? fetchedRecommendations : standardRecommendations}
      </Recommendations>
    </React.Fragment>
  );
};
export default SpotBox;
