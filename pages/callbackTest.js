import React, { useState, useCallback, useEffect } from "react";
import List from "./List";

export default function callbackTest() {
  const [number, setNumber] = useState(1);
  const [dark, setDark] = useState(false);

  const theme = {
    backgroundColor: dark ? "#333" : "#FFF",
    color: dark ? "#FFF" : "#333",
  };

  const calculateItems = useCallback(() => {
    return [number, number * 5];
  }, [number]);

  return (
    <div style={theme}>
      <p onClick={()=>setNumber(5)}>number</p>
      <button onClick={() => setDark((prevDark) => !prevDark)}>
        Toggle Theme
      </button>
      <List getItems={calculateItems} />
    </div>
  );
}
