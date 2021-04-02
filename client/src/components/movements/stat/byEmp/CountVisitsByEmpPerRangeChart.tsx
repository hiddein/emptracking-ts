import { Card, Grid, makeStyles, Typography } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import Chart from "react-apexcharts"
import { useTypedSelector } from "../../../../hooks/useTypedSelector"
import { Loader } from "../../../Loader"
import { rusLocaleChart } from "../../../../rusLocale/ruslocale"
import { getCountMovesInRangeDaySort } from "../../../../store/action-creators/stat"
import { useDispatch } from "react-redux"

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
  noRoomContainer: {
    height: "290px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "25px",
  },
}))

interface propsStatChart {
  idEmp: string
  selectedRoomOnChart:string
}


export const CountVisitsByEmpPerRangeChart: React.FC<propsStatChart> = (props: propsStatChart) => {
  const classes = useStyles()
  const stat = useTypedSelector((state) => state.statDaySort.stat)
  const isLoading = useTypedSelector((state) => state.statDaySort.loading)
  const startDate = useTypedSelector((state) => state.dates.startDate)
  const endDate = useTypedSelector((state) => state.dates.endDate)
  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(getCountMovesInRangeDaySort(startDate, endDate))
   }, [startDate, endDate])


  const statDaySortFiltered = stat.filter(
    (item) => item.id_emp == props.idEmp && item.name_room == props.selectedRoomOnChart
  )

  interface chartStateInterface {
    series: any
    options: any
  }
  const chartState: chartStateInterface = {
    
    series: [{
        name: "Количество посещений",
        data: []
    }],
    options: {
      chart: {
        height: 350,
        type: 'line',
        locales: [rusLocaleChart],
        defaultLocale: "RU",
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
      
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5
        },
      },
      xaxis: {
        categories: [],
      },
      yaxis: {
        min:0,
        forceNiceScale:true
      }
    }
    }
    statDaySortFiltered.map((item: any) => {
      chartState.options.xaxis.categories.push(item.time)
      chartState.series[0].data.push(item.count_visits)
    })


  return (
    <div>
      <div className={classes.labelDiv}>
        <Typography variant="h6">
          Количество посещений выбранного помещения {props.selectedRoomOnChart != "" ? ` (${props.selectedRoomOnChart})` :null}
        </Typography>
      </div>
      {props.selectedRoomOnChart == "" ? (
          <div className={classes.noRoomContainer}>
            <Typography variant="h4">Выберите сотрудника и помещение</Typography>
          </div>
        ) : isLoading ? (
          <Loader size={60} height="290px" />
        ) : (
          <Chart
        options={chartState.options}
        series={chartState.series}
        type="line"
        height={"268px"}
      />
        )}
      
    </div>
  )
}