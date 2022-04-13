import React, { useState } from "react";
import { useRef } from "react";
import Recommendations from "../Recommendations/Recommendations";
import Recommendation from "../Recommendation/Recommendation";
import Loader from "../UI/Loader/Loader";

import classes from "./SpotBox.module.css";

import * as Icons from "../UI/Icons/Icons";
import ContactForm from "../ContactForm/ContactForm";

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
  const [showContactForm, setShowContactForm] = useState(false);

  function submitFormHandler(event) {
    event.preventDefault();
    document.forms[0].querySelector("input").blur();
    const fetchId = searchTermInputRef.current.value.trim();
    setErrorHeader("");
    if (!fetchId || fetchId.length < 3) {
      setErrorHeader(`Field must contain at least three letters.`);
      return;
    }
    setIsLoading(true);

    fetch(
      `/api/search/?collection=${window.location.pathname}&searchId=${fetchId}`
    )
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
      .catch((error) => {
        setErrorHeader(`Something went wrong. We're looking into it`);
        setIsLoading(false);
      });
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
      <ContactForm showContactForm={showContactForm} />
      <h1>Let&apos;s find your next {item}</h1>
      {errorHeader ? (
        <h2 className={classes.errorHeader}>{errorHeader}</h2>
      ) : null}
      <form onSubmit={submitFormHandler} className={classes.wrap}>
        <div className={classes.search}>
          <input
            type="text"
            ref={searchTermInputRef}
            className={classes.searchTerm}
            placeholder={props.placeholder}
            required
          />
          <button
            type="button"
            onClick={submitFormHandler}
            className={classes.searchButton}
          >
            {Icons.SearchIcon}
          </button>
        </div>
      </form>

      {isLoading ? <Loader /> : null}
      {fetchedRecommendations ? (
        <>
          <Recommendations>{fetchedRecommendations}</Recommendations>
          <h2 className={classes.recommendHeader}>
            Can&apos;t find what you&apos;re looking for? Write us! {Icons.mailIcon}
          </h2>
        </>
      ) : null}
    </React.Fragment>
  );
};

export default SpotBox;
