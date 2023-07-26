import { combineReducers } from "redux";
import authenticateSlice from "./useReducer";

const rootReducer = combineReducers({
  authenticate: authenticateSlice,
});

export default rootReducer;
