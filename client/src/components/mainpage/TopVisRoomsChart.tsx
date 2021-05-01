import { Card, Grid, makeStyles, Typography } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import Chart from "react-apexcharts"
import { useTypedSelector } from "../../hooks/useTypedSelector"
import { useDispatch } from "react-redux"
import { getCountMovesInRangeByDefault } from "../../store/action-creators/stat"
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

interface ITopVisRoomsChart{
  setExportJSON: Function

}
interface Icount {
  name_room: string
  count_visits: number
}

export const TopVisRoomsChart: React.FC<ITopVisRoomsChart> = (props: ITopVisRoomsChart) => {
  const classes = useStyles()
  const stat: Icount[] = useTypedSelector((state) => state.stat.statSortByDefault)
  const isLoading = useTypedSelector((state) => state.stat.loadingSortByDefault)
  const startDate = useTypedSelector((state) => state.dates.startDate)
  const endDate = useTypedSelector((state) => state.dates.endDate)
  const dispatch = useDispatch()
  const visRoomsExp:Array<object> = []


  useEffect(() => {
    dispatch(getCountMovesInRangeByDefault(startDate, endDate))
    props.setExportJSON(visRoomsExp)
   }, [startDate, endDate])


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
              title: {
                text: 'Самые посещаемые помещения',
                align: 'center',
                margin: 30,
                style: {
                  fontSize:  '20px',
                  fontFamily:  'Roboto',
                  color:  '#263238'
                },
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

    const statSorted = _.sortBy(stat, 'count_visits')
  
    console.log(statSorted)
    const statSortedFiltered = statSorted.reverse().filter((item) => statSorted.indexOf(item)<5)

    statSortedFiltered.map((item: any) => {
      chartState.options.labels.push(item.name_room)
      chartState.series.push(item.count_visits)

      visRoomsExp.push({roomName:item.name_room, countVisits:item.count_visits})
    })

  return (
    <div>
      {isLoading ? (
          <Loader size={60} height="290px" />
        ) : (
      <Chart
        options={chartState.options}
        series={chartState.series}
        type="polarArea"
        height={"350px"}
      />)}
    </div>
  )
}
