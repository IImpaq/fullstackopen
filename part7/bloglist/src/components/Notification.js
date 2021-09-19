import React from "react";
import {connect} from "react-redux";

const Notification = (props) => {
  if(props.message === null) {
    return <></>;
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

  const style = props.error ? errorStyle : infoStyle;
  const className = props.error ? "error" : "info";

  return (
    <div style={style} className={className}>
      {props.message}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    message: state.notification.message,
    error: state.notification.error
  };
};

const ConnectedNotification = connect(mapStateToProps)(Notification);
export default ConnectedNotification;