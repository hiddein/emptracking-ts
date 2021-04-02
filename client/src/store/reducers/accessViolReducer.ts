import { AccessViolState, AccessViolAction, AccessViolActionTypes } from "../../types/accessViol"

const initialState: AccessViolState = {
  viols: [],
  loading: false,
  error: null,

}

export const accessViolReducer = (state = initialState,action: AccessViolAction ): AccessViolState => {
  switch (action.type) {
    case AccessViolActionTypes.FETCH_ACCESSVIOLS:
      return { ...state, loading: true, error: null, viols: [] }

    case AccessViolActionTypes.FETCH_ACCESSVIOLS_SUCCESS:
      return { ...state, loading: false, error: null, viols: action.payload }

    case AccessViolActionTypes.FETCH_ACCESSVIOLS_ERROR:
      return { ...state, loading: false, error: action.payload, viols: [] }

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
