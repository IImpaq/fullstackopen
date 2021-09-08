const initialState = "render notification here...";

const notificationReducer = (state = initialState, action) => {
  switch(action.type) {
  case "NOTIFY":
    return action.data.notification;
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

export default notificationReducer;
