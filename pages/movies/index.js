import SpotBox from "../../components/SpotBox/SpotBox";
import React from "react";
import FrontImage from "../../components/FrontImage/FrontImage";

import classes from './movies.module.css'
import Recommendations from "../../components/recommendations/recommendations";
import Recommendation from "../../components/Recommendation/Reccomendation";

const Movies = () => {
  return (
    <React.Fragment>
      <FrontImage imagePath = "/images/movies.jpg"/>
      <SpotBox item="movie" placeholder="Star Wars, Avengers, Goodfellas"/>
      <Recommendations>
        <h1>Hot picks: </h1>
        <Recommendation item="movie"/>
        <Recommendation item="movie"/>
        <Recommendation item="movie"/>
      </Recommendations>
    </React.Fragment>
  );
};

export default Movies;
