import React from "react";

const Notification = ({message, isError}) => {
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

  const style = isError ? errorStyle : infoStyle;
  const className = isError ? "error" : "info";

  return (
    <div style={style} className={className}>
      {message}
    </div>
  );
};

export default Notification;