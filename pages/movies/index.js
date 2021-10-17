import SearchBox from "../../components/SearchBox/SearchBox";
import React from "react";
import FrontImage from "../../components/FrontImage/FrontImage";

import classes from './movies.module.css'
import Recommendations from "../../components/recommendations/recommendations";
import Reccomendation from "../../components/reccomendation/reccomendation";

const Movies = () => {
  return (
    <React.Fragment>
      <FrontImage imagePath = "/images/movies.jpg"/>
      <SearchBox item="movie" placeholder="Star Wars, Avengers, Goodfellas"/>
      <Recommendations>
        <Reccomendation item="movie"/>
        <Reccomendation item="movie"/>
        <Reccomendation item="movie"/>
      </Recommendations>
    </React.Fragment>
  );
};

export default Movies;
