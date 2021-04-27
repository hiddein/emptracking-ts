import { Card, Grid, makeStyles, Typography } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import Chart from "react-apexcharts"
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { rusLocaleChart } from "../../../rusLocale/ruslocale";
import _ from "lodash";
import { getAccessViolsByEmp } from "../../../store/action-creators/accessViols";
import { useDispatch } from "react-redux";
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
      height: "290px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "25px",
    },
}))

interface propsDepChart {
  depName:string
  SetselectedEmpOnChart:Function
  setExportJSON: Function
}
interface IExpObg {
  depName: string
  data: any
}
export const ByEmpsAccessViolChart: React.FC<propsDepChart> = (props: propsDepChart) => {
  const classes = useStyles()
  const viols = useTypedSelector((state) => state.viol.violsByEmp)
  const isLoading = useTypedSelector((state) => state.viol.loadingByEmp)
  const startDate = useTypedSelector((state) => state.dates.startDate)
  const endDate = useTypedSelector((state) => state.dates.endDate)
  const dispatch = useDispatch()
  const violsFiltered = viols.filter((item) => item.name_dep == props.depName)
  const dataExp:IExpObg = {
    depName: props.depName,
    data:[]
  }

  useEffect(() => {
    dispatch(getAccessViolsByEmp(startDate, endDate))
   }, [startDate, endDate, props.depName ])

   useEffect(() => {
    props.setExportJSON(dataExp)
   }, [startDate, endDate,props.depName])


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
            props.SetselectedEmpOnChart(violsFiltered[config.dataPointIndex].id_emp)
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

  violsFiltered.map((item: any) => {
    chartState.options.xaxis.categories.push(`${item.last_name} ${item.first_name}`)
    chartState.series[0].data.push(item.count)

    dataExp.data.push({
      nameEmp: `${item.last_name} ${item.first_name}`,
      countViols: item.count
    })
  })


  return (
    <React.Fragment>
        <div>
        <div className={classes.labelDiv}>
        <Typography variant='h6'>Количество нарушений в указанный промежуток (сотрудники отдела)</Typography>
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
        height={"260px"}
      />)}
</div>

    </React.Fragment>
  )
}
