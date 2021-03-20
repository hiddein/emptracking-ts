import axios from "axios"
import { setUser } from "../reducers/userReducer"

export const login = (login: string, password: string) => {
  return async (dispatch: any) => {
    try {
      const response = await axios.post(
        "http://localhost:7000/api/user/login",
        {
          login,
          password,
        }
      )
      
      dispatch(setUser(response.data.user))
      localStorage.setItem("token", response.data.token)
    } catch (e) {
      alert(e)
    }
  }
}

export const autologin = () => {
  return async (dispatch: any) => {
    try {
      const response = await axios.get(
        "http://localhost:7000/api/user/auth",
        {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}}
      )

      dispatch(setUser(response.data.user))
      localStorage.setItem("token", response.data.token)
    } catch (e) {
      localStorage.removeItem('token')
    }
  }
}
