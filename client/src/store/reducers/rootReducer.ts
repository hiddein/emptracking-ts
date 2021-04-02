import { combineReducers } from "redux";
import { datesReducer } from "./datesReducer";
import { empReducer } from './empReducer';
import { moveReducer } from "./moveReducer";
import { roomReducer } from "./roomReducer";
import { userReducer } from "./userReducer";
import { statReducer } from "./statReducer";

export const rootReducer = combineReducers({
    emp: empReducer,
    user: userReducer,
    room: roomReducer,
    move: moveReducer,
    dates: datesReducer,
    stat: statReducer,
})

export type rootState = ReturnType<typeof rootReducer>