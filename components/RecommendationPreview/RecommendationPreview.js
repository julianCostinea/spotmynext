import { useContext } from "react";
import Image from "next/image";
import SideDrawerContext from "../../store/SideDrawerContext";
import Tag from "../Tag/Tag";

import classes from "./RecommendationPreview.module.css";

const RecommendationPreview = (props) => {
  const sideDrawerCtx = useContext(SideDrawerContext);
  const closeRecommendationPreview = () => {
    props.setOpenFalse();
    sideDrawerCtx.hideBackdropHandler();
  };
  const recommendationPreviewClasses = [
    classes.RecommendationPreview,
    props.show === "entering"
      ? classes.openPreview
      : props.show === "exiting"
      ? classes.closePreview
      : null,
  ];

  const descriptionClasses = [
    classes.currentItemDescription,
    props.recommendationOpened ? classes.descriptionAnimation : null,
  ];
  const imageClasses = [
    classes.imageContainer,
    props.recommendationOpened ? classes.imageAnimation : null,
  ];
  const mainTags = props.mainTags.split(",").map((tag, index) => (
    <Tag key={index}>
      {tag}
    </Tag>
  ));
  const secondaryTags = props.secondaryTags.split(",").map((tag, index) => (
    <Tag key={index} secondaryTag>
      {tag}
    </Tag>
  ));

  // ADD SLIDE IN ANIMATION WITH REACT TRANSITION GROUP?
  return (
    <div className={recommendationPreviewClasses.join(" ")}>
      <div className={classes.currentItem}>
        <div className={classes.currentItemPhoto}>
          <h2
            className={props.recommendationOpened ? classes.titleClasses : null}
          >
            {props.title}
          </h2>
          <div className={imageClasses.join(" ")}>
            <Image quality={100} layout="fill" src={props.photo} />
          </div>
        </div>
        <div className={descriptionClasses.join(" ")}>
          <p>{props.description}</p>
          <div style={{marginBottom: "5px"}}>{mainTags}</div>
          {secondaryTags}
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
