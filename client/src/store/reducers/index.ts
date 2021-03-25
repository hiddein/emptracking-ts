import { combineReducers } from "redux";
import { empReducer } from './empReducer';
import { roomReducer } from "./roomReducer";
import { userReducer } from "./userReducer";

export const rootReducer = combineReducers({
    emp: empReducer,
    user: userReducer,
    room: roomReducer
})

export type rootState = ReturnType<typeof rootReducer>