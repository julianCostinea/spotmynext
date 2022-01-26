import React, { useState, useEffect } from "react";
import Image from "next/image";

import classes from "./RecommendationInPreview.module.css";

const RecommendationInPreview = (props) => {
  const [imagePathName, setImagePathName] = useState("/images");

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
          className={classes.recommendationPhoto}
          onClick={()=>props.fetchNextPreview(props.id)}
        >
          <Image quality={100} layout="fill" src={imagePathName} />
        </div>
      </div>
    </React.Fragment>
  );
};
export default RecommendationInPreview;
