import SearchBox from "../../components/SearchBox/SearchBox";
import React from "react";
import FrontImage from "../../components/FrontImage/FrontImage";

import classes from "./books.module.css";
import Recommendations from "../../components/recommendations/recommendations";
import Reccomendation from "../../components/reccomendation/reccomendation";

const Books = () => {
  return (
    <React.Fragment>
      <FrontImage imagePath="/images/books.jpg" />
      <SearchBox item="book" placeholder="LOTR, 1984, Dune" />
      <Recommendations>
        <Reccomendation item="book" />
        <Reccomendation item="book" />
        <Reccomendation item="book" />
      </Recommendations>
    </React.Fragment>
  );
};

export default Books;
