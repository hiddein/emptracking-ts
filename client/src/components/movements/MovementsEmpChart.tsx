import { Card, Grid, makeStyles, Typography } from "@material-ui/core"
import React, { useState } from "react"
import Chart from "react-apexcharts"
import {} from "apexcharts/dist/locales/ru.json"
import DateFnsUtils from "@date-io/date-fns"
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers"
import { useTypedSelector } from "../../hooks/useTypedSelector"
import moment from "moment"
import { rusLocaleChart } from "../../rusLocale/ruslocale"

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
  noEmpContainer:{
    height:'290px',
    display:'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '25px'
  }
}))

interface propsMovesChart {
  idEmp: string
}

export const MovementsEmpBar: React.FC<propsMovesChart> = (props: propsMovesChart) => {

  const classes = useStyles()

  const endDate = useTypedSelector(state => state.dates.endDate)
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date('2021-03-18'))
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
    date!==null?setSelectedDate(date):setSelectedDate(new Date('0000-00-00'))
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
        locales: [rusLocaleChart],
        defaultLocale: "RU"
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
          return `${duration.hours()}:${duration.minutes() < 10? `0${duration.minutes()}`: duration.minutes() }`
        },
        style: {
          colors: ["#f3f4f5", "#fff"],
        },
      },
      tooltip:{
        x: {
          show: true,
          format: 'HH:mm',
          formatter: undefined,
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
        moment(move.time_enter).utcOffset(0, true).toDate().getTime(),
        moment(move.time_leave).utcOffset(0, true).toDate().getTime(),
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
              invalidDateMessage={'Неверный формат даты'}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>
        </div>
        {props.idEmp==''? <div className={classes.noEmpContainer}> <Typography variant="h4">
            Выберите сотрудника
          </Typography></div>:<Chart
          options={chartState.options}
          series={chartState.series}
          type="rangeBar"
          height={"280px"}
        />}
        
      </div>
    </React.Fragment>
  )
}
