import { UserActionTypes, userAction, userState, userAuth } from "../../types/user"

const initialState: userState = {
  userLogin: "",
  userRole: "",
  isAuth: false,
}

export const userReducer = (
  state = initialState,
  action: userAction
): userState => {
  switch (action.type) {
    case UserActionTypes.SET_USER:
      return {
        ...state,
        userLogin: action.payload.userLogin,
        userRole: action.payload.userRole,
        isAuth: true,
      }
    case UserActionTypes.LOGOUT:
        localStorage.removeItem('token')
      return {
        ...state,
        userLogin: '',
        userRole: '',
        isAuth: false,
      }

    default:
      return state
  }
}

export const setUser = (user: userAuth) => ({
  type: UserActionTypes.SET_USER,
  payload: user,
})

export const logout = () => ({
    type: UserActionTypes.LOGOUT

  })
  