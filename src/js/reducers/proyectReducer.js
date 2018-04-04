import { ADD_PROYECT, UPDATE_PROYECT, DELETE_PROYECT } from "../constants/action-types";

const proyectReducer = (state = [], action) => {
  switch (action.type) {
    case DELETE_PROYECT:
      return state.filter((item) => item.id !== action.payload);
    // return [...state, algo];
    //return state.filter((item, id) => id === action.payload);
    case ADD_PROYECT:
      return [...state, action.payload];
    case UPDATE_PROYECT:
     /* var foundIndex = state.findIndex(x => x.id == action.payload.id);
      const newState = state.map((article, id) => {
        if (id === foundIndex) {
          return action.payload;
        }
        return article;
      })
      //Is this the right way to update the state?
      return state = newState;*/

    //    return state;
    default:
      return state;
  }
};

export default proyectReducer;
