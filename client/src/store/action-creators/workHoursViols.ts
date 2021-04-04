import axios from "axios"
import { fetchWorkHoursViol, fetchWorkHoursViolSuccess, fetchWorkHoursViolError, fetchWorkHoursViolByEmp, fetchWorkHoursViolByEmpSuccess, fetchWorkHoursViolByEmpError} from "../reducers/workHoursViolReducer"



export const getWorkHoursViols = (start:Date, end:Date):any => {
    return async (dispatch: any) => {
      try {
        dispatch(fetchWorkHoursViol())
        const response = await axios.get(`http://localhost:7000/api/viol/workhours?startDate=${start.toLocaleDateString()}&endDate=${end.toLocaleDateString()}&sort=default`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })  
        dispatch(fetchWorkHoursViolSuccess(response.data))
        
      } catch (e) {
        dispatch(fetchWorkHoursViolError("Ошибка"))
      }
    }
  }
