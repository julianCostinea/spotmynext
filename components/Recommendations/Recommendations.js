import classes from './Recommendations.module.css'

const Recommendations = (props) => {
  return (
    <div className={classes.reccomendations}>
      {props.children}
    </div>
  );
};
export default Recommendations;
