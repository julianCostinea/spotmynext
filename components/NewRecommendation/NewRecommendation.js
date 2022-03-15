import Image from "next/image";
import { useState } from "react";
import * as Icons from "../UI/Icons/Icons";

import classes from "./NewRecommendation.module.css";

const NewRecommendation = (props) => {
  const [voted, setVoted] = useState(false);

  function voteUpNewRecommendation(event) {
    event.preventDefault();
    event.stopPropagation();
    if (voted) {
      props.voteButtonHandler(false, props.id);
      setVoted(false);
      return;
    }
    props.voteButtonHandler(true, props.id);
    setVoted(true);
  }
  return (
    <div className={classes.newRecommendation}>
      <Image
        quality={100}
        width={40}
        height={40}
        src={`/images/videogames/${props.photo}`}
      />
      <p>{props.title}</p>
      <button
        title="Recommend this title"
        className={`${classes.voteUpButton} ${
          voted ? classes.voteUpButtonActive : null
        }`}
        onClick={voteUpNewRecommendation}
      >
        {Icons.ThumbsupIcon}
      </button>
    </div>
  );
};
export default NewRecommendation;
