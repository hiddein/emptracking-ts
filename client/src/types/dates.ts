export interface DatesState {
    startDate: Date,
    endDate: Date

}

export enum DatesActionTypes {
    SET_STARTDATE = "SET_STARTDATE",
    SET_ENDDATE  = "SET_ENDDATE",

}

interface SetStartDayAction {
    type: DatesActionTypes.SET_STARTDATE,
    payload: Date
}
interface SetEndDayAction {
    type: DatesActionTypes.SET_ENDDATE,
    payload: Date
}


export type DatesAction = SetStartDayAction | SetEndDayAction
