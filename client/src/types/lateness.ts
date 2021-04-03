export interface LatenessState {
    lateness: any[]
    loading: boolean
    error: null | string

}

export enum LatenessActionTypes {
    FETCH_LATENESS = "FETCH_LATENESS",
    FETCH_LATENESS_SUCCESS = "FETCH_LATENESS_SUCCESS",
    FETCH_LATENESS_ERROR = "FETCH_LATENESS_ERROR"

}


interface FetchLatenessAction {
    type: LatenessActionTypes.FETCH_LATENESS
}
interface FetchLatenessSuccessAction {
    type: LatenessActionTypes.FETCH_LATENESS_SUCCESS
    payload: any[]
}

interface FetchLatenessErrorAction {
    type: LatenessActionTypes.FETCH_LATENESS_ERROR
    payload: string
}

export type LatenessAction = FetchLatenessAction | FetchLatenessSuccessAction | FetchLatenessErrorAction
