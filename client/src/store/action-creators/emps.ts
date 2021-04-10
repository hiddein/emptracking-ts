import axios from "axios"
import _ from "lodash"
import { isEmpty } from "lodash"
import {
  fetchEmps,
  fetchEmpsSuccess,
  fetchEmpsError,
  fetchAccess,
  fetchAccessError,
  fetchAccessSuccess,
  fetchDeps,
  fetchDepsSuccess,
  fetchDepsError,
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

export const getDeps = () => {
  return async (dispatch: any) => {
    try {
      dispatch(fetchDeps())
      const response = await axios.get("http://localhost:7000/api/deps", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
        dispatch(fetchDepsSuccess(response.data))
    } catch (e) {
      dispatch(fetchDepsError("Ошибка"))
    }
  }
}

export const addEmp = (formData: any) => {
  return async (dispatch: any) => {
    try {
      const response = await axios.post(
        "http://localhost:7000/api/emps/",formData
        ,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      alert("OK")
    } catch (e) {
      alert(e)
    }
  }
}

export const editEmp = (formData: any,idEmp:string) => {
  return async (dispatch: any) => {
    try {

      const response = await axios.post(
        `http://localhost:7000/api/emps/edit/${idEmp}`,formData
        ,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      alert("OK")
    } catch (e) {
      alert(e)
    }
  }
}

