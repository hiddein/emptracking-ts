import _ from "lodash"
import React, { useEffect } from "react"
import Chart from "react-apexcharts"
import { useDispatch } from "react-redux"
import { useTypedSelector } from "../../hooks/useTypedSelector"
import { rusLocaleChart } from "../../rusLocale/ruslocale"
import { getCountMovesInRangeByDefault } from "../../store/action-creators/stat"
import { Loader } from "../Loader"

interface propsStatChart {
  setExportJSON: Function
}
interface IExpObg {
  data: any
}

export const CountVisitsChart: React.FC<propsStatChart> = (props: propsStatChart) => {
  const stat = useTypedSelector((state) => state.stat.statSortByDefault)
  const isLoading = useTypedSelector((state) => state.stat.loadingSortByDefault)
  const startDate = useTypedSelector((state) => state.dates.startDate)
  const endDate = useTypedSelector((state) => state.dates.endDate)
  const dispatch = useDispatch()
  const dataExp:IExpObg = {
    data:[]
  }

  useEffect(() => {
    dispatch(getCountMovesInRangeByDefault(startDate, endDate))
    props.setExportJSON(dataExp)
   }, [startDate, endDate])


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
      },
      title: {
        text: 'Количество посещений помещений предприятия',
        align: 'center',
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
  stat.map((item: any) => {
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
         {isLoading ? (
          <Loader size={60} height="290px" />
        ) : (
      <Chart
        options={chartState.options}
        series={chartState.series}
        type="bar"
        height={"290px"}
      />)}
</div>

    </React.Fragment>
  )
}
