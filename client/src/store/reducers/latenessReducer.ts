import {
  LatenessActionTypes,
  LatenessAction,
  LatenessState,
} from "../../types/lateness"

const initialState: LatenessState = {
  lateness: [],
  loading: false,
  error: null,
  latenessByEmp: [],
  loadingByEmp: false,
  errorByEmp: null,
}

export const LatenessReducer = (
  state = initialState,
  action: LatenessAction
): LatenessState => {
  switch (action.type) {
    case LatenessActionTypes.FETCH_LATENESS:
      return { ...state, loading: true, error: null, lateness: [] }

    case LatenessActionTypes.FETCH_LATENESS_SUCCESS:
      return { ...state, loading: false, error: null, lateness: action.payload }

    case LatenessActionTypes.FETCH_LATENESS_ERROR:
      return { ...state, loading: false, error: action.payload, lateness: [] }

    case LatenessActionTypes.FETCH_LATENESSBYEMP:
      return { ...state, loadingByEmp: true, errorByEmp: null, latenessByEmp: [] }

    case LatenessActionTypes.FETCH_LATENESSBYEMP_SUCCESS:
      return { ...state, loadingByEmp: false, errorByEmp: null, latenessByEmp: action.payload }

    case LatenessActionTypes.FETCH_LATENESSBYEMP_ERROR:
      return { ...state, loadingByEmp: false, errorByEmp: action.payload, latenessByEmp: [] }

    default:
      return state
  }
}
export const fetchLateness = () => ({
  type: LatenessActionTypes.FETCH_LATENESS,
})

export const fetchLatenessSuccess = (lateness: any) => ({
  type: LatenessActionTypes.FETCH_LATENESS_SUCCESS,
  payload: lateness,
})

export const fetchLatenessError = (error: string) => ({
  type: LatenessActionTypes.FETCH_LATENESS_ERROR,
  payload: error,
})

export const fetchLatenessByEmp = () => ({
  type: LatenessActionTypes.FETCH_LATENESSBYEMP,
})

export const fetchLatenessByEmpSuccess = (lateness: any) => ({
  type: LatenessActionTypes.FETCH_LATENESSBYEMP_SUCCESS,
  payload: lateness,
})

export const fetchLatenessByEmpError = (error: string) => ({
  type: LatenessActionTypes.FETCH_LATENESSBYEMP_ERROR,
  payload: error,
})
