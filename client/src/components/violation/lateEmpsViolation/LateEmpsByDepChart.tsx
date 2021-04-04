import { Button, Card, Grid, makeStyles, Typography } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import Chart from "react-apexcharts"
import MomentUtils from '@date-io/moment'
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { rusLocaleChart } from "../../../rusLocale/ruslocale";
import _ from "lodash";
import { blue } from "@material-ui/core/colors";
import { Loader } from "../../Loader";

const useStyles = makeStyles(() => ({
    labelDiv:{
        display:'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '10px',
        padding: ' 0 20px'
    },
    selectedButton: {
      padding: "4px 10px",
      color: blue[900],
      backgroundColor: blue[200]
    },

    
}))

interface propsDepChart {
  SetselectedDepOnChart:Function
  depName:string
}

export const LateEmpsByDepChart: React.FC<propsDepChart> = (props: propsDepChart) => {
  const classes = useStyles()
  const lateness = useTypedSelector((state) => state.lateness.lateness)
  const isLoading = useTypedSelector((state) => state.lateness.loading)

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
        events: {
          dataPointSelection: function(event:any, chartContext:any, config:any) {
            props.SetselectedDepOnChart(resultlatenessSortedSorted[config.dataPointIndex].name_dep)
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

  const latenessSorted = _.countBy(lateness, 'name_dep')
  var resultlatenessSortedSorted = Object.keys(latenessSorted).map(function (id) {
    return {name_dep: id, count_viols: latenessSorted[id]}
  })

  resultlatenessSortedSorted.map((item: any) => {
    chartState.options.xaxis.categories.push(item.name_dep)
    chartState.series[0].data.push(item.count_viols)
  })
  return (
    <React.Fragment>
        <div>
        <div className={classes.labelDiv}>
        <Typography variant='h6'>Количество опозданий (по отделам)</Typography>
        {props.depName !="" ? (<Button className={classes.selectedButton}
                  onClick={() => {
                    props.SetselectedDepOnChart("")
                  }}>Отменить выбор</Button>) :null }
         </div>
         {isLoading ? (
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
