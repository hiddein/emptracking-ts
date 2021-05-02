import { makeStyles, Typography } from "@material-ui/core"
import React, { useEffect } from "react"
import Chart from "react-apexcharts"
import { useTypedSelector } from "../../../hooks/useTypedSelector"
import { useDispatch } from "react-redux"
import { getAccessViolsByEmpDays } from "../../../store/action-creators/accessViols"
import { rusLocaleChart } from "../../../rusLocale/ruslocale"
import { Loader } from "../../Loader"

const useStyles = makeStyles(() => ({
  noEmpContainer: {
    height: "290px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "25px",
  },
}))


interface propsDepChart {
  idEmp:string
  setExportJSON: Function
}
interface IExpObg {
  idEmp: string
  data: any
}
export const EmpAccessViolChart: React.FC<propsDepChart> = (props: propsDepChart) => {
  const classes = useStyles()
  const viols = useTypedSelector((state) => state.viol.violsByEmpDays)
  const isLoading = useTypedSelector((state) => state.viol.loadingByEmpDays)
  const startDate = useTypedSelector((state) => state.dates.startDate)
  const endDate = useTypedSelector((state) => state.dates.endDate)
  const dispatch = useDispatch()
  const violsFiltered = viols.filter((item) => item.id_emp == props.idEmp)
  const dataExp:IExpObg = {
    idEmp: props.idEmp,
    data:[]
  }

  useEffect(() => {
    dispatch(getAccessViolsByEmpDays(startDate, endDate))
   }, [startDate, endDate])

   useEffect(() => {
    props.setExportJSON(dataExp)
   }, [startDate, endDate,props.idEmp])

   interface chartStateInterface {
    series: any
    options: any
  }
  const chartState: chartStateInterface = {
    
    series: [{
        name: "Количество нарушений",
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
      title: {
        text: 'Количество нарушений (сотрудник)',
        align: 'left',
        margin: 5,
        style: {
          fontSize:  '20px',
          fontFamily:  'Roboto',
          color:  '#263238'
        },
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
    violsFiltered.map((item: any) => {
      chartState.options.xaxis.categories.push(item.timestamp)
      chartState.series[0].data.push(item.count)

      dataExp.data.push({
        date: item.timestamp,
        countViols: item.count
      })
    })



  return (
    <div>
      {props.idEmp == "" ? (
          <div className={classes.noEmpContainer}>
            <Typography variant="h4">Выберите отдел и сотрудника</Typography>
          </div>
        ) : isLoading ? (
          <Loader size={60} height="290px" />
        ) : (
      <Chart
        options={chartState.options}
        series={chartState.series}
        type="line"
        height={"330px"}
      />)}
    </div>
  )
}
