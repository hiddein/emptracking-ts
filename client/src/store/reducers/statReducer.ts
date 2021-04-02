import { StatState, StatAction, StatActionTypes } from "../../types/stat"

const initialState: StatState = {
  stat: [],
  loading: false,
  error: null,
  statDaySort: [],
  loadingDaySort: false,
  errorDaySort: null,
  statDepSort: [],
  loadingDepSort: false,
  errorDepSort: null,
}

export const statReducer = (state = initialState,action: StatAction): StatState => {
  switch (action.type) {
    case StatActionTypes.FETCH_STAT:
      return { ...state, loading: true, error: null, stat: [] }

    case StatActionTypes.FETCH_STAT_SUCCESS:
      return { ...state, loading: false, error: null, stat: action.payload }

    case StatActionTypes.FETCH_STAT_ERROR:
      return { ...state, loading: false, error: action.payload, stat: [] }

    case StatActionTypes.FETCH_STATDAYSORT:
      return {
        ...state,
        loadingDaySort: true,
        errorDaySort: null,
        statDaySort: [],
      }

    case StatActionTypes.FETCH_STATDAYSORT_SUCCESS:
      return {
        ...state,
        loadingDaySort: false,
        errorDaySort: null,
        statDaySort: action.payload,
      }

    case StatActionTypes.FETCH_STATDAYSORT_ERROR:
      return {
        ...state,
        loadingDaySort: false,
        errorDaySort: action.payload,
        statDaySort: [],
      }

    case StatActionTypes.FETCH_STATBYDEP:
      return { ...state, loading: true, error: null, statDepSort: [] }

    case StatActionTypes.FETCH_STATBYDEP_SUCCESS:
      return {
        ...state,
        loadingDepSort: false,
        errorDepSort: null,
        statDepSort: action.payload,
      }

    case StatActionTypes.FETCH_STATBYDEP_ERROR:
      return {
        ...state,
        loadingDepSort: false,
        errorDepSort: action.payload,
        statDepSort: [],
      }
    default:
      return state
  }
}
export const fetchStat = () => ({
  type: StatActionTypes.FETCH_STAT,
})

export const fetchStatSuccess = (stat: any) => ({
  type: StatActionTypes.FETCH_STAT_SUCCESS,
  payload: stat,
})

export const fetchStatError = (error: string) => ({
  type: StatActionTypes.FETCH_STAT_ERROR,
  payload: error,
})

export const fetchStatByDep = () => ({
  type: StatActionTypes.FETCH_STATBYDEP,
})

export const fetchStatByDepSuccess = (stat: any) => ({
  type: StatActionTypes.FETCH_STATBYDEP_SUCCESS,
  payload: stat,
})

export const fetchStatByDepError = (error: string) => ({
  type: StatActionTypes.FETCH_STATBYDEP_ERROR,
  payload: error,
})

export const fetchStatDaySort = () => ({
  type: StatActionTypes.FETCH_STATDAYSORT,
})

export const fetchStatDaySortSuccess = (stat: any) => ({
  type: StatActionTypes.FETCH_STATDAYSORT_SUCCESS,
  payload: stat,
})

export const fetchStatDaySortError = (error: string) => ({
  type: StatActionTypes.FETCH_STATDAYSORT_ERROR,
  payload: error,
})
