import {
  LatenessActionTypes,
  LatenessAction,
  LatenessState,
} from "../../types/lateness"

const initialState: LatenessState = {
  lateness: [],
  loading: false,
  error: null,
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
