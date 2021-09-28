import React, { useContext } from "react";
import SideDrawerContext from "../../../store/SideDrawerContext";
import classes from "./DrawerToggle.module.css";

const DrawerToggle = (props) => {
  const sideDrawerCtx = useContext(SideDrawerContext);

  return (
    <div className={classes.DrawerToggle} onClick={sideDrawerCtx.toggleSideDrawer}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default DrawerToggle;
