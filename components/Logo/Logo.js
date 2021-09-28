import React, {useContext} from "react";
import SideDrawerContext from "../../store/SideDrawerContext";
import Link from "next/link";

import classes from "./Logo.module.css";

const logo = (props) => {
  const sideDrawerCtx = useContext(SideDrawerContext);
  return (
    <div className={classes.Logo} style={{ cursor: "pointer" }}>
      <Link href="/"  passHref>
        <div onClick={sideDrawerCtx.hideSideDrawer} className={classes.LogoContainer}>
          <svg
            display="inline-block"
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            width="40"
            height="30"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <p>
            <strong>|SpotMyNext</strong>
          </p>
        </div>
      </Link>
    </div>
  );
};

export default logo;
