import { Card, Grid, makeStyles, Typography } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import Chart from "react-apexcharts"
import {} from "apexcharts/dist/locales/ru.json"
import DateFnsUtils from "@date-io/date-fns"
import ruLocale from "date-fns/locale/ru"
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers"
import { useTypedSelector } from "../../hooks/useTypedSelector"
import moment from "moment"
import { rusLocaleChart } from "../../rusLocale/ruslocale"
import { getOneDayMoves } from "../../store/action-creators/moves"
import { useDispatch } from "react-redux"
import { Loader } from "../Loader"

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
  setOneDayMovesExp: Function
}

interface IExpObg {
  idEmp: any
  day: any
  moves: any
}

export const MovementsEmpBar: React.FC<propsMovesChart> = (props: propsMovesChart) => {

  const classes = useStyles()
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date('2021-03-18'))
  const oneDayMoves = useTypedSelector((state) => state.move.oneDayMoves)
  const isLoading = useTypedSelector((state) => state.move.oneDayLoading)
  const dispatch = useDispatch()
  const oneDayMovesExp:IExpObg = {
    idEmp: props.idEmp,
    day: selectedDate.toLocaleDateString(),
    moves:[]
  }
  const movesFiltered = oneDayMoves.filter(
    (move) => move.id_emp == props.idEmp
  )
  const handleDateChange = (date: any) => {
    date!==null?setSelectedDate(date):setSelectedDate(new Date('0000-00-00'))
  }

  useEffect(() => {
    dispatch(getOneDayMoves(selectedDate))
    props.setOneDayMovesExp(oneDayMovesExp)
   }, [selectedDate,props.idEmp])
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

    oneDayMovesExp.moves.push({
      nameRoom: move.name_room,
      timeEnterLeave: [
        move.time_enter,
        move.time_leave
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
          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
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
          </Typography></div>:  isLoading ? (
        <Loader size={60} height="290px"/>
      ) : (<Chart
          options={chartState.options}
          series={chartState.series}
          type="rangeBar"
          height="280px"
        />)}
        
      </div>
    </React.Fragment>
  )
}
