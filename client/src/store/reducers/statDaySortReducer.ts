import { StatDaySortState, StatDaySortAction, StatDaySortActionTypes } from '../../types/stat';

const initialState: StatDaySortState = {
    stat:[],
    loading: false,
    error: null
}

export const statDaySortReducer = (state = initialState,action:StatDaySortAction):StatDaySortState => {
    switch (action.type) {
        case StatDaySortActionTypes.FETCH_STATDAYSORT:
            return {loading:true,error:null,stat:[]}

        case StatDaySortActionTypes.FETCH_STATDAYSORT_SUCCESS:
            return {loading:false,error:null,stat:action.payload}

        case StatDaySortActionTypes.FETCH_STATDAYSORT_ERROR:
            return {loading:false,error:action.payload,stat:[]}

    
        default:
            return state
    }
}
export const fetchStatDaySort = () => ({
    type: StatDaySortActionTypes.FETCH_STATDAYSORT,
  })
  
  export const fetchStatDaySortSuccess = (stat:any) => ({
    type: StatDaySortActionTypes.FETCH_STATDAYSORT_SUCCESS,
    payload: stat
  
  })
  
  export const fetchStatDaySortError = (error:string) => ({
      type: StatDaySortActionTypes.FETCH_STATDAYSORT_ERROR,
      payload: error
  
    })
    