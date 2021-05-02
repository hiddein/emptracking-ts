import { makeStyles, Typography } from "@material-ui/core"
import React, { useEffect } from "react"
import Chart from "react-apexcharts"
import { useTypedSelector } from "../../../../hooks/useTypedSelector"
import { Loader } from "../../../Loader"
import { rusLocaleChart } from "../../../../rusLocale/ruslocale"
import { getCountMovesInRangeDaySort } from "../../../../store/action-creators/stat"
import { useDispatch } from "react-redux"

const useStyles = makeStyles(() => ({
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
  setExportJSON: Function
}
interface IExpObg {
  data: any
}

export const CountVisitsByEmpPerRangeChart: React.FC<propsStatChart> = (props: propsStatChart) => {
  const classes = useStyles()
  const stat = useTypedSelector((state) => state.stat.statDaySort)
  const isLoading = useTypedSelector((state) => state.stat.loadingDaySort)
  const startDate = useTypedSelector((state) => state.dates.startDate)
  const endDate = useTypedSelector((state) => state.dates.endDate)
  const dispatch = useDispatch()
  const perRangeExp:IExpObg = {
    data:[]
  }


  useEffect(() => {
    dispatch(getCountMovesInRangeDaySort(startDate, endDate))
   }, [startDate, endDate])

   useEffect(() => {
    dispatch(getCountMovesInRangeDaySort(startDate, endDate))
    props.setExportJSON(perRangeExp)
   }, [startDate, endDate,props.idEmp,props.selectedRoomOnChart])

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
      title: {
        text: `Количество посещений Выбранного помещения ${props.selectedRoomOnChart != "" ? ` (${props.selectedRoomOnChart})` :null}`,
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
        forceNiceScale:true,
        labels: {
          formatter: function (value:any) {
            return value;
          }
        },
      }
    }
    }
    statDaySortFiltered.map((item: any) => {
      chartState.options.xaxis.categories.push(item.time)
      chartState.series[0].data.push(item.count_visits)

      perRangeExp.data.push({
        date: item.time,
        countVisits: item.count_visits
      })
    })


  return (
    <div>
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
        height={"330px"}
      />
        )}
      
    </div>
  )
}
