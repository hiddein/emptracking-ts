

export interface MoveState {
    moves: any[]
    loading: boolean
    error: null | string
    oneDayMoves: any[]
    oneDayLoading: boolean
    oneDayError: null | string

}

export enum MoveActionTypes {
    FETCH_MOVES = "FETCH_MOVES",
    FETCH_MOVES_SUCCESS = "FETCH_MOVES_SUCCESS",
    FETCH_MOVES_ERROR = "FETCH_MOVES_ERROR",
    FETCH_ONEDAYMOVES = "FETCH_ONEDAYMOVES",
    FETCH_ONEDAYMOVES_SUCCESS = "FETCH_ONEDAYMOVES_SUCCESS",
    FETCH_ONEDAYMOVES_ERROR = "FETCH_ONEDAYMOVES_ERROR"
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

interface FetchOneDayMoveAction {
    type: MoveActionTypes.FETCH_ONEDAYMOVES
}
interface FetchOneDayMoveSuccessAction {
    type: MoveActionTypes.FETCH_ONEDAYMOVES_SUCCESS
    payload: any[]
}

interface FetchOneDayMoveErrorAction {
    type: MoveActionTypes.FETCH_ONEDAYMOVES_ERROR
    payload: string
}

export type MoveAction = FetchMoveAction | FetchMoveSuccessAction | FetchMoveErrorAction | FetchOneDayMoveAction | FetchOneDayMoveSuccessAction | FetchOneDayMoveErrorAction
 