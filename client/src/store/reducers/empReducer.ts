import { UserActionTypes, EmpAction, EmpState } from '../../types/emp';

const initialState: EmpState = {
    emps:[],
    loading: false,
    error: null
}

export const empReducer = (state = initialState,action:EmpAction):EmpState => {
    switch (action.type) {
        case UserActionTypes.FETCH_EMPS:
            return {...state,loading:true,error:null,emps:[]}

        case UserActionTypes.FETCH_EMPS_SUCCESS:
            return {...state,loading:false,error:null,emps:action.payload}

        case UserActionTypes.FETCH_EMPS_ERROR:
            return {...state,loading:false,error:action.payload,emps:[]}

    
        default:
            return state
    }
}
export const fetchEmps = () => ({
    type: UserActionTypes.FETCH_EMPS,
  })
  
  export const fetchEmpsSuccess = (emps:any) => ({
    type: UserActionTypes.FETCH_EMPS_SUCCESS,
    payload: emps
  
  })
  
  export const fetchEmpsError = (error:string) => ({
      type: UserActionTypes.FETCH_EMPS_ERROR,
      payload: error
  
    })
    