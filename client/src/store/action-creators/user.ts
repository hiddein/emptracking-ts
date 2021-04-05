import axios from "axios"
import { logout, setLoading, setUser } from "../reducers/userReducer"

export const registration = (login: string, password: string, role: string) => {
  return async (dispatch: any) => {
    try {
      const response = await axios.post(
        "http://localhost:7000/api/user/registration",
        {
          login,
          password,
          role,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      alert(response.data.message)
    } catch (e) {
      alert(e.response.data.message)
    }
  }
}

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
      localStorage.setItem("token", response.data.token)
      dispatch(setUser(response.data.user))
      
    } catch (e) {
      alert(e)
    }
  }
}

export const autologin = () => {
  return async (dispatch: any) => {
    dispatch(setLoading())
    try {
      const response = await axios.get("http://localhost:7000/api/user/auth", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })

      dispatch(setUser(response.data.user))
      localStorage.setItem("token", response.data.token)
    } catch (e) {
      dispatch(logout())
    }
  }
}
