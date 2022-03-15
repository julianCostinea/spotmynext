import { useContext, useState, useEffect, useRef } from "react";
import Image from "next/image";
import SideDrawerContext from "../../store/SideDrawerContext";
import Tag from "../Tag/Tag";
import Recommendations from "../recommendations/recommendations";
import RecommendationInPreview from "../RecommendationInPreview/RecommendationInPreview";
import Loader from "../UI/Loader/Loader";
import * as Icons from "../UI/Icons/Icons";

import classes from "./RecommendationPreview.module.css";
import NewRecommendation from "../NewRecommendation/NewRecommendation";

const RecommendationPreview = (props) => {
  let mainTags;
  let secondaryTags;
  let fetchedNewRecommendations;
  let parentId = props.id;
  let previewRecommendations = [];
  let sortedPreviewRecommendations;
  let votedIds = [];
  const searchTermInputRef = useRef();
  const votedIdsRef = useRef();
  const parentIdRef = useRef();
  parentIdRef.current = parentId;

  const [fetchedData, setfetchedData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [newRecommendations, setNewRecommendations] = useState();

  const sideDrawerCtx = useContext(SideDrawerContext);

  useEffect(() => {
    window.addEventListener("click", hideRecommendationPreviewOnBackdropClick);
    return () =>
      window.removeEventListener(
        "click",
        hideRecommendationPreviewOnBackdropClick
      );
  }, []);

  function voteButtonHandler(type, id) {
    if (!type) {
      votedIds.pop(id);
      votedIdsRef.current = votedIds;
      return;
    }
    votedIds.push(id);
    votedIdsRef.current = votedIds;
  }

  function hideRecommendationPreviewOnBackdropClick(event) {
    if (event.target.id === "backdrop") {
      props.setOpenFalse();
      sideDrawerCtx.hideBackdropHandler();
      if (votedIdsRef.current) {
        const data = {
          parentId: parentIdRef.current,
          votedIds: votedIdsRef.current,
        };
        fetchVoteRecommendations(data);
      }
    }
  }

  function fetchVoteRecommendations(data) {
    fetch(`/api/${window.location.pathname}/singleItem`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result.length === 0) {
          console.log("Something went wrong");
          return;
        }
        //check IP before voting. If the same and State ="voted", say you already voted
      })
      .catch((error) => console.log(error));
  }

  function fetchRecommendationsInPreview(previewFetchId) {
    setIsLoading(true);
    setNewRecommendations(null);
    searchTermInputRef.current.value = "";
    document.getElementById("recommendationPreview").scrollTo(0, 0);
    if (votedIds) {
      const data = { parentId, votedIds };
      fetchVoteRecommendations(data);
    }
    fetch(`/api/${window.location.pathname}/${previewFetchId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.result.length === 0) {
          setErrorHeader(`Something went wrong`);
          return;
        }
        setfetchedData(data.result);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }

  function fetchNewRecommendationInPreview() {
    setIsFormLoading(false);
    if (searchTermInputRef.current.value.length === 0) {
      setNewRecommendations(null);
    }
    if (searchTermInputRef.current.value.length > 2) {
      setIsFormLoading(true);
      const fetchId = searchTermInputRef.current.value.trim();
      fetch(`/api/${window.location.pathname}/search/?searchId=${fetchId}`)
        .then((response) => response.json())
        .then((data) => {
          setNewRecommendations(data.result);
          setIsFormLoading(false);
        })
        .catch((error) => console.log(error));
    }
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
    previewRecommendations = recommendationsInPreview.map(
      (singleRecommendation) => Object.values(singleRecommendation)
    );
    previewRecommendations.sort(function (a, b) {
      return b[1] - a[1];
    });

    return previewRecommendations.map((item, index) => {
      return (
        <RecommendationInPreview
          key={item[0]}
          id={item[0]}
          parentId = {parentId}
          standing={`${
            index === 0
              ? "firstPlace"
              : index === 1
              ? "secondPlace"
              : index === 2
              ? "thirdPlace"
              : null
          }`}
          title={item[2]}
          photo={item[3]}
          fetchNextPreview={fetchRecommendationsInPreview}
          voteButtonHandler={voteButtonHandler}
        />
      );
    });
  }
  if (fetchedData) {
    parentId = fetchedData._id;
    parentIdRef.current = parentId;
  }
  if (newRecommendations) {
    fetchedNewRecommendations = newRecommendations.map((item, index) => {
      if (item._id == parentId) {
        return;
      }
      return (
        <NewRecommendation
          key={index}
          id= {item._id}
          title={item.title}
          photo={item.photo}
          voteButtonHandler={voteButtonHandler}
        />
      );
    });
  }

  const closeRecommendationPreview = () => {
    props.setOpenFalse();
    sideDrawerCtx.hideBackdropHandler();
    if (votedIds) {
      const data = { parentId, votedIds };
      fetchVoteRecommendations(data);
    }
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
    props.show ? classes.descriptionAnimation : null,
  ];
  const imageClasses = [
    classes.imageContainer,
    props.show ? classes.imageAnimation : null,
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

  return (
    <div
      id="recommendationPreview"
      className={recommendationPreviewClasses.join(" ")}
    >
      {isLoading ? <Loader /> : null}
      <div className={classes.currentItem}>
        <div className={classes.currentItemPhoto}>
          <h2 className={props.show ? classes.titleClasses : null}>
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
        <form action="" className={classes.wrap}>
          <label htmlFor="searchTerm" className={classes.searchTermLabel}>
            Or recommend a different title
          </label>
          <div className={classes.search}>
            <input
              name="searchTerm"
              id="searchTerm"
              type="text"
              ref={searchTermInputRef}
              className={classes.searchTerm}
              placeholder="Mario..."
              onChange={fetchNewRecommendationInPreview}
              required
            />
          </div>
          {fetchedNewRecommendations}
          {isFormLoading ? <Loader formLoader /> : null}
        </form>
        <Recommendations>{sortedPreviewRecommendations}</Recommendations>
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
