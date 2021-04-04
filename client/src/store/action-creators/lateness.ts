import axios from "axios"
import { fetchLateness, fetchLatenessSuccess, fetchLatenessError, fetchLatenessByEmp, fetchLatenessByEmpSuccess, fetchLatenessByEmpError} from "../reducers/latenessReducer"



export const getLateness = (start:Date, end:Date):any => {
    return async (dispatch: any) => {
      try {
        dispatch(fetchLateness())
        const response = await axios.get(`http://localhost:7000/api/viol/lateness?startDate=${start.toLocaleDateString()}&endDate=${end.toLocaleDateString()}&sort=default`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })  
        dispatch(fetchLatenessSuccess(response.data))
        
      } catch (e) {
        dispatch(fetchLatenessError("Ошибка"))
      }
    }
  }

  export const getLatenessByEmp = (start:Date, end:Date):any => {
    return async (dispatch: any) => {
      try {
        dispatch(fetchLatenessByEmp())
        const response = await axios.get(`http://localhost:7000/api/viol/lateness?startDate=${start.toLocaleDateString()}&endDate=${end.toLocaleDateString()}&sort=byEmp`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })  
        dispatch(fetchLatenessByEmpSuccess(response.data))
        
      } catch (e) {
        dispatch(fetchLatenessByEmpError("Ошибка"))
      }
    }
  }
