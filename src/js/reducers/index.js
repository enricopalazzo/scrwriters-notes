import { combineReducers } from "redux";
import articleReducer from "./articleReducer";
import proyectReducer from "./proyectReducer";
import currentProyectReducer from "./currentProyectReducer";
import currentTabReducer from "./currentTabReducer";
import tagReducer from "./tagReducer";

export default combineReducers(
  {
    articles: articleReducer,
    proyects: proyectReducer,
    currentproyect: currentProyectReducer,
    currenttab: currentTabReducer, 
    tags: tagReducer
  });
