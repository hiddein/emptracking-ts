export interface LatenessState {
    lateness: any[]
    loading: boolean
    error: null | string
    latenessByEmp: any[]
    loadingByEmp: boolean
    errorByEmp: null | string

}

export enum LatenessActionTypes {
    FETCH_LATENESS = "FETCH_LATENESS",
    FETCH_LATENESS_SUCCESS = "FETCH_LATENESS_SUCCESS",
    FETCH_LATENESS_ERROR = "FETCH_LATENESS_ERROR",
    FETCH_LATENESSBYEMP = "FETCH_LATENESSBYEMP",
    FETCH_LATENESSBYEMP_SUCCESS = "FETCH_LATENESSBYEMP_SUCCESS",
    FETCH_LATENESSBYEMP_ERROR = "FETCH_LATENESSBYEMP_ERROR"

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

interface FetchLatenessByEmpAction {
    type: LatenessActionTypes.FETCH_LATENESSBYEMP
}
interface FetchLatenessByEmpSuccessAction {
    type: LatenessActionTypes.FETCH_LATENESSBYEMP_SUCCESS
    payload: any[]
}

interface FetchLatenessByEmpErrorAction {
    type: LatenessActionTypes.FETCH_LATENESSBYEMP_ERROR
    payload: string
}

export type LatenessAction = FetchLatenessAction | FetchLatenessSuccessAction | FetchLatenessErrorAction | FetchLatenessByEmpAction | FetchLatenessByEmpSuccessAction | FetchLatenessByEmpErrorAction
