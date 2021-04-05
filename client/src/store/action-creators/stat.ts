import axios from "axios"
import { fetchStat, fetchStatError, fetchStatSuccess, fetchStatByDep, fetchStatByDepError, fetchStatByDepSuccess, fetchStatDaySort, fetchStatDaySortError, fetchStatDaySortSuccess, fetchStatByDefault, fetchStatByDefaultSuccess, fetchStatByDefaultError } from "../reducers/statReducer"

export const getCountMovesInRangeByDefault = (start:Date, end:Date):any => {
  return async (dispatch: any) => {
    try {
      dispatch(fetchStatByDefault())
      const response = await axios.get(`http://localhost:7000/api/logs/getCountMovesInRange?startDate=${start.toLocaleDateString()}&endDate=${end.toLocaleDateString()}&sort=default`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      dispatch(fetchStatByDefaultSuccess(response.data))
    } catch (e) {
      dispatch(fetchStatByDefaultError("Ошибка"))
    }
  }
}

export const getCountMovesInRange = (start:Date, end:Date):any => {
    return async (dispatch: any) => {
      try {
        dispatch(fetchStat())
        const response = await axios.get(`http://localhost:7000/api/logs/getCountMovesInRange?startDate=${start.toLocaleDateString()}&endDate=${end.toLocaleDateString()}&sort=room`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })

        dispatch(fetchStatSuccess(response.data))
      } catch (e) {
        dispatch(fetchStatError("Ошибка"))
      }
    }
  }

  export const getCountMovesInRangeDaySort = (start:Date, end:Date):any => {
    return async (dispatch: any) => {
      try {
        dispatch(fetchStatDaySort())
        const response = await axios.get(`http://localhost:7000/api/logs/getCountMovesInRange?startDate=${start.toLocaleDateString()}&endDate=${end.toLocaleDateString()}&sort=dayRoom`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        
        dispatch(fetchStatDaySortSuccess(response.data))
      } catch (e) {
        dispatch(fetchStatDaySortError("Ошибка"))
      }
    }
  }

  export const getCountMovesInRangeDepSort = (start:Date, end:Date):any => {
    return async (dispatch: any) => {
      try {
        dispatch(fetchStatByDep())
        const response = await axios.get(`http://localhost:7000/api/logs/getCountMovesInRange?startDate=${start.toLocaleDateString()}&endDate=${end.toLocaleDateString()}&sort=dayRoomDep`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        dispatch(fetchStatByDepSuccess(response.data))
      } catch (e) {
        dispatch(fetchStatByDepError("Ошибка"))
      }
    }
  }
