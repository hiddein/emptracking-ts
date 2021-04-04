import axios from "axios"
import { Dispatch } from "react"
import { EmpAction } from "../../types/emp"
import {
  fetchEmps,
  fetchEmpsSuccess,
  fetchEmpsError,
  fetchAccess,
  fetchAccessError,
  fetchAccessSuccess,
} from "../reducers/empReducer"

export const getEmps = () => {
  return async (dispatch: any) => {
    try {
      dispatch(fetchEmps())
      const response = await axios.get("http://localhost:7000/api/emps/", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
        dispatch(fetchEmpsSuccess(response.data))
    } catch (e) {
      dispatch(fetchEmpsError("Ошибка"))
    }
  }
}

export const getAccess = () => {
  return async (dispatch: any) => {
    try {
      dispatch(fetchAccess())
      const response = await axios.get("http://localhost:7000/api/access/getAccess", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
        dispatch(fetchAccessSuccess(response.data))
    } catch (e) {
      dispatch(fetchAccessError("Ошибка"))
    }
  }
}
