import { Card, Grid, makeStyles, Paper, Theme, Typography } from "@material-ui/core"
import { blue } from "@material-ui/core/colors"
import React, { useState } from "react"
import Chart from "react-apexcharts"



const useStyles = makeStyles((theme: Theme) => ({
  container: {
    paddingTop: '10px',

  },
  container1: {
    padding: '80px 0 50px',
    margin: '0 auto',
    width: '95%'

  },
  
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
  },
  title: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: blue[900],
    fontSize: '30px'
  },
}))



export const MainPanelPage: React.FC = () => {
  const classes = useStyles();
  const [selectedItem, SetselectedItem] = useState(0)

  var options = {
    options: {
      chart: {
        id: "basic-bar",
        events: {
          dataPointSelection: function(event:any, chartContext:any, config:any) {
            SetselectedItem(config.dataPointIndex)
          }
        }
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
      }
    },
    series: [
      {
        name: "series-1",
        data: [30, 40, 45, 50, 49, 60, 70, 91]
      }
    ]
  }
  

  return (

    <div className={classes.container1}>
    <Grid container spacing={2} className={classes.container} >
    <Grid item xs={12}>
    <Card className={classes.paper}>1</Card>
        </Grid>
    <Grid item xs={12} sm={6} xl={4}>
      <Card className={classes.paper}><Chart
          options={options.options}
          series={options.series}
          type="bar"
          height={"350px"} />
          {options.options.xaxis.categories[selectedItem]}</Card>
    </Grid>
    <Grid item xs={12} sm={6} xl={4}>
      <Card className={classes.paper}>2</Card>
    </Grid>
    <Grid item xs={12} sm={6} xl={4}>
      <Card className={classes.paper}>3</Card>
    </Grid>
    <Grid item xs={12} sm={6} xl={4}>
      <Card className={classes.paper}>4</Card>
    </Grid>
    <Grid item xs={12} sm={6} xl={4}>
      <Card className={classes.paper}>5</Card>
    </Grid>
    <Grid item xs={12} sm={6} xl={4}>
      <Card className={classes.paper}>6</Card>
    </Grid>
  </Grid>
  </div>
  )
}
