import { createStore } from "redux";
import rootReducer from "../reducers/index";
import uuidv1 from "uuid";
//create empty proyect
const idx = uuidv1();
const emptyproyect = { title: 'None / Undefined Proyect', content: '', id: 1 };

const store = createStore(
  rootReducer,{articles:[], proyects:[emptyproyect], currentproyect:1, currenttab:0, tags:[]},
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
