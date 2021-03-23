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
import { AccessViolationTable } from "../components/violation/accessViolation/AccessViolationTable"

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
    fontSize: "30px",
  },
}))

export const AccessViolationPage: React.FC = () => {
  const classes = useStyles()

  return (
    <div className={classes.container1}>
      <Grid container spacing={2} className={classes.container}>
        <Grid item xs={12}>
          <Typography className={classes.title} variant="h3">
            Нарушения прав доступа в помещения
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card className={classes.paper}><AccessViolationTable /></Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card className={classes.paper}>3</Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card className={classes.paper}>4</Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card className={classes.paper}>5</Card>
        </Grid>
        
      </Grid>
    </div>
  )
}
