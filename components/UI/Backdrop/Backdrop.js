import React, {useContext} from "react";
import SideDrawerContext from "../../../store/SideDrawerContext";

import classes from "./Backdrop.module.css";

const Backdrop = (props) => {
    const sideDrawerCtx = useContext(SideDrawerContext);

  return (
    sideDrawerCtx.showMenu ? (
    <div className={classes.Backdrop} onClick={sideDrawerCtx.hideSideDrawer}></div>
  ) : null )
};

export default Backdrop;
