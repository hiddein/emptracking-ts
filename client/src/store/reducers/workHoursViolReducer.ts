import {
    WorkHoursViolState,
    WorkHoursViolAction,
    WorkHoursViolActionTypes,
  } from "../../types/workHoursViol"
  
  const initialState: WorkHoursViolState = {
    viols: [],
    loading: false,
    error: null,
    violsByEmp: [],
    loadingByEmp: false,
    errorByEmp: null,
    violsByEmpDays: [],
    loadingByEmpDays: false,
    errorByEmpDays: null,
  }
  
  export const workHoursViolReducer = (
    state = initialState,
    action: WorkHoursViolAction
  ): WorkHoursViolState => {
    switch (action.type) {
      case WorkHoursViolActionTypes.FETCH_WORKHOURSVIOLS:
        return { ...state, loading: true, error: null, viols: [] }
  
      case WorkHoursViolActionTypes.FETCH_WORKHOURSVIOLS_SUCCESS:
        return { ...state, loading: false, error: null, viols: action.payload }
  
      case WorkHoursViolActionTypes.FETCH_WORKHOURSVIOLS_ERROR:
        return { ...state, loading: false, error: action.payload, viols: [] }
  
  
      case WorkHoursViolActionTypes.FETCH_WORKHOURSVIOLSBYEMP:
        return { ...state, loadingByEmp: true, errorByEmp: null, violsByEmp: [] }
  
      case WorkHoursViolActionTypes.FETCH_WORKHOURSVIOLSBYEMP_SUCCESS:
        return { ...state, loadingByEmp: false, errorByEmp: null, violsByEmp: action.payload }
  
      case WorkHoursViolActionTypes.FETCH_WORKHOURSVIOLSBYEMP_ERROR:
        return { ...state, loadingByEmp: false, errorByEmp: action.payload, violsByEmp: [] }
  
      default:
        return state
    }
  }
  export const fetchWorkHoursViol = () => ({
    type: WorkHoursViolActionTypes.FETCH_WORKHOURSVIOLS,
  })
  
  export const fetchWorkHoursViolSuccess = (viols: any) => ({
    type: WorkHoursViolActionTypes.FETCH_WORKHOURSVIOLS_SUCCESS,
    payload: viols,
  })
  
  export const fetchWorkHoursViolError = (error: string) => ({
    type: WorkHoursViolActionTypes.FETCH_WORKHOURSVIOLS_ERROR,
    payload: error,
  })
  
  export const fetchWorkHoursViolByEmp = () => ({
    type: WorkHoursViolActionTypes.FETCH_WORKHOURSVIOLSBYEMP,
  })
  
  export const fetchWorkHoursViolByEmpSuccess = (viols: any) => ({
    type: WorkHoursViolActionTypes.FETCH_WORKHOURSVIOLSBYEMP_SUCCESS,
    payload: viols,
  })
  
  export const fetchWorkHoursViolByEmpError = (error: string) => ({
    type: WorkHoursViolActionTypes.FETCH_WORKHOURSVIOLSBYEMP_ERROR,
    payload: error,
  })
  
