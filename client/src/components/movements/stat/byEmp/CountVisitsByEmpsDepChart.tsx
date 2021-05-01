import { Card, Grid, makeStyles, Typography } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import Chart from "react-apexcharts"
import { useTypedSelector } from "../../../../hooks/useTypedSelector"
import { Loader } from "../../../Loader"
import { rusLocaleChart } from "../../../../rusLocale/ruslocale"
import { useDispatch } from "react-redux"
import { getCountMovesInRange } from "../../../../store/action-creators/stat"

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
    height: "290px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "25px",
  },
}))

interface propsStatChart {
  idEmp: string
  SetselectedRoomOnChart:Function
  setExportJSON: Function
}

interface IExpObg {
  data: any
}

export const CountVisitsByEmpsDepChart: React.FC<propsStatChart> = (
  props: propsStatChart
) => {
  const classes = useStyles()
  const stat = useTypedSelector((state) => state.stat.stat)
  const isLoading = useTypedSelector((state) => state.stat.loading)
  const startDate = useTypedSelector((state) => state.dates.startDate)
  const endDate = useTypedSelector((state) => state.dates.endDate)
  const dispatch = useDispatch()
  const dataExp:IExpObg = {
    data:[]
  }


  useEffect(() => {
    dispatch(getCountMovesInRange(startDate, endDate))
   }, [startDate, endDate])

   useEffect(() => {
    props.setExportJSON(dataExp)
   }, [startDate, endDate,props.idEmp])

  const statFiltered = stat.filter((item) => item.id_emp == props.idEmp)
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
            props.SetselectedRoomOnChart(statFiltered[config.dataPointIndex].name_room)
          }
        }
      },
      title: {
        text: `Количество посещений (по сотруднику)`,
        align: 'left',
        margin: 5,
        style: {
          fontSize:  '20px',
          fontFamily:  'Roboto',
          color:  '#263238'
        },
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
          rotate: -45,
          minHeight: 100
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
    chartState.options.xaxis.categories.push(item.name_room)
    chartState.series[0].data.push(item.count_visits)

    dataExp.data.push({
      nameRoom: item.name_room,
      countVisits: item.count_visits
    })
  })
  return (
    <React.Fragment>
      <div>
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
            type="bar"
            height={"330px"}
          />
        )}
      </div>
    </React.Fragment>
  )
}
