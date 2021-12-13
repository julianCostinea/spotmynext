import React, { useContext, useState } from "react";
import Portal from "../../hoc/Portal/Portal";
import SideDrawerContext from "../../store/SideDrawerContext";
import RecommendationPreview from "../RecommendationPreview/RecommendationPreview";
import { Transition } from "react-transition-group";

import classes from "./Recommendation.module.css";

const Recommendation = (props) => {
  const sideDrawerCtx = useContext(SideDrawerContext);
  const [openRecommendationPreview, setOpenRecommendationPreview] = useState();
  const showRecommendationPreview = () => {
    setOpenRecommendationPreview(true);
    sideDrawerCtx.showBackdropHandler();
  };

  return (
    <React.Fragment>
      <div
        className={classes.recommendation}
        onClick={showRecommendationPreview}
      >
        <p>{props.item}</p>
      </div>
      {
        <Portal selector="#recommendationPreviewOverlay">
          <Transition
            mountOnEnter
            appear
            unmountOnExit
            in={openRecommendationPreview}
            timeout={200}
          >
            {(state) => (
              <RecommendationPreview
                show={state}
                openRecommendationPreview
                setOpenFalse={() => setOpenRecommendationPreview(false)}
                title={props.item}
              />
            )}
          </Transition>
        </Portal>
      }
    </React.Fragment>
  );
};
export default Recommendation;
