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
    }
}))

export const MovementsEmpBar: React.FC = () => {
  const classes = useStyles()
  const [selectedItem, SetselectedItem] = useState(0)
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(new Date('2020-08-18T21:11:54'))

  const handleDateChange = (date:any) => {setSelectedDate(date)}

  const state = {
    series: [
      {
        data: [
          {
            x: 'Analysis',
            y: [
              new Date('2019-02-27').getTime(),
              new Date('2019-03-04').getTime()
            ],
            fillColor: '#008FFB'
          },
          {
            x: 'Design',
            y: [
              new Date('2019-03-04').getTime(),
              new Date('2019-03-08').getTime()
            ],
            fillColor: '#00E396'
          },
          {
            x: 'Coding',
            y: [
              new Date('2019-03-07').getTime(),
              new Date('2019-03-10').getTime()
            ],
            fillColor: '#775DD0'
          },
          {
            x: 'Testing',
            y: [
              new Date('2019-03-08').getTime(),
              new Date('2019-03-12').getTime()
            ],
            fillColor: '#FEB019'
          },
          {
            x: 'Deployment',
            y: [
              new Date('2019-03-12').getTime(),
              new Date('2019-03-17').getTime()
            ],
            fillColor: '#FF4560'
          }
        ]
      }
    ],
    options: {
      chart: {
        height: 350,
        type: 'rangeBar'
      },
      plotOptions: {
        bar: {
          horizontal: true,
          distributed: true,
          dataLabels: {
            hideOverflowingLabels: false
          }
        }
      },
      dataLabels: {
        enabled: true,
       
        style: {
          colors: ['#f3f4f5', '#fff']
        }
      },
      xaxis: {
        type: 'datetime'
      },
      yaxis: {
        show: false
      },
      grid: {
        row: {
          colors: ['#f3f4f5', '#fff'],
          opacity: 1
        }
      }
    },
  
  
  };


  return (
    <React.Fragment>
        <div>
        <div className={classes.labelDiv}>
        <Typography variant='h6'>Перемещения сотрудника в указанную дату</Typography>
        <MuiPickersUtilsProvider utils={MomentUtils}>
        <KeyboardDatePicker
        className={classes.datePicker}
          disableToolbar
          variant="inline"
          format="MM/DD/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Выберите дату "
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
         </MuiPickersUtilsProvider>
         </div>
      <Chart
        options={state.options}
        series={state.series}
        type="rangeBar"
        height={"280px"}
      />
</div>

    </React.Fragment>
  )
}
