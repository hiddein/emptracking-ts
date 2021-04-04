import { combineReducers } from "redux";
import { datesReducer } from "./datesReducer";
import { empReducer } from './empReducer';
import { moveReducer } from "./moveReducer";
import { roomReducer } from "./roomReducer";
import { userReducer } from "./userReducer";
import { statReducer } from "./statReducer";
import { accessViolReducer } from "./accessViolReducer";
import { LatenessReducer } from "./latenessReducer";
import { workHoursViolReducer } from "./workHoursViolReducer";

export const rootReducer = combineReducers({
    emp: empReducer,
    user: userReducer,
    room: roomReducer,
    move: moveReducer,
    dates: datesReducer,
    stat: statReducer,
    viol: accessViolReducer,
    lateness: LatenessReducer,
    workHoursViol: workHoursViolReducer
})

export type rootState = ReturnType<typeof rootReducer>