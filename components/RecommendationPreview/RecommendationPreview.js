import { useContext, useState, useEffect } from "react";
import Image from "next/image";
import SideDrawerContext from "../../store/SideDrawerContext";
import Tag from "../Tag/Tag";
import Recommendations from "../recommendations/recommendations";
import RecommendationInPreview from "../RecommendationInPreview/RecommendationInPreview";
import Loader from "../UI/Loader/Loader";

import classes from "./RecommendationPreview.module.css";

const RecommendationPreview = (props) => {
  let mainTags;
  let secondaryTags;
  let parentId = props.id;
  let previewRecommendations = [];
  let sortedPreviewRecommendations;

  const [fetchedData, setfetchedData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const sideDrawerCtx = useContext(SideDrawerContext);

  function fetchRecommendationsInPreview(previewFetchId) {
    setIsLoading(true);
    fetch(`/api/${window.location.pathname}/${previewFetchId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.result.length === 0) {
          setErrorHeader(`Something went wrong`);
          return;
        }
        //fetch all in an object
        setfetchedData(data.result);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }
  function convertTags(tags, secondary) {
    if (secondary) {
      if (fetchedData) {
        return fetchedData.secondaryTags.split(",").map((tag, index) => (
          <Tag key={index} secondaryTag>
            {tag}
          </Tag>
        ));
      }
      return tags.split(",").map((tag, index) => (
        <Tag key={index} secondaryTag>
          {tag}
        </Tag>
      ));
    }
    if (fetchedData) {
      return fetchedData.mainTags
        .split(",")
        .map((tag, index) => <Tag key={index}>{tag}</Tag>);
    }
    return tags.split(",").map((tag, index) => <Tag key={index}>{tag}</Tag>);
  }
  
  function convertRecommendationsInPreview(recommendationsInPreview) {
    for (const singlePreviewRecommendation in recommendationsInPreview) {
      previewRecommendations.push([
        singlePreviewRecommendation,
        ...recommendationsInPreview[singlePreviewRecommendation],
      ]);
    }
    previewRecommendations.sort(function (a, b) {
      return b[1] - a[1];
    });

    return previewRecommendations.map((item, index) => (
      <RecommendationInPreview
        key={item[0]}
        id={item[0]}
        parentId = {parentId}
        title={item[2]}
        photo={item[3]}
        fetchNextPreview={fetchRecommendationsInPreview}
      />
    ));
  }
  if (fetchedData) {
    parentId = fetchedData._id;
  }

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

  mainTags = convertTags(props.mainTags, false);
  secondaryTags = convertTags(props.secondaryTags, true);

  if (fetchedData) {
    sortedPreviewRecommendations = convertRecommendationsInPreview(
      fetchedData.recommendations
    );
  } else {
    sortedPreviewRecommendations = convertRecommendationsInPreview(
      props.recommendations
    );
  }

  //RecommendationsInPreview

  // ADD SLIDE IN ANIMATION WITH REACT TRANSITION GROUP?
  return (
    <div className={recommendationPreviewClasses.join(" ")}>
      {isLoading ? <Loader isLoading={isLoading} /> : null}
      <div className={classes.currentItem}>
        <div className={classes.currentItemPhoto}>
          <h2
            className={props.recommendationOpened ? classes.titleClasses : null}
          >
            {fetchedData ? fetchedData.title : props.title}
          </h2>
          <div className={imageClasses.join(" ")}>
            <Image
              quality={100}
              layout="fill"
              src={
                fetchedData
                  ? `/images${window.location.pathname}/${fetchedData.photo}`
                  : props.photo
              }
            />
          </div>
        </div>
        <div className={descriptionClasses.join(" ")}>
          <p>{fetchedData ? fetchedData.description : props.description}</p>
          <div style={{ marginBottom: "5px" }}>{mainTags}</div>
          {secondaryTags}
        </div>
      </div>
      <div className={classes.recommendedItems}>
        <h1 className={classes.recommendedItemsHeader}>Recommended:</h1>
        <Recommendations>
          {sortedPreviewRecommendations}
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
