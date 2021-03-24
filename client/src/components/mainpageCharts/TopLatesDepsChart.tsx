import { Card, Grid, makeStyles, Typography } from "@material-ui/core"
import React, { useState } from "react"
import Chart from "react-apexcharts"
import MomentUtils from "@date-io/moment"

const useStyles = makeStyles(() => ({
  labelDiv: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "10px",
    padding: " 0 20px",

  },
  datePicker: {
    width: "180px",
    margin: 0,
  },
}))

export const TopLatesDepsChart: React.FC = () => {
  const classes = useStyles()


  const state = {
    
    series: [42, 47, 52, 58, 65],
            options: {
              chart: {
                width: 380,
                type: 'polarArea'
              },
              labels: ['Rose A', 'Rose B', 'Rose C', 'Rose D', 'Rose E'],
              fill: {
                opacity: 1
              },
              stroke: {
                width: 1,
                colors: undefined
              },
              yaxis: {
                show: false
              },
              legend: {
                position: 'bottom'
              },
              plotOptions: {
                polarArea: {
                  rings: {
                    strokeWidth: 0
                  },
                  spokes: {
                    strokeWidth: 0
                  },
                }
              },
              theme: {
                monochrome: {
                  enabled: true,
                  shadeTo: 'light',
                  shadeIntensity: 0.6
                }
              }
            },
          
   
    }
  

  return (
    <div>
      <div className={classes.labelDiv}>
        <Typography variant="h6">
          Статистика опозданий
        </Typography>
      </div>
      <Chart
        options={state.options}
        series={state.series}
        type="donut"
        height={"300px"}
      />
    </div>
  )
}
