import { combineReducers } from "redux";
import exerciseReducer from "./exerciseReducer";
import trainingRequestReducer from "./trainingRequestReducer";
import authReducer from "./authReducer";


const rootReducer = combineReducers({
  exercise: exerciseReducer,
  training: trainingRequestReducer,
  auth: authReducer
});

export default rootReducer;
