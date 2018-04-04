import { CHANGE_TAB } from "../constants/action-types";

const currentTabReducer = (state = [], action) => {
  switch (action.type) {
    case CHANGE_TAB:
      return state = action.payload;
    default:
      return state;
  }
};
export default currentTabReducer;
