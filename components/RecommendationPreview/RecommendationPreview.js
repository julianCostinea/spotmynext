import { useContext } from "react";
import SideDrawerContext from "../../store/SideDrawerContext";

import classes from "./RecommendationPreview.module.css";

const RecommendationPreview = (props) => {
  const sideDrawerCtx = useContext(SideDrawerContext);
  const closeRecommendationPreview = () => {
    props.setOpenFalse();
    sideDrawerCtx.hideBackdropHandler();
  };
  const cssClasses = [
    classes.RecommendationPreview, 
    props.show === "entering" ? classes.openPreview :
    props.show === "exiting" ? classes.closePreview : null
  ]

  // ADD SLIDE IN ANIMATION WITH REACT TRANSITION GROUP?
  return (
    <div
      className={cssClasses.join(' ')}
    >
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
