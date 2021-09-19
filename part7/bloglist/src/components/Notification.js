import React from "react";
import {connect} from "react-redux";
import {Alert} from "@material-ui/lab";

const Notification = (props) => {
  if(props.message === null) {
    return null;
  }

  const severity = props.error ? "error" : "success";

  return (
    <Alert severity={severity}>
      {props.message}
    </Alert>
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