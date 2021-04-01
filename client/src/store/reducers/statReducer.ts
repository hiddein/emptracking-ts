import { StatState, StatAction, StatActionTypes } from '../../types/stat';

const initialState: StatState = {
    stat:[],
    loading: false,
    error: null
}

export const statReducer = (state = initialState,action:StatAction):StatState => {
    switch (action.type) {
        case StatActionTypes.FETCH_STAT:
            return {loading:true,error:null,stat:[]}

        case StatActionTypes.FETCH_STAT_SUCCESS:
            return {loading:false,error:null,stat:action.payload}

        case StatActionTypes.FETCH_STAT_ERROR:
            return {loading:false,error:action.payload,stat:[]}

    
        default:
            return state
    }
}
export const fetchStat = () => ({
    type: StatActionTypes.FETCH_STAT,
  })
  
  export const fetchStatSuccess = (stat:any) => ({
    type: StatActionTypes.FETCH_STAT_SUCCESS,
    payload: stat
  
  })
  
  export const fetchStatError = (error:string) => ({
      type: StatActionTypes.FETCH_STAT_ERROR,
      payload: error
  
    })
    