import { combineReducers } from "redux";
import { empReducer } from './empReducer';
import { userReducer } from "./userReducer";

export const rootReducer = combineReducers({
    emp: empReducer,
    user: userReducer
})

export type rootState = ReturnType<typeof rootReducer>