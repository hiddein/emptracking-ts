import axios from "axios"
import { fetchAccessViol, fetchAccessViolByEmp, fetchAccessViolByEmpError, fetchAccessViolByEmpSuccess, fetchAccessViolError, fetchAccessViolSuccess, fetchAccessViolByEmpDays, fetchAccessViolByEmpDaysError, fetchAccessViolByEmpDaysSuccess,} from "../reducers/accessViolReducer"



export const getAccessViols = (start:Date, end:Date):any => {
    return async (dispatch: any) => {
      try {
        dispatch(fetchAccessViol())
        const response = await axios.get(`http://localhost:7000/api/viol/access?startDate=${start.toLocaleDateString()}&endDate=${end.toLocaleDateString()}&sort=default`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })  
        dispatch(fetchAccessViolSuccess(response.data))
        
      } catch (e) {
        dispatch(fetchAccessViolError("Ошибка"))
      }
    }
  }

  export const getAccessViolsByEmp = (start:Date, end:Date):any => {
    return async (dispatch: any) => {
      try {
       dispatch(fetchAccessViolByEmp())
        const response = await axios.get(`http://localhost:7000/api/viol/access?startDate=${start.toLocaleDateString()}&endDate=${end.toLocaleDateString()}&sort=byEmp`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })  
        dispatch(fetchAccessViolByEmpSuccess(response.data))
        
      } catch (e) {
        dispatch(fetchAccessViolByEmpError("Ошибка"))
      }
    }
  }

  export const getAccessViolsByEmpDays = (start:Date, end:Date):any => {
    return async (dispatch: any) => {
      try {
       dispatch(fetchAccessViolByEmpDays())
        const response = await axios.get(`http://localhost:7000/api/viol/access?startDate=${start.toLocaleDateString()}&endDate=${end.toLocaleDateString()}&sort=byEmpDays`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })  
        dispatch(fetchAccessViolByEmpDaysSuccess(response.data))
        
      } catch (e) {
        dispatch(fetchAccessViolByEmpDaysError("Ошибка"))
      }
    }
  }

