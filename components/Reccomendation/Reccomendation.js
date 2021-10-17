import classes from './Reccomendation.module.css'

const Reccomendation = (props) => {
  return (
    <div className={classes.reccomendation}>
      <p>{props.item}</p>
    </div>
  );
};
export default Reccomendation;
