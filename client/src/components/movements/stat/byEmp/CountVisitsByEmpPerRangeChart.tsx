import { Card, Grid, makeStyles, Typography } from "@material-ui/core"
import React, { useState } from "react"
import Chart from "react-apexcharts"
import MomentUtils from "@date-io/moment"
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers"

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

export const CountVisitsByEmpPerRangeChart: React.FC = () => {
  const classes = useStyles()
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date("2020-08-18T21:11:54")
  )

  const handleDateChange = (date: any) => {
    setSelectedDate(date)
  }

  const state = {
    
    series: [{
        name: "Desktops",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
    }],
    options: {
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
      title: {
        text: 'Product Trends by Month',
        align: 'left'
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5
        },
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
      }
    }
   
    }
  

  return (
    <div>
      <div className={classes.labelDiv}>
        <Typography variant="h6">
          Количество посещений выбранного помещения
        </Typography>
      </div>
      <Chart
        options={state.options}
        series={state.series}
        type="line"
        height={"268px"}
      />
    </div>
  )
}
