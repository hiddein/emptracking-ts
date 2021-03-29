

export interface OneDayMoveState {
    moves: any[]
    loading: boolean
    error: null | string

}

export enum OneDayMoveActionTypes {
    FETCH_ONEDAYMOVES = "FETCH_ONEDAYMOVES",
    FETCH_ONEDAYMOVES_SUCCESS = "FETCH_ONEDAYMOVES_SUCCESS",
    FETCH_ONEDAYMOVES_ERROR = "FETCH_ONEDAYMOVES_ERROR"

}

export interface OneDayMoveInterface {
    moveId: number,
    empId: number,
    firstName: string,
    middlName:string,
    lastName:string,
    roomId: number,
    nameRoom: string
    timeEnter: string,
    timeLeave: string,
    
}



interface FetchOneDayMoveAction {
    type: OneDayMoveActionTypes.FETCH_ONEDAYMOVES
}
interface FetchOneDayMoveSuccessAction {
    type: OneDayMoveActionTypes.FETCH_ONEDAYMOVES_SUCCESS
    payload: any[]
}

interface FetchOneDayMoveErrorAction {
    type: OneDayMoveActionTypes.FETCH_ONEDAYMOVES_ERROR
    payload: string
}

export type OneDayMoveAction = FetchOneDayMoveAction | FetchOneDayMoveSuccessAction | FetchOneDayMoveErrorAction
