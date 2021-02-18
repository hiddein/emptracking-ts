import { combineReducers } from "redux";
import { empReducer } from './empReducer';

export const rootReducer = combineReducers({
    emp: empReducer
})