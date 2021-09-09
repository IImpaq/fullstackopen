const initialState = null;
let notificationTimeoutID;

const notificationReducer = (state = initialState, action) => {
  switch(action.type) {
  case "NOTIFY":
    return action.data.notification;
  case "END_NOTIFICATION":
    return null;
  default:
    return state;
  }
};

export const endNotification = () => {
  return { type: "END_NOTIFICATION" };
};

export const notifyWith = (notification, duration) => {
  return dispatch => {
    clearTimeout(notificationTimeoutID);
    notificationTimeoutID = setTimeout(
      () => dispatch(endNotification()),
      duration * 1000
    );
    dispatch({
      type: "NOTIFY",
      data: { notification }
    });
  };
};

export default notificationReducer;
