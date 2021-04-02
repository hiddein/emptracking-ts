import { MoveState, MoveAction, MoveActionTypes } from "../../types/move"

const initialState: MoveState = {
  moves: [],
  loading: false,
  error: null,
  oneDayMoves: [],
  oneDayLoading: false,
  oneDayError: null,
}

export const moveReducer = (
  state = initialState,
  action: MoveAction
): MoveState => {
  switch (action.type) {
    case MoveActionTypes.FETCH_MOVES:
      return { ...state, loading: true, error: null, moves: [] }

    case MoveActionTypes.FETCH_MOVES_SUCCESS:
      return { ...state, loading: false, error: null, moves: action.payload }

    case MoveActionTypes.FETCH_MOVES_ERROR:
      return { ...state, loading: false, error: action.payload, moves: [] }

    case MoveActionTypes.FETCH_ONEDAYMOVES:
      return { ...state, oneDayLoading: true, oneDayError: null, oneDayMoves: [] }

    case MoveActionTypes.FETCH_ONEDAYMOVES_SUCCESS:
      return { ...state, oneDayLoading: false, oneDayError: null, oneDayMoves: action.payload }

    case MoveActionTypes.FETCH_ONEDAYMOVES_ERROR:
      return { ...state, oneDayLoading: false, oneDayError: action.payload, oneDayMoves: [] }

    default:
      return state
  }
}
export const fetchMoves = () => ({
  type: MoveActionTypes.FETCH_MOVES,
})

export const fetchMovesSuccess = (moves: any) => ({
  type: MoveActionTypes.FETCH_MOVES_SUCCESS,
  payload: moves,
})

export const fetchMovesError = (error: string) => ({
  type: MoveActionTypes.FETCH_MOVES_ERROR,
  payload: error,
})

export const fetchOneDayMoves = () => ({
  type: MoveActionTypes.FETCH_ONEDAYMOVES,
})

export const fetchOneDayMovesSuccess = (moves: any) => ({
  type: MoveActionTypes.FETCH_ONEDAYMOVES_SUCCESS,
  payload: moves,
})

export const fetchOneDayMovesError = (error: string) => ({
  type: MoveActionTypes.FETCH_ONEDAYMOVES_ERROR,
  payload: error,
})
