import React, { useContext, useState, useEffect } from "react";
import Portal from "../../hoc/Portal/Portal";
import Image from "next/image";
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
  const [imagePathName, setImagePathName] = useState("/images");

  useEffect(() => {
    switch (window.location.pathname) {
      case "/videogames":
        setImagePathName(`${imagePathName}/videogames/${props.photo}`);
        break;
      case "/movies":
        setImagePathName(`${imagePathName}/movies/${props.photo}`);
        break;
      case "/books":
        setImagePathName(`${imagePathName}/books/${props.photo}`);
        break;
      default:
        setImagePathName(`${imagePathName}/videogames/${props.photo}`);
        break;
    }
  }, []);

  return (
    <React.Fragment>
      <div
        className={classes.recommendation}
        onClick={showRecommendationPreview}
      >
        {/* BUILD A CUSTOM IMAGE PATH FOR EACH ROUTE DEPENDING ON HREF */}
        <Image quality={100} layout="fill" src={imagePathName} />
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
                title={props.title}
                description={props.description}
                photo={imagePathName}
              />
            )}
          </Transition>
        </Portal>
      }
    </React.Fragment>
  );
};
export default Recommendation;
