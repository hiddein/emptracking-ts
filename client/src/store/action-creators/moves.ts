import axios from "axios"
import { fetchMoves, fetchMovesError, fetchMovesSuccess, fetchOneDayMoves, fetchOneDayMovesError, fetchOneDayMovesSuccess } from "../reducers/moveReducer"


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

export const getMovesInRange = (start:Date, end:Date) => {
  return async (dispatch: any) => {
    try {
      dispatch(fetchMoves())

      const response = await axios.get(`http://localhost:7000/api/logs/getMovesInRange?startDate=${start.toLocaleDateString()}&endDate=${end.toLocaleDateString()}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
        dispatch(fetchMovesSuccess(response.data))
    } catch (e) {
      dispatch(fetchMovesError("Ошибка"))
    }
  }
}

export const getOneDayMoves = (date:Date) => {
  return async (dispatch: any) => {
    try {
      dispatch(fetchOneDayMoves())

      const response = await axios.get(`http://localhost:7000/api/logs/getMovesInRange?startDate=${date.toLocaleDateString()}&endDate=${date.toLocaleDateString()}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
        dispatch(fetchOneDayMovesSuccess(response.data))
    } catch (e) {
      dispatch(fetchOneDayMovesError("Ошибка"))
    }
  }
}

