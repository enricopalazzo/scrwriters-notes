import { ADD_ARTICLE, UPDATE_ARTICLE, DELETE_ARTICLE } from "../constants/action-types";

const articleReducer = (state = [], action) => {
  switch (action.type) {
    case DELETE_ARTICLE:
      return state.filter((item) => item.id !== action.payload);
    // return [...state, algo];
    //return state.filter((item, id) => id === action.payload);
    case ADD_ARTICLE:
      return [...state, action.payload];
    case UPDATE_ARTICLE:
      var foundIndex = state.findIndex(x => x.id == action.payload.id);
      /* const newState = state.map((article, id) => {
         if (id === foundIndex) {
           return action.payload;
         }
         return article;
       })*/
      var newState = [
        ...state.slice(0, foundIndex),
        action.payload,
        ...state.slice(foundIndex + 1)
      ];
      console.log(newState);
      //Is this the right way to update the state?
      //return state = newState;
      return newState;
    default:
      return state;
  }
};

export default articleReducer;
