import axios from "axios"
import { Dispatch } from "react"
import { fetchMoves, fetchMovesError, fetchMovesSuccess } from "../reducers/moveReducer"


export const getAllMoves = () => {
  return async (dispatch: any) => {
    try {
      dispatch(fetchMoves())

      const response = await axios.get(`http://localhost:7000/api/logs/getMoves/`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
        dispatch(fetchMovesSuccess(response.data))
    } catch (e) {
      dispatch(fetchMovesError("Ошибка"))
    }
  }
}

