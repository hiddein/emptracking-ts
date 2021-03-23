import { UserActionTypes, userAction, userState, userAuth } from "../../types/user"

const initialState: userState = {
  userLogin: "",
  userRole: "",
  isAuth: false,
  loading:false
}

export const userReducer = (
  state = initialState,
  action: userAction
): userState => {
  switch (action.type) {
    case UserActionTypes.SET_USER_START:
      return {
        ...state,
        loading: true,
      }
    
    case UserActionTypes.SET_USER_SUCCESS:
      return {
        ...state,
        userLogin: action.payload.userLogin,
        userRole: action.payload.userRole,
        isAuth: true,
        loading: false,
      }
    case UserActionTypes.LOGOUT:
        localStorage.removeItem('token')
      return {
        ...state,
        userLogin: '',
        userRole: '',
        isAuth: false,
        loading: false,
      }

    default:
      return state
  }
}

export const setUser = (user: userAuth) => ({
  type: UserActionTypes.SET_USER_SUCCESS,
  payload: user,
})

export const setLoading = () => ({
  type: UserActionTypes.SET_USER_START,

})

export const logout = () => ({
    type: UserActionTypes.LOGOUT

  })
  