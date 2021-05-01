import { Card, Grid, makeStyles, Typography } from "@material-ui/core"
import _ from "lodash"
import React, { useEffect, useState } from "react"
import Chart from "react-apexcharts"
import { useDispatch } from "react-redux"
import { useTypedSelector } from "../../hooks/useTypedSelector"
import { rusLocaleChart } from "../../rusLocale/ruslocale"
import { getAccessViols } from "../../store/action-creators/accessViols"
import { Loader } from "../Loader"

const useStyles = makeStyles(() => ({
    labelDiv:{
        display:'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '10px',
        padding: ' 0 20px'
        
 
    },
}))

interface ITopAccessChart{
  setExportJSON: Function
}



export const TopAccessViolsChart: React.FC<ITopAccessChart> = (props: ITopAccessChart) => {
  const classes = useStyles()
  const viols = useTypedSelector((state) => state.viol.viols)
  const isLoading = useTypedSelector((state) => state.viol.loading)
  const startDate = useTypedSelector((state) => state.dates.startDate)
  const endDate = useTypedSelector((state) => state.dates.endDate)
  const dispatch = useDispatch()

  const topAccessChartExp:Array<object> = []

  useEffect(() => {
    dispatch(getAccessViols(startDate, endDate))
    props.setExportJSON(topAccessChartExp)
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
        text: 'Нарушения доступа (по отделам)',
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

  const violsSorted = _.countBy(viols, 'name_dep')
  var resultViolsSorted = Object.keys(violsSorted).map(function (id) {
    return {name_dep: id, count_viols: violsSorted[id]}
  })

  resultViolsSorted.map((item: any) => {
    chartState.options.xaxis.categories.push(item.name_dep)
    chartState.series[0].data.push(item.count_viols)

    topAccessChartExp.push({depName:item.name_dep, countViols:item.count_viols})
  })


  return (
    <React.Fragment>
        <div>
        
         {isLoading ? (
          <Loader size={60} height="290px"/>
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
