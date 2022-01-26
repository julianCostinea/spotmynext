import { useContext, useState, useEffect } from "react";
import Image from "next/image";
import SideDrawerContext from "../../store/SideDrawerContext";
import Tag from "../Tag/Tag";
import Recommendations from "../recommendations/recommendations";
import RecommendationInPreview from "../RecommendationInPreview/RecommendationInPreview";

import classes from "./RecommendationPreview.module.css";

const RecommendationPreview = (props) => {
  function fetchRecommendationsInPreview(previewFetchId) {
    // setIsLoading(true);
    fetch(`/api/${window.location.pathname}/${previewFetchId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.result.length === 0) {
          setErrorHeader(`Something went wrong`);
          return;
        }
        setfetchedTitle(data.result.title);
        // setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }

  const [fetchedTitle, setfetchedTitle] = useState();

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
  const mainTags = props.mainTags
    .split(",")
    .map((tag, index) => <Tag key={index}>{tag}</Tag>);
  const secondaryTags = props.secondaryTags.split(",").map((tag, index) => (
    <Tag key={index} secondaryTag>
      {tag}
    </Tag>
  ));

  //RecommendationsInPreview
  const previewRecommendations = [];
  for (const singlePreviewRecommendation in props.recommendations) {
    previewRecommendations.push([
      singlePreviewRecommendation,
      ...props.recommendations[singlePreviewRecommendation],
    ]);
  }
  previewRecommendations.sort(function (a, b) {
    return b[1] - a[1];
  });
  //In DB recommendations add: id, title, photo and score
  //Then on new RecommendationPreview click, query the recommendaitons table
  const sortedPreviewRecommendations = previewRecommendations.map(
    (item, index) => (
      <RecommendationInPreview
        key={item[0]}
        id={item[0]}
        title={item[2]}
        photo={item[3]}
        fetchNextPreview={fetchRecommendationsInPreview}
      />
    )
  );

  // ADD SLIDE IN ANIMATION WITH REACT TRANSITION GROUP?
  return (
    <div className={recommendationPreviewClasses.join(" ")}>
      <div className={classes.currentItem}>
        <div className={classes.currentItemPhoto}>
          <h2
            className={props.recommendationOpened ? classes.titleClasses : null}
          >
            {fetchedTitle ? fetchedTitle : props.title}
          </h2>
          <div className={imageClasses.join(" ")}>
            <Image quality={100} layout="fill" src={props.photo} />
          </div>
        </div>
        <div className={descriptionClasses.join(" ")}>
          <p>{props.description}</p>
          <div style={{ marginBottom: "5px" }}>{mainTags}</div>
          {secondaryTags}
        </div>
      </div>
      <div className={classes.recommendedItems}>
        <h1 className={classes.recommendedItemsHeader}>Recommended:</h1>
        <Recommendations>
          {sortedPreviewRecommendations}
          <RecommendationInPreview
            title={`Persona 1`}
            photo={"persona5.jpg"}
            description="cing elit. Repudiandae dolor perspiciatis cum maiores quisquam nemo. Amet tempora velit assumenda eius eum, eos consectetur dignissimos. Aspernatur esse odio accusamus a sit.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repudiandae dolor perspiciatis cum maiores quisquam nemo. Amet tempora velit assumenda eius eum, eos consectetur dignissimos. Aspernatur esse odio accusamus a sit."
            mainTags={"PlayStation 4, PlayStation 3"}
            secondaryTags={"JRPG, Action, Simulation"}
          />
          <RecommendationInPreview
            title={`Persona 2`}
            photo={"persona5.jpg"}
            description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repudiandae dolor perspiciatis cum maiores quisquam nemo. Amet tempora velit assumenda eius eum, eos consectetur dignissimos. Aspernatur esse odio accusamus a sit."
            mainTags={"PlayStation 4, PlayStation 3"}
            secondaryTags={"JRPG, Action, Simulation"}
          />
          <RecommendationInPreview
            title={`Persona 3`}
            photo={"persona5.jpg"}
            description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repudiandae dolor perspiciatis cum maiores quisquam nemo. Amet tempora velit assumenda eius eum, eos consectetur dignissimos. Aspernatur esse odio accusamus a sit."
            mainTags={"PlayStation 4, PlayStation 3"}
            secondaryTags={"JRPG, Action, Simulation"}
          />
          <RecommendationInPreview
            title={`Persona 4`}
            photo={"persona5.jpg"}
            description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repudiandae dolor perspiciatis cum maiores quisquam nemo. Amet tempora velit assumenda eius eum, eos consectetur dignissimos. Aspernatur esse odio accusamus a sit."
            mainTags={"PlayStation 4, PlayStation 3"}
            secondaryTags={"JRPG, Action, Simulation"}
          />
        </Recommendations>
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
