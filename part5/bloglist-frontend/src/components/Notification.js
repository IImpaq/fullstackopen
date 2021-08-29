import React from "react";

const Notification = ({message, error}) => {
  if(message === null) {
    return null;
  }

  const infoStyle = {
    color: "green",
    background: "lightgray",
    fontSize: "18px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  };

  const errorStyle = {
    color: "red",
    background: "lightgray",
    fontSize: "18px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  };

  const style = error ? errorStyle : infoStyle;

  return (
    <div style={style}>
      {message}
    </div>
  );
}

export default Notification;