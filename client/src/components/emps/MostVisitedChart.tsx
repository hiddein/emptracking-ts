import { Card, Grid, makeStyles, Typography } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import Chart from "react-apexcharts"
import { useTypedSelector } from "../../hooks/useTypedSelector"
import { useDispatch } from "react-redux"
import { getCountMovesInRange } from "../../store/action-creators/stat"
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
  noEmpContainer: {
    height: "290px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "25px",
  },
}))

interface propsStatChart {
  idEmp: string
  setExportJSON: Function
}
interface IExpObg {
  data: any
}

export const MostVisitedChart: React.FC<propsStatChart> = (props: propsStatChart) => {
  const classes = useStyles()
  const stat = useTypedSelector((state) => state.stat.stat)
  const isLoading = useTypedSelector((state) => state.stat.loading)
  const startDate = useTypedSelector((state) => state.dates.startDate)
  const endDate = useTypedSelector((state) => state.dates.endDate)
  const dispatch = useDispatch()
  const statFiltered = stat.filter((item) => item.id_emp == props.idEmp)
  const dataExp:IExpObg = {
    data:[]
  }


  useEffect(() => {
    dispatch(getCountMovesInRange(startDate, endDate))
    props.setExportJSON(dataExp)

   }, [startDate, endDate,props.idEmp])


   interface chartStateInterface {
    series: any
    options: any
  }
  const chartState: chartStateInterface = {
    
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
    const statSorted = _.sortBy(statFiltered, 'count_visits')
    const statSortedFiltered = statSorted.reverse().filter((item) => statSorted.indexOf(item)<5)

    statSortedFiltered.map((item: any) => {
      chartState.options.labels.push(item.name_room)
      chartState.series.push(item.count_visits)

      dataExp.data.push({
        nameRoom: item.name_room,
        countVisits: item.count_visits
      })
    })
  
  return (
    <div>
      <div className={classes.labelDiv}>
        <Typography variant="h6">
          Самые посещаемые помещения
        </Typography>
      </div>
      {props.idEmp == "" ? (
          <div className={classes.noEmpContainer}>
            <Typography variant="h4">Выберите сотрудника</Typography>
          </div>
        ) : isLoading ? (
          <Loader size={60} height="290px" />
        ) : (
      <Chart
        options={chartState.options}
        series={chartState.series}
        type="polarArea"
        height={"300px"}
      />)}
    </div>
  )
}
