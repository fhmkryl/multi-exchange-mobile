import { createStore } from "redux";
import mainReducer from "app/reducers/MainReducer";

const store = createStore(mainReducer);

export default store;