import {
  AccessViolState,
  AccessViolAction,
  AccessViolActionTypes,
} from "../../types/accessViol"

const initialState: AccessViolState = {
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

export const accessViolReducer = (
  state = initialState,
  action: AccessViolAction
): AccessViolState => {
  switch (action.type) {
    case AccessViolActionTypes.FETCH_ACCESSVIOLS:
      return { ...state, loading: true, error: null, viols: [] }

    case AccessViolActionTypes.FETCH_ACCESSVIOLS_SUCCESS:
      return { ...state, loading: false, error: null, viols: action.payload }

    case AccessViolActionTypes.FETCH_ACCESSVIOLS_ERROR:
      return { ...state, loading: false, error: action.payload, viols: [] }


    case AccessViolActionTypes.FETCH_ACCESSVIOLSBYEMP:
      return { ...state, loadingByEmp: true, errorByEmp: null, violsByEmp: [] }

    case AccessViolActionTypes.FETCH_ACCESSVIOLSBYEMP_SUCCESS:
      return { ...state, loadingByEmp: false, errorByEmp: null, violsByEmp: action.payload }

    case AccessViolActionTypes.FETCH_ACCESSVIOLSBYEMP_ERROR:
      return { ...state, loadingByEmp: false, errorByEmp: action.payload, violsByEmp: [] }


    case AccessViolActionTypes.FETCH_ACCESSVIOLSBYEMPDAYS:
      return { ...state, loadingByEmpDays: true, errorByEmpDays: null, violsByEmpDays: [] }
  
    case AccessViolActionTypes.FETCH_ACCESSVIOLSBYEMPDAYS_SUCCESS:
      return { ...state, loadingByEmpDays: false, errorByEmpDays: null, violsByEmpDays: action.payload }
  
    case AccessViolActionTypes.FETCH_ACCESSVIOLSBYEMPDAYS_ERROR:
      return { ...state, loadingByEmpDays: false, errorByEmpDays: action.payload, violsByEmpDays: [] }

    default:
      return state
  }
}
export const fetchAccessViol = () => ({
  type: AccessViolActionTypes.FETCH_ACCESSVIOLS,
})

export const fetchAccessViolSuccess = (viols: any) => ({
  type: AccessViolActionTypes.FETCH_ACCESSVIOLS_SUCCESS,
  payload: viols,
})

export const fetchAccessViolError = (error: string) => ({
  type: AccessViolActionTypes.FETCH_ACCESSVIOLS_ERROR,
  payload: error,
})

export const fetchAccessViolByEmp = () => ({
  type: AccessViolActionTypes.FETCH_ACCESSVIOLSBYEMP,
})

export const fetchAccessViolByEmpSuccess = (viols: any) => ({
  type: AccessViolActionTypes.FETCH_ACCESSVIOLSBYEMP_SUCCESS,
  payload: viols,
})

export const fetchAccessViolByEmpError = (error: string) => ({
  type: AccessViolActionTypes.FETCH_ACCESSVIOLSBYEMP_ERROR,
  payload: error,
})

export const fetchAccessViolByEmpDays = () => ({
  type: AccessViolActionTypes.FETCH_ACCESSVIOLSBYEMPDAYS,
})

export const fetchAccessViolByEmpDaysSuccess = (viols: any) => ({
  type: AccessViolActionTypes.FETCH_ACCESSVIOLSBYEMPDAYS_SUCCESS,
  payload: viols,
})

export const fetchAccessViolByEmpDaysError = (error: string) => ({
  type: AccessViolActionTypes.FETCH_ACCESSVIOLSBYEMPDAYS_ERROR,
  payload: error,
})
