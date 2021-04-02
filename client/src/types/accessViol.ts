export interface AccessViolState {
    viols: any[]
    loading: boolean
    error: null | string

}

export enum AccessViolActionTypes {
    FETCH_ACCESSVIOLS = "FETCH_ACCESSVIOLS",
    FETCH_ACCESSVIOLS_SUCCESS = "FETCH_ACCESSVIOLS_SUCCESS",
    FETCH_ACCESSVIOLS_ERROR = "FETCH_ACCESSVIOLS_ERROR"

}



interface FetchAccessViolAction {
    type: AccessViolActionTypes.FETCH_ACCESSVIOLS
}
interface FetchAccessViolSuccessAction {
    type: AccessViolActionTypes.FETCH_ACCESSVIOLS_SUCCESS
    payload: any[]
}

interface FetchAccessViolErrorAction {
    type: AccessViolActionTypes.FETCH_ACCESSVIOLS_ERROR
    payload: string
}

export type AccessViolAction = FetchAccessViolAction | FetchAccessViolSuccessAction | FetchAccessViolErrorAction
