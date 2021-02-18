import { UserActionTypes, EmpAction, EmpState } from '../../types/emp';

const initialState: EmpState = {
    emps:[],
    loading: false,
    error: null
}

export const empReducer = (state = initialState,action:EmpAction):EmpState => {
    switch (action.type) {
        case UserActionTypes.FETCH_EMPS:
            return {loading:true,error:null,emps:[]}

        case UserActionTypes.FETCH_EMPS_SUCCESS:
            return {loading:false,error:null,emps:action.payload}

        case UserActionTypes.FETCH_EMPS_ERROR:
            return {loading:false,error:action.payload,emps:[]}

    
        default:
            return state
    }
}