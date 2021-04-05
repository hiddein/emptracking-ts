import { Card, Grid, makeStyles, Typography } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import Chart from "react-apexcharts"

import { useTypedSelector } from "../../hooks/useTypedSelector"
import { useDispatch } from "react-redux"
import { getLateness } from "../../store/action-creators/lateness"
import _ from "lodash"
import { Loader } from "../Loader"

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
  const lateness = useTypedSelector((state) => state.lateness.lateness)
  const isLoading = useTypedSelector((state) => state.lateness.loading)
  const dispatch = useDispatch()
  const startDate = useTypedSelector(state => state.dates.startDate)
  const endDate = useTypedSelector(state => state.dates.endDate)

  useEffect(() => {
    dispatch(getLateness(startDate, endDate))
   }, [startDate, endDate])

   interface chartStateInterface {
    series: any
    options: any
  }

  const chartState:chartStateInterface  = {
    
    series: [],
            options: {
              chart: {
                width: 380,
                type: 'polarArea'
              },
              labels: [],
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
    
  const latenessSorted = _.countBy(lateness, 'name_dep')
  var resultlatenessSortedSorted = Object.keys(latenessSorted).map(function (id) {
    return {name_dep: id, count_viols: latenessSorted[id]}
  })
  resultlatenessSortedSorted.map((item: any) => {
    chartState.options.labels.push(item.name_dep)
    chartState.series.push(item.count_viols)
  })
  

  return (
    <div>
      <div className={classes.labelDiv}>
        <Typography variant="h6">
          Статистика опозданий
        </Typography>
      </div>
      {isLoading ? (
          <Loader size={60} height="290px" />
        ) : (
      <Chart
        options={chartState.options}
        series={chartState.series}
        type="donut"
        height={"300px"}
      />)}
    </div>
  )
}