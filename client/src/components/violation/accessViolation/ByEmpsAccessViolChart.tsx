import { Card, Grid, makeStyles, Typography } from "@material-ui/core"
import React, { useState } from "react"
import Chart from "react-apexcharts"
import MomentUtils from '@date-io/moment'
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';

const useStyles = makeStyles(() => ({
    labelDiv:{
        display:'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '10px',
        padding: ' 0 20px'
        
 
    },
    datePicker:{
        width: '180px',
        margin: 0
    }
}))

export const ByEmpsAccessViolChart: React.FC = () => {
  const classes = useStyles()
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(new Date('2020-08-18T21:11:54'))

  const handleDateChange = (date:any) => {setSelectedDate(date)}

  const state = {
   
    series: [{
      data: [21, 22, 10, 28, 16, 21, 13, 30]
    }],
    options: {
      chart: {
        height: 350,
        type: 'bar',
        events: {
        
          }
        }
      },
      plotOptions: {
        bar: {
          columnWidth: '45%',
          distributed: true,
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        show: false
      },
      xaxis: {
        categories: [
          ['John', 'Doe'],
          ['Joe', 'Smith'],
          ['Jake', 'Williams'],
          'Amber',
          ['Peter', 'Brown'],
          ['Mary', 'Evans'],
          ['David', 'Wilson'],
          ['Lily', 'Roberts'], 
        ],
        labels: {
          style: {
            fontSize: '12px'
          }
        }
      }
    }

  return (
    <React.Fragment>
        <div>
        <div className={classes.labelDiv}>
        <Typography variant='h6'>Количество нарушений в указанную дату (сотрудники отдела)</Typography>
         </div>
      <Chart
        options={state.options}
        series={state.series}
        type="bar"
        height={"260px"}
      />
</div>

    </React.Fragment>
  )
}
