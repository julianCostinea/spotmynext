import React, { useState, useEffect } from "react";
import Image from "next/image";
import * as Icons from "../UI/Icons/Icons";

import classes from "./RecommendationInPreview.module.css";

const RecommendationInPreview = (props) => {
  const [imagePathName, setImagePathName] = useState("/images");

  function voteUpRecommendation(event) {
    event.stopPropagation();
    //Add thumbs up functionality here
    // fetch(`/api/${window.location.pathname}/${props.id}`, {
    //   method: "PUT",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     if (data.result.length === 0) {
    //       console.log("====================================");
    //       console.log("hello");
    //       console.log("====================================");
    //       return;
    //     }
    //   })
    //   .catch((error) => console.log(error));
    console.log('====================================');
    console.log(props.parentId);
    console.log('====================================');
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
            className={classes.voteUpButton}
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
