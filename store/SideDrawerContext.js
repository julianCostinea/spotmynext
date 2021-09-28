import { createContext, useState } from "react";

const SideDrawerContext = createContext({
  showMenu: false,
  hideSideDrawer: () => {},
  showSideDrawer: () => {},
  toggleSideDrawer: () => {},
});

export function SideDrawerContextProvider(props) {
  const [showMenu, setShowMenu] = useState();

  function showMenuHandler() {
    setShowMenu(true);
  }
  function hideMenuHandler() {
    setShowMenu(false);
  }
  function sideDrawerToggleHandler() {
    setShowMenu(!showMenu);
  }

  const context = {
    showMenu: showMenu,
    hideSideDrawer: hideMenuHandler,
    showSideDrawer: showMenuHandler,
    toggleSideDrawer: sideDrawerToggleHandler,
  };
  return (
    <SideDrawerContext.Provider value={context}>
      {props.children}
    </SideDrawerContext.Provider>
  );
}

export default SideDrawerContext;
