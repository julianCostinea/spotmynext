import React, { useState, useEffect } from "react";
import Image from "next/image";
import * as Icons from "../UI/Icons/Icons";

import classes from "./RecommendationInPreview.module.css";

const RecommendationInPreview = (props) => {
  const [imagePathName, setImagePathName] = useState('/images');
  const [voted, setVoted] = useState(false);

  function voteUpRecommendation(event) {
    event.stopPropagation();
    const itemData = {id: props.id, title: props.title, photo: props.photo}
    if (voted) {
      props.voteButtonHandler(false, itemData);
      setVoted(false);
      return;
    }
    props.voteButtonHandler(true, itemData);
    setVoted(true);
  }

  let attachedClasses = [classes.recommendationPhoto, classes.loads];

  switch (props.standing) {
    case "firstPlace":
      attachedClasses.push(classes.firstPlace);
      break;
    case "secondPlace":
      attachedClasses.push(classes.secondPlace);
      break;
    case "thirdPlace":
      attachedClasses.push(classes.thirdPlace);
      break;

    default:
      null;
      break;
  }

  useEffect(() => {
    setVoted(false);
    switch (window.location.pathname) {
      case "/videogames":
        setImagePathName(`/images/videogames/${props.photo}`);
        break;
      case "/movies":
        setImagePathName(`/images/movies/${props.photo}`);
        break;
      case "/books":
        setImagePathName(`/images/books/${props.photo}`);
        break;
      default:
        setImagePathName(`/images/videogames/${props.photo}`);
        break;
    }
  }, [props.parentId]);

  return (
    <React.Fragment>
      <div className={classes.recommendation}>
        <h2 className={classes.recommendationTitle}>{props.title}</h2>
        <div
          className={attachedClasses.join(" ")}
          onClick={() => props.fetchNextPreview(props.id)}
        >
          <Image quality={100} layout="fill" src={imagePathName} />
          <button
            title="Recommend this title"
            className={`${classes.voteUpButton} 
            ${voted ? classes.voteUpButtonActive : null}
            `
          }
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
