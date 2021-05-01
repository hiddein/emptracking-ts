import { Card, Grid, makeStyles, Typography } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import Chart from "react-apexcharts"
import { useTypedSelector } from "../../../../hooks/useTypedSelector"
import { Loader } from "../../../Loader"
import { rusLocaleChart } from "../../../../rusLocale/ruslocale"
import { getCountMovesInRangeDepSort } from "../../../../store/action-creators/stat"
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
  noEmpContainer: {
    height: "335px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "25px",
  },
}))

interface propsStatChart {
  nameRoom: string
  SetselectedDepOnChart:Function
  setExportJSON: Function
}

interface IExpObg {
  data: any
}

export const CountVisitsByDepChart: React.FC<propsStatChart> = (
  props: propsStatChart
) => {
  const classes = useStyles()
  const stat = useTypedSelector((state) => state.stat.statDepSort)
  const isLoading = useTypedSelector((state) => state.stat.loadingDepSort)
  const statFiltered = stat.filter((item) => item.name_room == props.nameRoom)
  const startDate = useTypedSelector((state) => state.dates.startDate)
  const endDate = useTypedSelector((state) => state.dates.endDate)
  const dispatch = useDispatch()
  const dataExp:IExpObg = {
    data:[]
  }
  
  useEffect(() => {
    dispatch(getCountMovesInRangeDepSort(startDate, endDate))
   }, [startDate, endDate])


   useEffect(() => {
    props.setExportJSON(dataExp)
   }, [startDate, endDate,props.nameRoom])


  interface chartStateInterface {
    series: any
    options: any
  }
  const chartState: chartStateInterface = {
    series: [
      {
        name: "Количество посещений",
        data: [],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "bar",
        locales: [rusLocaleChart],
        defaultLocale: "RU",
        events: {
          dataPointSelection: function(event:any, chartContext:any, config:any) {
            props.SetselectedDepOnChart(statFiltered[config.dataPointIndex].name_dep)
          }
        }
      },
      plotOptions: {
        bar: {
          borderRadius: 5,
          columnWidth: "50%",
        },
      },
      dataLabels: {
        enabled: false,
      },
      title: {
        text: 'Количество посещений (по отделам)',
        align: 'left',
        margin: 0,
        style: {
          fontSize:  '20px',
          fontFamily:  'Roboto',
          color:  '#263238'
        },
      },
      stroke: {
        width: 2,
      },

      grid: {
        row: {
          colors: ["#fff", "#f2f2f2"],
          
        },
      },
      xaxis: {
        labels: {
          rotate: -32,
          rotateAlways: true,
          minHeight: 200
        },
        categories: [],
        tickPlacement: "on",
      },
      yaxis: {
        title: {
          text: "Количество посещений",
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          type: "horizontal",
          shadeIntensity: 0.25,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 0.85,
          opacityTo: 0.85,
          stops: [50, 0, 100],
        },
      },
    },
  }
  statFiltered.map((item: any) => {
    chartState.options.xaxis.categories.push(item.name_dep)
    chartState.series[0].data.push(item.count_visits)

    dataExp.data.push({
      nameDep: item.name_dep,
      countVisits: item.count_visits
    })
  })
  return (
    <React.Fragment>
      <div>
        {props.nameRoom == "" ? (
          <div className={classes.noEmpContainer}>
            <Typography variant="h4">Выберите помещение</Typography>
          </div>
        ) : isLoading ? (
          <Loader size={60} height="290px" />
        ) : (
          <Chart
            options={chartState.options}
            series={chartState.series}
            type="bar"
            height={"450px"}
          />
        )}
      </div>
    </React.Fragment>
  )
}
