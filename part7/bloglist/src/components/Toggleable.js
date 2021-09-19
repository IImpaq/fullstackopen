import React, { useState } from "react";
import {Button} from "@material-ui/core";

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
        <Button
          variant="contained"
          color="primary"
          onClick={toggleVisibility}>
          {props.openText}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button
          variant="contained"
          color="default"
          onClick={toggleVisibility}>
          {props.closeText}
        </Button>
      </div>
    </>
  );
};

export default Toggleable;
