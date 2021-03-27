import { MoveState, MoveAction, MoveActionTypes } from '../../types/move';

const initialState: MoveState = {
    moves:[],
    loading: false,
    error: null
}

export const moveReducer = (state = initialState,action:MoveAction):MoveState => {
    switch (action.type) {
        case MoveActionTypes.FETCH_MOVES:
            return {loading:true,error:null,moves:[]}

        case MoveActionTypes.FETCH_MOVES_SUCCESS:
            return {loading:false,error:null,moves:action.payload}

        case MoveActionTypes.FETCH_MOVES_ERROR:
            return {loading:false,error:action.payload,moves:[]}

    
        default:
            return state
    }
}
export const fetchMoves = () => ({
    type: MoveActionTypes.FETCH_MOVES,
  })
  
  export const fetchMovesSuccess = (moves:any) => ({
    type: MoveActionTypes.FETCH_MOVES_SUCCESS,
    payload: moves
  
  })
  
  export const fetchMovesError = (error:string) => ({
      type: MoveActionTypes.FETCH_MOVES_ERROR,
      payload: error
  
    })
    