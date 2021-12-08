import { useContext } from "react";
import SideDrawerContext from "../../store/SideDrawerContext";

import classes from "./RecommendationPreview.module.css";

const RecommendationPreview = (props) => {
  const sideDrawerCtx = useContext(SideDrawerContext);
  const closeRecommendationPreview = () => {
    props.setOpenFalse();
    sideDrawerCtx.hideBackdropHandler();
  };

  // ADD SLIDE IN ANIMATION WITH REACT TRANSITION GROUP?
  return (
    <div className={classes.RecommendationPreview}>
      {props.title}
      <div
        onClick={closeRecommendationPreview}
        className={classes.ClosePreview}
      >
        <span></span>
        <span></span>
      </div>
    </div>
  );
};
export default RecommendationPreview;
