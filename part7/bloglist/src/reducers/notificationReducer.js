const initialState = {
  message: null,
  error: null
};
let notificationTimeoutID;

const notificationReducer = (state = initialState, action) => {
  switch(action.type) {
  case "START_NOTIFICATION":
    return action.data.notification;
  case "END_NOTIFICATION":
    return action.data.notification;
  default:
    return state;
  }
};

export const endNotification = () => {
  return {
    type: "END_NOTIFICATION",
    data: {
      notification: {
        message: null,
        error: null
      }
    }
  };
};

export const notifyWith = (notification, duration, error) => {
  return dispatch => {
    clearTimeout(notificationTimeoutID);
    notificationTimeoutID = setTimeout(
      () => dispatch(endNotification()),
      duration * 1000
    );
    dispatch({
      type: "START_NOTIFICATION",
      data: {
        notification: {
          message: notification,
          error
        }}
    });
  };
};

export default notificationReducer;
