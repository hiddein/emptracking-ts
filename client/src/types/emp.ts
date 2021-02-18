 export interface EmpState {
    emps: any[]
    loading: boolean
    error: null | string

}

export enum UserActionTypes {
    FETCH_EMPS = "FETCH_EMPS",
    FETCH_EMPS_SUCCESS = "FETCH_EMPS_SUCCESS",
    FETCH_EMPS_ERROR = "FETCH_EMP_ERROR"

}

interface FetchEmpAction {
    type: UserActionTypes.FETCH_EMPS
}
interface FetchEmpSuccessAction {
    type: UserActionTypes.FETCH_EMPS_SUCCESS
    payload: any[]
}

interface FetchEmpErrorAction {
    type: UserActionTypes.FETCH_EMPS_ERROR
    payload: string
}

export type EmpAction = FetchEmpAction | FetchEmpSuccessAction | FetchEmpErrorAction
