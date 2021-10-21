import React from 'react';
import classes from './Loader.module.css'

const Loader = (props) => {
    return (
      <React.Fragment>
        <label htmlFor="" className={classes.Label}>
          <div 
            className={classes.checkIcon} 
            style = {{display: props.isLoading ? 'none' : 'block'}}>
            </div>
        </label>
      </React.Fragment>
    );
  };
  
  export default Loader;