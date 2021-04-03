export interface AccessViolState {
    viols: any[]
    loading: boolean
    error: null | string
    violsByEmp: any[]
    loadingByEmp: boolean
    errorByEmp: null | string
    violsByEmpDays: any[]
    loadingByEmpDays: boolean
    errorByEmpDays: null | string
}

export enum AccessViolActionTypes {
    FETCH_ACCESSVIOLS = "FETCH_ACCESSVIOLS",
    FETCH_ACCESSVIOLS_SUCCESS = "FETCH_ACCESSVIOLS_SUCCESS",
    FETCH_ACCESSVIOLS_ERROR = "FETCH_ACCESSVIOLS_ERROR",
    FETCH_ACCESSVIOLSBYEMP = "FETCH_ACCESSVIOLSBYEMP",
    FETCH_ACCESSVIOLSBYEMP_SUCCESS = "FETCH_ACCESSVIOLSBYEMP_SUCCESS",
    FETCH_ACCESSVIOLSBYEMP_ERROR = "FETCH_ACCESSVIOLSBYEMP_ERROR",
    FETCH_ACCESSVIOLSBYEMPDAYS = "FETCH_ACCESSVIOLSBYEMPDAYS",
    FETCH_ACCESSVIOLSBYEMPDAYS_SUCCESS = "FETCH_ACCESSVIOLSBYEMPDAYS_SUCCESS",
    FETCH_ACCESSVIOLSBYEMPDAYS_ERROR = "FETCH_ACCESSVIOLSBYEMPDAYS_ERROR"

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

interface FetchAccessViolByEmpAction {
    type: AccessViolActionTypes.FETCH_ACCESSVIOLSBYEMP
}
interface FetchAccessViolByEmpSuccessAction {
    type: AccessViolActionTypes.FETCH_ACCESSVIOLSBYEMP_SUCCESS
    payload: any[]
}

interface FetchAccessViolByEmpErrorAction {
    type: AccessViolActionTypes.FETCH_ACCESSVIOLSBYEMP_ERROR
    payload: string
}

interface FetchAccessViolByEmpDaysAction {
    type: AccessViolActionTypes.FETCH_ACCESSVIOLSBYEMPDAYS
}
interface FetchAccessViolByEmpDaysSuccessAction {
    type: AccessViolActionTypes.FETCH_ACCESSVIOLSBYEMPDAYS_SUCCESS
    payload: any[]
}

interface FetchAccessViolByEmpDaysErrorAction {
    type: AccessViolActionTypes.FETCH_ACCESSVIOLSBYEMPDAYS_ERROR
    payload: string
}


export type AccessViolAction = FetchAccessViolAction | FetchAccessViolSuccessAction | FetchAccessViolErrorAction | FetchAccessViolByEmpAction | FetchAccessViolByEmpSuccessAction | FetchAccessViolByEmpErrorAction | FetchAccessViolByEmpDaysAction | FetchAccessViolByEmpDaysSuccessAction | FetchAccessViolByEmpDaysErrorAction
