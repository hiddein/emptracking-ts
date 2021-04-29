import axios from "axios"
import { Dispatch } from "react"

import {
  fetchRooms,
  fetchRoomsSuccess,
  fetchRoomsError,
  fetchOwns,
  fetchOwnsSuccess,
  fetchOwnsError,
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


export const getOwns = () => {
  return async (dispatch: any) => {
    try {
      dispatch(fetchOwns())
      const response = await axios.get("http://localhost:7000/api/room/owns", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
        dispatch(fetchOwnsSuccess(response.data))
    } catch (e) {
      dispatch(fetchOwnsError("Ошибка"))
    }
  }
}

export const addRoom = (nameRoom: any, aboutRoom:any, commRooms:any,depsOwnRoom: any) => {
  return async (dispatch: any) => {
    try {

      const response = await axios.post(
        "http://localhost:7000/api/room/",{nameRoom, aboutRoom, commRooms, depsOwnRoom},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
    } catch (e) {
      alert(e)
    }
  }
}

export const editRoom = (nameRoom: any, aboutRoom:any, commRooms:any,depsOwnRoom: any) => {
  return async (dispatch: any) => {
    try {

      const response = await axios.post(
        "http://localhost:7000/api/room/edit",{nameRoom, aboutRoom, commRooms, depsOwnRoom},
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

