import { useContext } from "react";
import Image from "next/image";
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
    props.show === "entering"
      ? classes.openPreview
      : props.show === "exiting"
      ? classes.closePreview
      : null,
  ];

  // ADD SLIDE IN ANIMATION WITH REACT TRANSITION GROUP?
  return (
    <div className={cssClasses.join(" ")}>
      <div className={classes.currentItem}>
        <div className={classes.currentItemPhoto}>
          <h2>{props.title}</h2>
          <div className={classes.imageContainer}>
            <Image quality={100} layout="fill" src={props.photo} />
          </div>
        </div>
        <div className={classes.currentItemDescription}>
          <p>{props.description}</p>
        </div>
      </div>

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
