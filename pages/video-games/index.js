import SearchBox from "../../components/SearchBox/SearchBox";
import React from "react";

import classes from "./video-games.module.css";
import FrontImage from "../../components/FrontImage/FrontImage";
import Recommendations from "../../components/recommendations/recommendations";
import Reccomendation from "../../components/reccomendation/reccomendation";

const VideoGames = () => {
  return (
    <React.Fragment>
      <FrontImage imagePath = "/images/videogames.jpg"/>
      <SearchBox item="video game" placeholder="Zelda, GTA, Halo" />
      <Recommendations>
        <Reccomendation item="videogame" />
        <Reccomendation item="videogame" />
        <Reccomendation item="videogame" />
        <Reccomendation item="videogame" />
        <Reccomendation item="videogame" />
        <Reccomendation item="videogame" />
        <Reccomendation item="videogame" />
        <Reccomendation item="videogame" />
        <Reccomendation item="videogame" />
        <Reccomendation item="videogame" />
      </Recommendations>
    </React.Fragment>
  );
};

export default VideoGames;
