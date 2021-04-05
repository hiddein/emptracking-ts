import {
  Card,
  Grid,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from "@material-ui/core"
import { blue } from "@material-ui/core/colors"
import React, { useEffect, useState } from "react"
import Chart from "react-apexcharts"
import { useDispatch } from "react-redux"
import { AccessViolsCountCard } from "../components/mainpage/cards/AccessViolsCountCard"
import { LatenessCountCard } from "../components/mainpage/cards/LatenessCountCard"
import { TopLatenessCard } from "../components/mainpage/cards/TopLatenessCard"
import { WorkhoursViolsCountCard } from "../components/mainpage/cards/WorkhoursViolsCountCard"
import { TopAccessViolsChart } from "../components/mainpage/TopAccessViolsChart"
import { TopLatesDepsChart } from "../components/mainpage/TopLatesDepsChart"
import { TopMissOnWorkPlaceChart } from "../components/mainpage/TopMissOnWorkPlaceChart"
import { TopVisRoomsChart } from "../components/mainpage/TopVisRoomsChart"
import { RangePicker } from "../components/RangePicker"


const useStyles = makeStyles((theme: Theme) => ({
  container: {
    paddingTop: "10px",
  },
  container1: {
    padding: "70px 0 50px",
    margin: "0 auto",
    width: "95%",
  },

  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    height: "320px",
  },
  paper1: {
    padding: theme.spacing(2),
    textAlign: "center",
    maxHeight: "351px",
  },
  title: {
    padding: theme.spacing(0),
    textAlign: "center",
    color: blue[900],
    fontSize: "25px",
    display: "flex",
    alignItems: "center",
  },
  titleContainer: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  datePickerContainer:{
    padding: '5px 20px',
    display: 'flex',
    flexWrap: 'nowrap'
  },
  paperInfo:{
    height: "168px",

  },
  paperLateStats:{
    height: "352px",


  },
  paperMostVis:{
    height: "352px",


  }
}))

export const MainPanelPage: React.FC = () => {
  const classes = useStyles()
  const dispatch = useDispatch()



  return (
    <div className={classes.container1}>
      <Grid container spacing={2} className={classes.container}>
        <Grid item xs={12} className={classes.titleContainer}>
          <Typography className={classes.title} variant="h3">
            Главная панель
          </Typography>
          <Card className={classes.datePickerContainer}>
          <RangePicker />
          </Card>
        </Grid>


        <Grid  item xs={12} md={6}>
        <Grid spacing={2} container  >
        <Grid  item xs={12} md={6}>
          <Card className={classes.paperInfo}><TopLatenessCard /></Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card className={classes.paperInfo}><LatenessCountCard /></Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card className={classes.paperInfo}><WorkhoursViolsCountCard /></Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card className={classes.paperInfo}><AccessViolsCountCard /></Card>
        </Grid>
        </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card className={classes.paper}><TopMissOnWorkPlaceChart /></Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card className={classes.paper}><TopAccessViolsChart /></Card>
        </Grid>
        <Grid item xs={12} md={6}>

        <Grid spacing={2} container >
        <Grid  item xs={12} md={6}>
          <Card className={classes.paperLateStats}><TopVisRoomsChart /></Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card className={classes.paperMostVis}><TopLatesDepsChart /></Card>
        </Grid>

        </Grid>

        </Grid>
        
      </Grid>

    </div>
  )
}
