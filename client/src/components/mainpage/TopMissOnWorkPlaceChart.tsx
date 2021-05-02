import React, { useEffect } from "react"
import Chart from "react-apexcharts"
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { getWorkHoursViols } from "../../store/action-creators/workHoursViols";
import { rusLocaleChart } from "../../rusLocale/ruslocale";
import _ from "lodash";
import { Loader } from "../Loader"

interface ITopMissOnWorkChart{
  setExportJSON: Function
}

export const TopMissOnWorkPlaceChart: React.FC<ITopMissOnWorkChart> = (props: ITopMissOnWorkChart) => {
  const viols = useTypedSelector((state) => state.workHoursViol.viols)
  const isLoading = useTypedSelector((state) => state.workHoursViol.loading)
  const dispatch = useDispatch()
  const startDate = useTypedSelector(state => state.dates.startDate)
  const endDate = useTypedSelector(state => state.dates.endDate)
  const workHoursExp:Array<object> = []


  useEffect(() => {
    dispatch(getWorkHoursViols(startDate, endDate))
    props.setExportJSON(workHoursExp)
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
      title: {
        text: 'Нарушения рабочего времени (по отделам)',
        align: 'left',
        margin: 10,
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

  const violsSorted = _.countBy(viols, "name_dep")
  var resultlatenessSortedSorted = Object.keys(violsSorted).map(function (id) {
    return { name_dep: id, count_viols: violsSorted[id] }
  })

  resultlatenessSortedSorted.map((item: any) => {
    chartState.options.xaxis.categories.push(item.name_dep)
    chartState.series[0].data.push(item.count_viols)

    workHoursExp.push({depName:item.name_dep, countViols:item.count_viols})
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
        height={"330px"}
      />)}
</div>

    </React.Fragment>
  )
}
