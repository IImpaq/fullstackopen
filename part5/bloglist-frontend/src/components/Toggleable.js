import React, { useState } from "react";

const Toggleable = (props) => {
  const [isVisible, setVisible] = useState(false);

  const showWhenVisible = { display: isVisible ? "" : "none" };
  const hideWhenVisible = { display: isVisible ? "none" : "" };

  const toggleVisibility = () => {
    setVisible(!isVisible);
  };

  return (
    <>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.openText}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>{props.closeText}</button>
      </div>
    </>
  );
};

export default Toggleable;
