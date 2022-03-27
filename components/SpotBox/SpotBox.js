import React, { useState } from "react";
import { useRef } from "react";
import Recommendations from "../recommendations/recommendations";
import Recommendation from "../Recommendation/Recommendation";
import Loader from "../UI/Loader/Loader";

import classes from "./SpotBox.module.css";

import * as Icons from "../UI/Icons/Icons";

const SpotBox = (props) => {
  let item;

  switch (props.category) {
    case "videogames":
      item = "video game";
      break;
    case "movies":
      item = "movie";
      break;
    case "books":
      item = "book";
      break;
    default:
      break;
  }

  const searchTermInputRef = useRef();
  const [items, setItems] = useState([]);
  const [errorHeader, setErrorHeader] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function submitFormHandler(event) {
    event.preventDefault();
    document.forms[0].querySelector('input').blur();
    const fetchId = searchTermInputRef.current.value.trim();
    setErrorHeader("");
    if (!fetchId || fetchId.length < 3) {
      setErrorHeader(`Field must contain at least three letters.`);
      return;
    }
    setIsLoading(true);

    fetch(`/api/${window.location.pathname}/search/?searchId=${fetchId}`)
      .then((response) => response.json())
      .then((data) => {
        if (!data.result) {
          setErrorHeader(`Something went wrong. We're looking into it`);
          setIsLoading(false);
          return;
        }
        if (data.result.length == 0) {
          setErrorHeader(`Could not find any ${item}. Try a different search.`);
          setIsLoading(false);
          return;
        }
        setItems(data.result);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }

  const fetchedRecommendations = items.map((item, index) => (
    <Recommendation
      key={item._id}
      id={item._id}
      title={item.title}
      description={item.description}
      photo={item.photo}
      mainTags={item.mainTags}
      secondaryTags={item.secondaryTags}
      recommendations={item.recommendations}
    />
  ));

  return (
    <React.Fragment>
      <h1>Let's find your next {item}</h1>
      <h2 className={classes.errorHeader}>{errorHeader}</h2>
      <form onSubmit={submitFormHandler} className={classes.wrap}>
        <div className={classes.search}>
          <input
            type="text"
            ref={searchTermInputRef}
            className={classes.searchTerm}
            placeholder={props.placeholder}
            required
          />
          <button type="button" onClick={submitFormHandler} className={classes.searchButton}>
            {Icons.SearchIcon}
          </button>
        </div>
      </form>
      {isLoading ? <Loader /> : null}
      <Recommendations>{fetchedRecommendations}</Recommendations>
      <h1>Hot picks: </h1>
      <Recommendations>
        <Recommendation
          title={`${item} 1`}
          photo={"persona5.jpg"}
          description="cing elit. Repudiandae dolor perspiciatis cum maiores quisquam nemo. Amet tempora velit assumenda eius eum, eos consectetur dignissimos. Aspernatur esse odio accusamus a sit.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repudiandae dolor perspiciatis cum maiores quisquam nemo. Amet tempora velit assumenda eius eum, eos consectetur dignissimos. Aspernatur esse odio accusamus a sit."
          mainTags={"PlayStation 4, PlayStation 3"}
          secondaryTags={"JRPG, Action, Simulation"}
        />
        <Recommendation
          title={`${item} 2`}
          photo={"persona5.jpg"}
          description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repudiandae dolor perspiciatis cum maiores quisquam nemo. Amet tempora velit assumenda eius eum, eos consectetur dignissimos. Aspernatur esse odio accusamus a sit."
          mainTags={"PlayStation 4, PlayStation 3"}
          secondaryTags={"JRPG, Action, Simulation"}
        />
        <Recommendation
          title={`${item} 3`}
          photo={"persona5.jpg"}
          description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repudiandae dolor perspiciatis cum maiores quisquam nemo. Amet tempora velit assumenda eius eum, eos consectetur dignissimos. Aspernatur esse odio accusamus a sit."
          mainTags={"PlayStation 4, PlayStation 3"}
          secondaryTags={"JRPG, Action, Simulation"}
        />
      </Recommendations>
    </React.Fragment>
  );
};
export default SpotBox;
