import classes from "./video-games.module.css";

import * as Icons from "../../components/UI/Icons/Icons";
import React from "react";

const VideoGames = () => {
  return (
    <React.Fragment>
      <h1>Let's find your next video game</h1>
      <div className={classes.wrap}>
        <div className={classes.search}>
          <input
            type="text"
            className={classes.searchTerm}
            placeholder="Spot my next videogame"
          />
          <button type="submit" className={classes.searchButton}>
            {Icons.SearchIcon}
          </button>
        </div>
      </div>
      <div className={classes.reccomendations}>
        <div className={classes.reccomendation}>
          <p>videogame</p>
        </div>
        <div className={classes.reccomendation}>
          <p>videogame</p>
        </div>
        <div className={classes.reccomendation}>
          <p>videogame</p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default VideoGames;
