import SpotBox from "../../components/SpotBox/SpotBox";
import React from "react";
import FrontImage from "../../components/FrontImage/FrontImage";

import classes from "./movies.module.css";

const Movies = () => {
  return (
    <React.Fragment>
      <FrontImage imagePath="/images/movies.jpg" />
      <SpotBox category="movies" placeholder="Star Wars, Avengers, Goodfellas" />
    </React.Fragment>
  );
};

export default Movies;
