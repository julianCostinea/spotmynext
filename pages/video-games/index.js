import SpotBox from "../../components/SpotBox/SpotBox";
import React from "react";

import classes from "./video-games.module.css";
import FrontImage from "../../components/FrontImage/FrontImage";

const VideoGames = () => {
  return (
    <React.Fragment>
      <FrontImage imagePath = "/images/videogames.jpg"/>
      <SpotBox category="videogames" placeholder="Zelda, GTA, Halo" />
    </React.Fragment>
  );
};

export default VideoGames;
