import classes from './FrontImage.module.css'

import Image from "next/image";

const FrontImage = (props) => {
  return (
    <div className={`${classes.imageContainer} ${classes.loads}`}>
      <Image 
        quality={100} 
        layout="fill"
        src={props.imagePath} 
        />
    </div>
  );
};
export default FrontImage;
