import React, { useState } from "react"
import {
  Card,
  Grid,
  makeStyles,
  Theme,
} from "@material-ui/core"
import { WorkHoursTable } from "./WorkHoursTable"
import { WorkHoursByDepChart } from "./WorkHoursByDepChart"
import { WorkHoursByEmpChart } from "./WorkHoursByEmpChart"


const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
  },
  paper1: {
    padding: theme.spacing(2),
    textAlign: "center",
    maxHeight: "351px",
  },
}))

export const WorkHoursGrid: React.FC = () => {
  const classes = useStyles()
  const [selectedDepOnChart, SetselectedDepOnChart] = useState("")
  

  return (
    
    <React.Fragment>
    <Grid item xs={12} md={6}>
      <Grid container direction="column" spacing={2}>
        <Grid item xs={12} md={12}>
          <Card className={classes.paper}><WorkHoursByDepChart SetselectedDepOnChart={SetselectedDepOnChart} depName={selectedDepOnChart}  /></Card>
        </Grid>
        <Grid item xs={12} md={12}>
          <Card className={classes.paper1}><WorkHoursByEmpChart depName={selectedDepOnChart} /></Card>
        </Grid>
      </Grid>
    </Grid>
    <Grid item xs={12} md={6}>
      <Card className={classes.paper}><WorkHoursTable /></Card>
    </Grid>
  </React.Fragment>
  )
}
