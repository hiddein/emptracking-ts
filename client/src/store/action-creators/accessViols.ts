import axios from "axios"
import { fetchAccessViol, fetchAccessViolError, fetchAccessViolSuccess} from "../reducers/accessViolReducer"



export const getAccessViols = (start:Date, end:Date):any => {
    return async (dispatch: any) => {
      try {
        dispatch(fetchAccessViol())
        const response = await axios.get(`http://localhost:7000/api/viol/access?startDate=${start.toLocaleDateString()}&endDate=${end.toLocaleDateString()}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        dispatch(fetchAccessViolError(response.data))
      } catch (e) {
        dispatch(fetchAccessViolSuccess("Ошибка"))
      }
    }
  }

