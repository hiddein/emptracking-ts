import { UserActionTypes, EmpAction, EmpState } from "../../types/emp"

const initialState: EmpState = {
  emps: [],
  loading: false,
  error: null,
  access: [],
  accessLoading: false,
  accessError: null,
  deps: [],
  depsLoading: false,
  depsError: null,
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
      

      case UserActionTypes.FETCH_DEPS:
        return { ...state, depsLoading: true, depsError: null, deps: [] }
  
      case UserActionTypes.FETCH_DEPS_SUCCESS:
        return { ...state, depsLoading: false, depsError: null, deps: action.payload }
  
      case UserActionTypes.FETCH_DEPS_ERROR:
        return { ...state, depsLoading: false, depsError: action.payload, deps: [] }
  
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
  
  export const fetchDeps = () => ({
    type: UserActionTypes.FETCH_DEPS,
  })
  
  export const fetchDepsSuccess = (deps: any) => ({
    type: UserActionTypes.FETCH_DEPS_SUCCESS,
    payload: deps,
  })
  
  export const fetchDepsError = (error: string) => ({
    type: UserActionTypes.FETCH_DEPS_ERROR,
    payload: error,
  })
  