import SpotBox from "../../components/SpotBox/SpotBox";
import React from "react";
import FrontImage from "../../components/FrontImage/FrontImage";

import classes from "./books.module.css";
import Recommendations from "../../components/recommendations/recommendations";

const Books = () => {
  return (
    <React.Fragment>
      <FrontImage imagePath="/images/books.jpg" />
      <SpotBox category="books" placeholder="LOTR, 1984, Dune" />
      <Recommendations>

      </Recommendations>
    </React.Fragment>
  );
};

export default Books;
