import React, { useContext, useState } from "react";
import Portal from "../../hoc/Portal/Portal";
import SideDrawerContext from "../../store/SideDrawerContext";
import RecommendationPreview from "../RecommendationPreview/RecommendationPreview";
import classes from "./Recommendation.module.css";

const Recommendation = (props) => {
  const sideDrawerCtx = useContext(SideDrawerContext);
  const [openRecommendationPreview, setOpenRecommendationPreview] =
    useState();
  const showRecommendationPreview = ()=>{
    setOpenRecommendationPreview(true);
    sideDrawerCtx.showBackdropHandler();
  }

  return (
    <React.Fragment>
      <div
        className={classes.recommendation}
        onClick={showRecommendationPreview}
      >
        <p>{props.item}</p>
      </div>
      {openRecommendationPreview ? (
        <Portal selector="#recommendationPreviewOverlay">
          <RecommendationPreview showPreview setOpenFalse={()=>setOpenRecommendationPreview(false)} title = {props.item} />
        </Portal>) :null
      }
    </React.Fragment>
  );
};
export default Recommendation;
