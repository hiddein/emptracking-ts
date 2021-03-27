import { Card, Grid, makeStyles, Typography } from "@material-ui/core"
import React, { useState } from "react"
import Chart from "react-apexcharts"
import DateFnsUtils from "@date-io/date-fns"
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers"
import { useTypedSelector } from "../../hooks/useTypedSelector"
import moment from "moment"

const useStyles = makeStyles(() => ({
  labelDiv: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "10px",
    padding: " 0 20px",
  },
  datePicker: {
    width: "180px",
    margin: 0,
  },
}))

interface propsMovesChart {
  startDate: Date
  idEmp: string
}

export const MovementsEmpBar: React.FC<propsMovesChart> = (
  props: propsMovesChart
) => {
  const classes = useStyles()
  const [selectedDate, setSelectedDate] = React.useState<Date>(props.startDate)
  const moves = useTypedSelector((state) => state.move.moves)
  const newDate =
    selectedDate.getFullYear() +
    "-" +
    (selectedDate.getMonth() < 9
      ? `0${selectedDate.getMonth() + 1}`
      : selectedDate.getMonth() + 1) +
    "-" +
    (selectedDate.getDate() < 10
      ? `0${selectedDate.getDate()}`
      : selectedDate.getDate())
  const movesFiltered = moves.filter(
    (move) => move.time_enter.startsWith(newDate) && move.id_emp == props.idEmp
  )
  const handleDateChange = (date: any) => {
    setSelectedDate(date)
  }

  interface chartStateInterface {
    series: any
    options: any
  }
  const chartState: chartStateInterface = {
    series: [{ data: [] }],
    options: {
      chart: {
        height: 350,
        type: "rangeBar",
      },
      plotOptions: {
        bar: {
          horizontal: true,
          distributed: true,
          dataLabels: {
            hideOverflowingLabels: false,
          },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val: any, opts: any) {
          const a = moment(val[0])
          const b = moment(val[1])
          const diff = b.diff(a)
          const duration = moment.duration(diff)
          console.log(duration)
          return `${duration.hours()}:${duration.minutes()}`
        },
        style: {
          colors: ["#f3f4f5", "#fff"],
        },
      },
      xaxis: {
        type: "datetime",
      },
      yaxis: {
        show: true,
      },
      grid: {
        row: {
          colors: ["#f3f4f5", "#fff"],
          opacity: 1,
        },
      },
    },
  }

  movesFiltered.map((move: any) => {
    chartState.series[0].data.push({
      x: move.name_room,
      y: [
        new Date(move.time_enter).getTime(),
        new Date(move.time_leave).getTime(),
      ],
    })
  })

  return (
    <React.Fragment>
      <div>
        <div className={classes.labelDiv}>
          <Typography variant="h6">
            Перемещения сотрудника в указанную дату
          </Typography>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              className={classes.datePicker}
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Выберите дату "
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>
        </div>
        <Chart
          options={chartState.options}
          series={chartState.series}
          type="rangeBar"
          height={"280px"}
        />
      </div>
    </React.Fragment>
  )
}
