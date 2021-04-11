import axios from "axios"
import { Dispatch } from "react"

import {
  fetchRooms,
  fetchRoomsSuccess,
  fetchRoomsError,
} from "../reducers/roomReducer"

export const getRooms = () => {
  return async (dispatch: any) => {
    try {
      dispatch(fetchRooms())
      const response = await axios.get("http://localhost:7000/api/room/", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
        dispatch(fetchRoomsSuccess(response.data))
    } catch (e) {
      dispatch(fetchRoomsError("Ошибка"))
    }
  }
}

export const addRoom = (formData: any) => {
  return async (dispatch: any) => {
    try {
      const response = await axios.post(
        "http://localhost:7000/api/room/",formData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
    } catch (e) {
      alert(e)
    }
  }
}

export const addAccess = (formData: any) => {
  return async (dispatch: any) => {
    try {
      const response = await axios.post(
        "http://localhost:7000/api/access/",formData
        ,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
    } catch (e) {
      alert(e)
    }
  }
}

export const depriveAccess = (formData: any) => {
  return async (dispatch: any) => {
    try {
      const response = await axios.post(
        "http://localhost:7000/api/access/delete",formData
        ,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
    } catch (e) {
      alert(e)
    }
  }
}

