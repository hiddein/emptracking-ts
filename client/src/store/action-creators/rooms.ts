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
      console.log(response.data)
        dispatch(fetchRoomsSuccess(response.data))
    } catch (e) {
      dispatch(fetchRoomsError("Ошибка"))
    }
  }
}
