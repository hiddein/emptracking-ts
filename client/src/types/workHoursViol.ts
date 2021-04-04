export interface WorkHoursViolState {
    viols: any[]
    loading: boolean
    error: null | string
    violsByEmp: any[]
    loadingByEmp: boolean
    errorByEmp: null | string
}

export enum WorkHoursViolActionTypes {
    FETCH_WORKHOURSVIOLS = "FETCH_WORKHOURSVIOLS",
    FETCH_WORKHOURSVIOLS_SUCCESS = "FETCH_WORKHOURSVIOLS_SUCCESS",
    FETCH_WORKHOURSVIOLS_ERROR = "FETCH_WORKHOURSVIOLS_ERROR",
    FETCH_WORKHOURSVIOLSBYEMP = "FETCH_WORKHOURSVIOLSBYEMP",
    FETCH_WORKHOURSVIOLSBYEMP_SUCCESS = "FETCH_WORKHOURSVIOLSBYEMP_SUCCESS",
    FETCH_WORKHOURSVIOLSBYEMP_ERROR = "FETCH_WORKHOURSVIOLSBYEMP_ERROR",

}

interface FetchWorkHoursViolAction {
    type: WorkHoursViolActionTypes.FETCH_WORKHOURSVIOLS
}
interface FetchWorkHoursViolSuccessAction {
    type: WorkHoursViolActionTypes.FETCH_WORKHOURSVIOLS_SUCCESS
    payload: any[]
}

interface FetchWorkHoursViolErrorAction {
    type: WorkHoursViolActionTypes.FETCH_WORKHOURSVIOLS_ERROR
    payload: string
}

interface FetchWorkHoursViolByEmpAction {
    type: WorkHoursViolActionTypes.FETCH_WORKHOURSVIOLSBYEMP
}
interface FetchWorkHoursViolByEmpSuccessAction {
    type: WorkHoursViolActionTypes.FETCH_WORKHOURSVIOLSBYEMP_SUCCESS
    payload: any[]
}

interface FetchWorkHoursViolByEmpErrorAction {
    type: WorkHoursViolActionTypes.FETCH_WORKHOURSVIOLSBYEMP_ERROR
    payload: string
}


export type WorkHoursViolAction = FetchWorkHoursViolAction | FetchWorkHoursViolSuccessAction | FetchWorkHoursViolErrorAction | FetchWorkHoursViolByEmpAction | FetchWorkHoursViolByEmpSuccessAction | FetchWorkHoursViolByEmpErrorAction
