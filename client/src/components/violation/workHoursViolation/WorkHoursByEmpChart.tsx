import { Card, Grid, makeStyles, Typography } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import Chart from "react-apexcharts"
import MomentUtils from '@date-io/moment'
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
import { Loader } from "../../Loader";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { getWorkHoursViolsByEmp } from "../../../store/action-creators/workHoursViols";
import { rusLocaleChart } from "../../../rusLocale/ruslocale";

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

interface propsEmpChart {
  depName:string
}

export const WorkHoursByEmpChart: React.FC<propsEmpChart> = (props: propsEmpChart) => {
  const classes = useStyles()
  const viols = useTypedSelector((state) => state.workHoursViol.violsByEmp)
  const isLoading = useTypedSelector((state) => state.workHoursViol.loadingByEmp)
  const dispatch = useDispatch()
  const startDate = useTypedSelector(state => state.dates.startDate)
  const endDate = useTypedSelector(state => state.dates.endDate)
  const violsFiltered = viols.filter((viol) => viol.name_dep == props.depName)


  useEffect(() => {
    dispatch(getWorkHoursViolsByEmp(startDate, endDate))
   }, [startDate, endDate])

   interface chartStateInterface {
    series: any
    options: any
  }
  const chartState: chartStateInterface = {
    series: [
      {
        name: "Количество нарушений",
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
          text: "Количество нарушений",
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

  violsFiltered.map((viol: any) => {
    chartState.options.xaxis.categories.push(`${viol.last_name} ${viol.first_name}`)
    chartState.series[0].data.push(viol.count_viols)
  })

  return (
    <React.Fragment>
        <div>
        <div className={classes.labelDiv}>
        <Typography variant='h6'>Количество нарушений (сотрудник)</Typography>
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
