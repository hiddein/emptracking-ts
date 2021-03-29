import { combineReducers } from "redux";
import { datesReducer } from "./datesReducer";
import { empReducer } from './empReducer';
import { moveReducer } from "./moveReducer";
import { oneDayMovesReducer } from "./oneDayMovesReducer";
import { roomReducer } from "./roomReducer";
import { userReducer } from "./userReducer";

export const rootReducer = combineReducers({
    emp: empReducer,
    user: userReducer,
    room: roomReducer,
    move: moveReducer,
    dates: datesReducer,
    oneDayMoves: oneDayMovesReducer
})

export type rootState = ReturnType<typeof rootReducer>