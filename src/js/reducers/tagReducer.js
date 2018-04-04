import { SAVE_TAG, DELETE_TAG } from "../constants/action-types";

const tagReducer = (state = [], action) => {
  switch (action.type) {
    case DELETE_TAG:
      return state.filter((item) => item.id !== action.payload);
    case SAVE_TAG:
    console.log(action.payload);
       return [...state, action.payload];
    default:
      return state;
  }
};

export default tagReducer;
