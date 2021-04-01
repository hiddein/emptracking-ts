import { StatByDepState, StatByDepAction, StatByDepActionTypes } from '../../types/stat';

const initialState: StatByDepState = {
    stat:[],
    loading: false,
    error: null
}

export const statByDepReducer = (state = initialState,action:StatByDepAction):StatByDepState => {
    switch (action.type) {
        case StatByDepActionTypes.FETCH_STATBYDEP:
            return {loading:true,error:null,stat:[]}

        case StatByDepActionTypes.FETCH_STATBYDEP_SUCCESS:
            return {loading:false,error:null,stat:action.payload}

        case StatByDepActionTypes.FETCH_STATBYDEP_ERROR:
            return {loading:false,error:action.payload,stat:[]}

    
        default:
            return state
    }
}
export const fetchStatByDep = () => ({
    type: StatByDepActionTypes.FETCH_STATBYDEP,
  })
  
  export const fetchStatByDepSuccess = (stat:any) => ({
    type: StatByDepActionTypes.FETCH_STATBYDEP_SUCCESS,
    payload: stat
  
  })
  
  export const fetchStatByDepError = (error:string) => ({
      type: StatByDepActionTypes.FETCH_STATBYDEP_ERROR,
      payload: error
  
    })
    