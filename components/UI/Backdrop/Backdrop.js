import React, {useContext} from "react";
import SideDrawerContext from "../../../store/SideDrawerContext";

import classes from "./Backdrop.module.css";

const Backdrop = () => {
    const sideDrawerCtx = useContext(SideDrawerContext);

  return (
    sideDrawerCtx.showBackdrop ? (
    <div className={classes.Backdrop}></div>
  ) : null )
};

export default Backdrop;
