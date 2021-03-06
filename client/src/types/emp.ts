 export interface EmpState {
    emps: any[]
    loading: boolean
    error: null | string
    access: any[]
    accessLoading:boolean
    accessError: null | string
    deps: any[]
    depsLoading: boolean
    depsError: null | string
}

export enum UserActionTypes {
    FETCH_EMPS = "FETCH_EMPS",
    FETCH_EMPS_SUCCESS = "FETCH_EMPS_SUCCESS",
    FETCH_EMPS_ERROR = "FETCH_EMP_ERROR",
    FETCH_ACCESS = "FETCH_ACCESS",
    FETCH_ACCESS_SUCCESS = "FETCH_ACCESS_SUCCESS",
    FETCH_ACCESS_ERROR = "FETCH_ACCESS_ERROR",
    FETCH_DEPS = "FETCH_DEPS",
    FETCH_DEPS_SUCCESS = "FETCH_DEPS_SUCCESS",
    FETCH_DEPS_ERROR = "FETCH_DEPS_ERROR"

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

interface FetchAccessAction {
    type: UserActionTypes.FETCH_ACCESS
}
interface FetchAccessSuccessAction {
    type: UserActionTypes.FETCH_ACCESS_SUCCESS
    payload: any[]
}

interface FetchAccessErrorAction {
    type: UserActionTypes.FETCH_ACCESS_ERROR
    payload: string
}

interface FetchDepsAction {
    type: UserActionTypes.FETCH_DEPS
}
interface FetchDepsSuccessAction {
    type: UserActionTypes.FETCH_DEPS_SUCCESS
    payload: any[]
}

interface FetchDepsErrorAction {
    type: UserActionTypes.FETCH_DEPS_ERROR
    payload: string
}


export type EmpAction = FetchEmpAction | FetchEmpSuccessAction | FetchEmpErrorAction | FetchAccessAction | FetchAccessSuccessAction | FetchAccessErrorAction | FetchDepsAction | FetchDepsSuccessAction | FetchDepsErrorAction
