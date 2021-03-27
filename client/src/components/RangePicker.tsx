import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers"
import ruLocale from "date-fns/locale/ru";
import DateFnsUtils from "@date-io/date-fns";
import { useDispatch } from "react-redux"
import { setEndDate, setStartDate } from "../store/reducers/datesReducer"
import { useTypedSelector } from "../hooks/useTypedSelector"
import { ContactsOutlined } from "@material-ui/icons";

const useStyles = makeStyles(() => ({
  datePicker: {
    width: "150px",
    margin: "0 10px",
  },
  datePickerContainer: {
    display: "flex",
  },
}))

export const RangePicker: React.FC = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const startDate = useTypedSelector(state => state.dates.startDate)
  const endDate = useTypedSelector(state => state.dates.endDate)

  const handleDateChangeStart = (date: any) => {
    dispatch(setStartDate(date))
  }

  const handleDateChangeEnd = (date: any) => {
    dispatch(setEndDate(date))
  }

  return (
    <div className={classes.datePickerContainer}>
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
        <KeyboardDatePicker
          className={classes.datePicker}
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline1"
          label="Начальная дата "
          value={startDate}
          onChange={handleDateChangeStart}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />

        <KeyboardDatePicker
          className={classes.datePicker}
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline2"
          label="Конечная дата"
          value={endDate}
          onChange={handleDateChangeEnd}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />
      </MuiPickersUtilsProvider>
    </div>
  )
}
