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
  const [recommendationOpened, setRecommendationOpened] = useState(false);

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
      <div className={classes.recommendation}>
        <h2 className={classes.recommendationTitle}>{props.title}</h2>
        <div
          className={`${classes.recommendationPhoto} ${classes.loads}`}
          onClick={((showRecommendationPreview))}
        >
          {/* BUILD A CUSTOM IMAGE PATH FOR EACH ROUTE DEPENDING ON HREF */}
          <Image quality={100} layout="fill" src={imagePathName} />
        </div>
      </div>
      {
        <Portal selector="#recommendationPreviewOverlay">
          <Transition
            mountOnEnter
            appear
            unmountOnExit
            in={openRecommendationPreview}
            timeout={200}
            onEntering={() => setRecommendationOpened(true)}
          >
            {(state) => (
              <RecommendationPreview
                show={state}
                openRecommendationPreview
                setOpenFalse={() => setOpenRecommendationPreview(false)}
                id={props.id}
                title={props.title}
                description={props.description}
                mainTags={props.mainTags}
                secondaryTags={props.secondaryTags}
                photo={imagePathName}
                recommendations = {props.recommendations}
                recommendationOpened={recommendationOpened}
              />
            )}
          </Transition>
        </Portal>
      }
    </React.Fragment>
  );
};
export default Recommendation;
