import { makeStyles, Typography } from "@material-ui/core"
import React, { useEffect } from "react"
import Chart from "react-apexcharts"
import { useTypedSelector } from "../../../../hooks/useTypedSelector"
import { Loader } from "../../../Loader"
import { rusLocaleChart } from "../../../../rusLocale/ruslocale"
import { useDispatch } from "react-redux"
import { getCountMovesInRange } from "../../../../store/action-creators/stat"

const useStyles = makeStyles(() => ({
  noDepContainer: {
    height: "290px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "25px",
  },
}))
interface propsStatChart {
  nameDep: string
  nameRoom: string
  setExportJSON: Function
}
interface IExpObg {
  data: any
}

export const CountVisitsByEmpChart: React.FC<propsStatChart> = (
  props: propsStatChart
) => {
  const classes = useStyles()
  const startDate = useTypedSelector((state) => state.dates.startDate)
  const endDate = useTypedSelector((state) => state.dates.endDate)
  const stat = useTypedSelector((state) => state.stat.stat)
  const isLoading = useTypedSelector((state) => state.stat.loading)
  const dispatch = useDispatch()
  const dataExp: IExpObg = {
    data: [],
  }

  useEffect(() => {
    dispatch(getCountMovesInRange(startDate, endDate))
  }, [startDate, endDate])

  useEffect(() => {
    props.setExportJSON(dataExp)
  }, [startDate, endDate, props.nameRoom, props.nameDep])

  const statFiltered = stat.filter(
    (item) => item.name_room == props.nameRoom && item.name_dep == props.nameDep
  )

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
        zoom: {
          enabled: false,
        },
      },
      plotOptions: {
        bar: {
          borderRadius: 15,
          columnWidth: "50%",
        },
      },
      title: {
        text: "Количество посещений (по сотрудникам отдела)",
        align: "left",
        margin: 5,
        style: {
          fontSize: "20px",
          fontFamily: "Roboto",
          color: "#263238",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
      },

      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: [],
      },
      yaxis: {
        min: 0,
        forceNiceScale: true,
      },
    },
  }

  statFiltered.map((item: any) => {
    chartState.options.xaxis.categories.push(
      `${item.last_name} ${item.first_name}`
    )
    chartState.series[0].data.push(item.count_visits)

    dataExp.data.push({
      nameEmp: `${item.last_name} ${item.first_name}`,
      countVisits: item.count_visits,
    })
  })
  return (
    <React.Fragment>
      <div>
        {props.nameDep == "" ? (
          <div className={classes.noDepContainer}>
            <Typography variant="h4">Выберите помещение и отдел</Typography>
          </div>
        ) : isLoading ? (
          <Loader size={60} height="290px" />
        ) : (
          <Chart
            options={chartState.options}
            series={chartState.series}
            type="bar"
            height={"320px"}
          />
        )}
      </div>
    </React.Fragment>
  )
}
