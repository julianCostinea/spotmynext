import React, { useState, useEffect } from "react";

import Toolbar from "../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../components/Navigation/SideDrawer/SideDrawer";
import Footer from "../components/Footer/Footer";

import classes from "./Layout.module.css";
import { SideDrawerContextProvider } from "../store/SideDrawerContext";

const Layout = (props) => {
  const [showSideDrawer, setShowSideDrawer] = useState(false);

  const closeSideDrawer = () => {
    setShowSideDrawer(false);
  };

  const sideDrawerToggleHandler = () => {
    setShowSideDrawer(!showSideDrawer)
  };

  return (
    <React.Fragment>
      <div className={classes.container}>
        <SideDrawerContextProvider>
        <Toolbar
          drawerToggleClicked={sideDrawerToggleHandler}
        />
        <SideDrawer
              open={showSideDrawer}
              closed={closeSideDrawer}
            />
          </SideDrawerContextProvider>
        <main className={classes.main}>{props.children}</main>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Layout;