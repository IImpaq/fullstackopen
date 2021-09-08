const initialState = null;

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

export const notifyWith = (notification) => {
  return {
    type: "NOTIFY",
    data: { notification }
  };
};

export const endNotification = () => {
  return { type: "END_NOTIFICATION" };
};

export default notificationReducer;
