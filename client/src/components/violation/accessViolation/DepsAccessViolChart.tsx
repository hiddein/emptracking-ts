import { Button, Card, Grid, makeStyles, Typography } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import Chart from "react-apexcharts"

import { rusLocaleChart } from "../../../rusLocale/ruslocale";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { getAccessViols, getAccessViolsByEmpDays} from "../../../store/action-creators/accessViols"
import _ from "lodash";
import { Loader } from "../../Loader";
import { blue } from "@material-ui/core/colors";

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
    selectedButton: {
      padding: "4px 10px",
      color: blue[900],
      backgroundColor: blue[200]
    },
}))

interface propsDepChart {
  SetselectedDepOnChart:Function
  SetselectedEmpOnChart:Function
  idEmp:string
  depName:string
}

export const DepsAccessViolChart: React.FC<propsDepChart> = (props:propsDepChart) => {
  const classes = useStyles()
  const viols = useTypedSelector((state) => state.viol.viols)
  const isLoading = useTypedSelector((state) => state.viol.loading)
  const startDate = useTypedSelector((state) => state.dates.startDate)
  const endDate = useTypedSelector((state) => state.dates.endDate)
  const dispatch = useDispatch()

  
  useEffect(() => {
    dispatch(getAccessViols(startDate, endDate))
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
        events: {
          dataPointSelection: function(event:any, chartContext:any, config:any) {
            props.SetselectedDepOnChart(resultViolsSorted[config.dataPointIndex].name_dep)
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

  const violsSorted = _.countBy(viols, 'name_dep')
  var resultViolsSorted = Object.keys(violsSorted).map(function (id) {
    return {name_dep: id, count_viols: violsSorted[id]}
  })

  resultViolsSorted.map((item: any) => {
    chartState.options.xaxis.categories.push(item.name_dep)
    chartState.series[0].data.push(item.count_viols)
  })

  return (
    <React.Fragment>
        <div>
        <div className={classes.labelDiv}>
        <Typography variant='h6'>Количество нарушений в указанный промежуток (по отделам)</Typography>
         {props.depName !="" || props.idEmp !="" ? (<Button className={classes.selectedButton}
                  onClick={() => {
                    props.SetselectedDepOnChart("")
                    props.SetselectedEmpOnChart("")
                  }}>Отменить выбор</Button>) :null }
         </div>
         {isLoading ? (
          <Loader size={60} height="290px" />
        ) : (
      <Chart
        options={chartState.options}
        series={chartState.series}
        type="bar"
        height={"280px"}
      />)}
</div>

    </React.Fragment>
  )
}
