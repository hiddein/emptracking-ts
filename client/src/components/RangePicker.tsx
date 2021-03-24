import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import { blue } from "@material-ui/core/colors"

import { BottomNavigation, Card, Container } from "@material-ui/core"
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers"
import MomentUtils from "@date-io/moment"

const useStyles = makeStyles(() => ({
  datePicker:{
    width: '150px',
    margin: '0 10px',
    
    
},
datePickerContainer:{
  display:'flex'
}
}))

export const RangePicker: React.FC = () => {
  const classes = useStyles()
  const [selectedDateStart, setSelectedDateStart] = React.useState<Date | null>(new Date('2020-08-18T21:11:54'))
  const handleDateChangeStart = (date:any) => {setSelectedDateStart(date)}

  const [selectedDateEnd, setSelectedDateEnd] = React.useState<Date | null>(new Date('2020-08-18T21:11:54'))
  const handleDateChangeEnd = (date:any) => {setSelectedDateEnd(date)}

  return (
    <div className={classes.datePickerContainer}>
    <MuiPickersUtilsProvider utils={MomentUtils}>
    <KeyboardDatePicker
    className={classes.datePicker}
      disableToolbar
      variant="inline"
      format="MM/DD/yyyy"
      margin="normal"
      id="date-picker-inline"
      label="Начальная дата "
      value={selectedDateStart}
      onChange={handleDateChangeStart}
      KeyboardButtonProps={{
        'aria-label': 'change date',
      }}
    />

<KeyboardDatePicker
    className={classes.datePicker}
      disableToolbar
      variant="inline"
      format="MM/DD/yyyy"
      margin="normal"
      id="date-picker-inline"
      label="Конечная дата"
      value={selectedDateEnd}
      onChange={handleDateChangeEnd}
      KeyboardButtonProps={{
        'aria-label': 'change date',
      }}
    />
     </MuiPickersUtilsProvider>
     </div>
  )
}
