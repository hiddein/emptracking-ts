

export interface MoveState {
    moves: any[]
    loading: boolean
    error: null | string

}

export enum MoveActionTypes {
    FETCH_MOVES = "FETCH_MOVES",
    FETCH_MOVES_SUCCESS = "FETCH_MOVES_SUCCESS",
    FETCH_MOVES_ERROR = "FETCH_MOVES_ERROR"

}

export interface MoveInterface {
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



interface FetchMoveAction {
    type: MoveActionTypes.FETCH_MOVES
}
interface FetchMoveSuccessAction {
    type: MoveActionTypes.FETCH_MOVES_SUCCESS
    payload: any[]
}

interface FetchMoveErrorAction {
    type: MoveActionTypes.FETCH_MOVES_ERROR
    payload: string
}

export type MoveAction = FetchMoveAction | FetchMoveSuccessAction | FetchMoveErrorAction
