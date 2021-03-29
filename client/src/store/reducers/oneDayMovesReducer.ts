import { OneDayMoveState, OneDayMoveAction, OneDayMoveActionTypes } from '../../types/oneDayMove';

const initialState: OneDayMoveState = {
    moves:[],
    loading: false,
    error: null
}

export const oneDayMovesReducer = (state = initialState,action:OneDayMoveAction):OneDayMoveState => {
    switch (action.type) {
        case OneDayMoveActionTypes.FETCH_ONEDAYMOVES:
            return {loading:true,error:null,moves:[]}

        case OneDayMoveActionTypes.FETCH_ONEDAYMOVES_SUCCESS:
            return {loading:false,error:null,moves:action.payload}

        case OneDayMoveActionTypes.FETCH_ONEDAYMOVES_ERROR:
            return {loading:false,error:action.payload,moves:[]}

    
        default:
            return state
    }
}
export const fetchOneDayMoves = () => ({
    type: OneDayMoveActionTypes.FETCH_ONEDAYMOVES,
  })
  
  export const fetchOneDayMovesSuccess = (moves:any) => ({
    type: OneDayMoveActionTypes.FETCH_ONEDAYMOVES_SUCCESS,
    payload: moves
  
  })
  
  export const fetchOneDayMovesError = (error:string) => ({
      type: OneDayMoveActionTypes.FETCH_ONEDAYMOVES_ERROR,
      payload: error
  
    })
    