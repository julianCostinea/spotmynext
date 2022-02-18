import React, { useState, useEffect } from "react";
import Image from "next/image";
import * as Icons from "../UI/Icons/Icons";

import classes from "./RecommendationInPreview.module.css";

const RecommendationInPreview = (props) => {
  const [imagePathName, setImagePathName] = useState("/images");
  const [voted, setVoted] = useState(false);

  function voteUpRecommendation(event) {
    event.stopPropagation();
    if (voted) {
      props.voteButtonHandler(false, props.id);
      setVoted(false);
      return;
    }
    props.voteButtonHandler(true, props.id);
    setVoted(true);
  }

  useEffect(() => {
    switch (window.location.pathname) {
      case "/videogames":
        setImagePathName(`${imagePathName}/videogames/${props.photo}`);
        break;
      case "/movies":
        setImagePathName(`${imagePathName}/movies/${props.photo}`);
        break;
      case "/books":
        setImagePathName(`${imagePathName}/books/${props.photo}`);
        break;
      default:
        setImagePathName(`${imagePathName}/videogames/${props.photo}`);
        break;
    }
  }, []);

  return (
    <React.Fragment>
      <div className={classes.recommendation}>
        <h2 className={classes.recommendationTitle}>{props.title}</h2>
        <div
          className={`${classes.recommendationPhoto} ${classes.loads}`}
          onClick={() => props.fetchNextPreview(props.id)}
        >
          <Image quality={100} layout="fill" src={imagePathName} />
          <button
            title="Recommend this title"
            className={`${classes.voteUpButton} ${voted ? classes.voteUpButtonActive : null }`}
            onClick={voteUpRecommendation}
          >
            {Icons.ThumbsupIcon}
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};
export default RecommendationInPreview;
