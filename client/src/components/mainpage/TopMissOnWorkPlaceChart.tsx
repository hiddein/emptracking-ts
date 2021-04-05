import { Card, Grid, makeStyles, Typography } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import Chart from "react-apexcharts"

import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { getWorkHoursViols } from "../../store/action-creators/workHoursViols";
import { rusLocaleChart } from "../../rusLocale/ruslocale";
import _ from "lodash";
import { Loader } from "../Loader"

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
    }
}))

export const TopMissOnWorkPlaceChart: React.FC = () => {
  const classes = useStyles()
  const viols = useTypedSelector((state) => state.workHoursViol.viols)
  const isLoading = useTypedSelector((state) => state.workHoursViol.loading)
  const dispatch = useDispatch()
  const startDate = useTypedSelector(state => state.dates.startDate)
  const endDate = useTypedSelector(state => state.dates.endDate)

  useEffect(() => {
    dispatch(getWorkHoursViols(startDate, endDate))
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

  const violsSorted = _.countBy(viols, "name_dep")
  var resultlatenessSortedSorted = Object.keys(violsSorted).map(function (id) {
    return { name_dep: id, count_viols: violsSorted[id] }
  })

  resultlatenessSortedSorted.map((item: any) => {
    chartState.options.xaxis.categories.push(item.name_dep)
    chartState.series[0].data.push(item.count_viols)
  })

  return (
    <React.Fragment>
        <div>
        <div className={classes.labelDiv}>
        <Typography variant='h6'>Нарушения рабочего времени (по отделам)</Typography>
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
