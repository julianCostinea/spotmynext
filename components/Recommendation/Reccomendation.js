import classes from './Reccomendation.module.css';

const Recommendation = (props) => {
  return (
    <div className={classes.recommendation}>
      <p>{props.item}</p>
    </div>
  );
};
export default Recommendation;
