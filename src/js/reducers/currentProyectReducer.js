import { CHANGE_PROYECT } from "../constants/action-types";

const currentProyectReducer = (state = [], action) => {
  switch (action.type) {
    case CHANGE_PROYECT:
      return state = action.payload;
    default:
      return state;
  }
};
export default currentProyectReducer;
