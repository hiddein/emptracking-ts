import { Card, Grid, makeStyles, Typography } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import Chart from "react-apexcharts"
import { getLatenessByEmp } from "../../../store/action-creators/lateness";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { rusLocaleChart } from "../../../rusLocale/ruslocale";
import { Loader } from "../../Loader";

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
    },
    noDepContainer: {
      height: "285px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "25px",
    },
}))

interface propsDepChart {
  depName:string
}

export const LateEmpsByEmpChart: React.FC<propsDepChart> = (props: propsDepChart) => {
  const classes = useStyles()
  const lateness = useTypedSelector((state) => state.lateness.latenessByEmp)
  const isLoading = useTypedSelector((state) => state.lateness.loadingByEmp)
  const dispatch = useDispatch()
  const startDate = useTypedSelector(state => state.dates.startDate)
  const endDate = useTypedSelector(state => state.dates.endDate)
  const latenessFiltered = lateness.filter((item) => item.name_dep == props.depName)


  useEffect(() => {
    dispatch(getLatenessByEmp(startDate, endDate))
   }, [startDate, endDate])

   interface chartStateInterface {
    series: any
    options: any
  }
  const chartState: chartStateInterface = {
    series: [
      {
        name: "Количество опозданий",
        data: [],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "bar",
        locales: [rusLocaleChart],
        defaultLocale: "RU",
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
        },
        categories: [],
        tickPlacement: "on",
      },
      yaxis: {
        title: {
          text: "Количество опозданий",
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

  latenessFiltered.map((item: any) => {
    chartState.options.xaxis.categories.push(`${item.last_name} ${item.first_name}`)
    chartState.series[0].data.push(item.count_lateness)
  })

  return (
    <React.Fragment>
        <div>
        <div className={classes.labelDiv}>
        <Typography variant='h6'>Количество опозданий (по сотрудникам)</Typography>
         </div>
         {props.depName == "" ? (
          <div className={classes.noDepContainer}>
            <Typography variant="h4">Выберите отдел</Typography>
          </div>
        ) : isLoading ? (
          <Loader size={60} height="290px" />
        ) : (
      <Chart
        options={chartState.options}
        series={chartState.series}
        type="bar"
        height={"268px"}
      />)}
</div>

    </React.Fragment>
  )
}
