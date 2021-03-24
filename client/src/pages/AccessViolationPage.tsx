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
import Chart from "react-apexcharts"
import { RangePicker } from "../components/RangePicker"
import { AccessViolationTable } from "../components/violation/accessViolation/AccessViolationTable"
import { ByEmpsAccessViolChart } from "../components/violation/accessViolation/ByEmpsAccessViolChart"
import { DepsAccessViolChart } from "../components/violation/accessViolation/DepsAccessViolChart"
import { EmpAccessViolChart } from "../components/violation/accessViolation/EmpAccessViolChart"

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
  },
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
  }
}))

export const AccessViolationPage: React.FC = () => {
  const classes = useStyles()

  return (
    <div className={classes.container1}>
      <Grid container spacing={2} className={classes.container}>
        <Grid item xs={12} className={classes.titleContainer}>
          <Typography className={classes.title} variant="h3">
            Нарушения прав доступа в помещения
          </Typography>
          <Card className={classes.datePickerContainer}>
          <RangePicker />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card className={classes.paper}><AccessViolationTable /></Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card className={classes.paper}><DepsAccessViolChart /></Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card className={classes.paper}><EmpAccessViolChart /></Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card className={classes.paper}><ByEmpsAccessViolChart /></Card>
        </Grid>
        
      </Grid>

    </div>
  )
}
