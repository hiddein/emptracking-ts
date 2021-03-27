import { DatesAction, DatesActionTypes, DatesState } from "../../types/dates"

const dateMonthBefore = new Date()
dateMonthBefore.setMonth(dateMonthBefore.getMonth() - 1)

const initialState: DatesState = {
  startDate: dateMonthBefore,
  endDate: new Date(),
}

export const datesReducer = (
  state = initialState,
  action: DatesAction
): DatesState => {
  switch (action.type) {
    case DatesActionTypes.SET_STARTDATE:
      return { ...state, startDate: action.payload }

    case DatesActionTypes.SET_ENDDATE:
      return { ...state, endDate: action.payload }

    default:
      return state
  }
}
export const setStartDate = (start: string) => ({
  type: DatesActionTypes.SET_STARTDATE,
  payload: start,
})

export const setEndDate = (end: string) => ({
  type: DatesActionTypes.SET_ENDDATE,
  payload: end,
})
