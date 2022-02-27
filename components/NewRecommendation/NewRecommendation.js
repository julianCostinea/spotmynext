import classes from "./NewRecommendation.module.css";
import Image from "next/image";

const NewRecommendation = (props) => {
  return (
    <div className={classes.newRecommendation}>
      <Image
        quality={100}
        width={40}
        height={40}
        src={`/images/videogames/${props.photo}`}
      />
      {props.title}
    </div>
  );
};
export default NewRecommendation;
