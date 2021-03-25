import {
  Card,
  Grid,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from "@material-ui/core"
import { blue } from "@material-ui/core/colors"
import React, { useState } from "react"
import { useEffect } from "react"
import Chart from "react-apexcharts"
import { useDispatch } from "react-redux"
import { RangePicker } from "../components/RangePicker"
import { CountVisitsChart } from "../components/rooms/CountVisitsChart"
import { EmpsWithAccessTable } from "../components/rooms/EmpsWithAccessTable"
import { RoomCard } from "../components/rooms/RoomCard"
import { RoomSearchTable } from "../components/rooms/RoomSearchTable"

import { ByEmpsAccessViolChart } from "../components/violation/accessViolation/ByEmpsAccessViolChart"
import { DepsAccessViolChart } from "../components/violation/accessViolation/DepsAccessViolChart"
import { EmpAccessViolChart } from "../components/violation/accessViolation/EmpAccessViolChart"
import { getRooms } from "../store/action-creators/rooms"

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
  },
  container: {
    paddingTop: "10px",
  },
  containerCards: {
    margin: 0,
    padding: 0,
  },
  container1: {
    padding: "70px 0 50px",
    margin: "0 auto",
    width: "95%",
  },

  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
  },
  papepSmallCard: {
    padding: theme.spacing(2),
    textAlign: "center",
    height: "145px",


  },
  papepBigCard: {
    textAlign: "center",
    height: "370px",
    marginRight: '-16px'

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
  },
}))

export const RoomInfoPage: React.FC = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getRooms())
  }, [])

  return (
    <div className={classes.container1}>
      <Grid container spacing={2} className={classes.container}>

      <Grid item xs={12}>
          <Typography className={classes.title} variant="h3">
            Помещения предприятия
          </Typography>
        </Grid>


       
        <Grid item xs={12} md={6}>
          <Card className={classes.paper}><RoomSearchTable /></Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card className={classes.paper}><EmpsWithAccessTable /></Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card className={classes.paper}><RoomCard /></Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card className={classes.paper}><CountVisitsChart /></Card>
        </Grid>
        </Grid>

    </div>
  )
}
