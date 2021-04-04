import { UserActionTypes, EmpAction, EmpState } from "../../types/emp"

const initialState: EmpState = {
  emps: [],
  loading: false,
  error: null,
  access: [],
  accessLoading: false,
  accessError: null,
}

export const empReducer = ( state = initialState,action: EmpAction): EmpState => {
  switch (action.type) {
    case UserActionTypes.FETCH_EMPS:
      return { ...state, loading: true, error: null, emps: [] }

    case UserActionTypes.FETCH_EMPS_SUCCESS:
      return { ...state, loading: false, error: null, emps: action.payload }

    case UserActionTypes.FETCH_EMPS_ERROR:
      return { ...state, loading: false, error: action.payload, emps: [] }

    case UserActionTypes.FETCH_ACCESS:
      return { ...state, accessLoading: true, accessError: null, access: [] }

    case UserActionTypes.FETCH_ACCESS_SUCCESS:
      return { ...state, accessLoading: false, accessError: null, access: action.payload }

    case UserActionTypes.FETCH_ACCESS_ERROR:
      return { ...state, accessLoading: false, accessError: action.payload, access: [] }

    default:
      return state
  }
}
export const fetchEmps = () => ({
  type: UserActionTypes.FETCH_EMPS,
})

export const fetchEmpsSuccess = (emps: any) => ({
  type: UserActionTypes.FETCH_EMPS_SUCCESS,
  payload: emps,
})

export const fetchEmpsError = (error: string) => ({
  type: UserActionTypes.FETCH_EMPS_ERROR,
  payload: error,
})

export const fetchAccess = () => ({
    type: UserActionTypes.FETCH_ACCESS,
  })
  
  export const fetchAccessSuccess = (access: any) => ({
    type: UserActionTypes.FETCH_ACCESS_SUCCESS,
    payload: access,
  })
  
  export const fetchAccessError = (error: string) => ({
    type: UserActionTypes.FETCH_ACCESS_ERROR,
    payload: error,
  })
  