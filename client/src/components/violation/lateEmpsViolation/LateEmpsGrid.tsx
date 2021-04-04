import React, { useState } from "react"
import {
  Card,
  Grid,
  makeStyles,
  Theme,
} from "@material-ui/core"
import { LateEmpsTable } from "./LateEmpsTable"
import { LateEmpsByDepChart } from "./LateEmpsByDepChart"
import { LateEmpsByEmpChart } from "./LateEmpsByEmpChart"


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

export const LateEmpsGrid: React.FC = () => {
  const classes = useStyles()
  const [selectedDepOnChart, SetselectedDepOnChart] = useState("")

  return (
    
          <React.Fragment>
            {" "}
            <Grid item xs={12} md={6}>
              <Card className={classes.paper}><LateEmpsTable /></Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Grid container direction="column" spacing={2}>
                <Grid item xs={12} md={12}>
                  <Card className={classes.paper}><LateEmpsByDepChart SetselectedDepOnChart={SetselectedDepOnChart} depName={selectedDepOnChart}  /></Card>
                </Grid>
                <Grid item xs={12} md={12}>
                  <Card className={classes.paper1}><LateEmpsByEmpChart depName={selectedDepOnChart}/></Card>
                </Grid>
              </Grid>
            </Grid>{" "}
          </React.Fragment>
       
  )
}
