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
import { EmpsTable } from "../components/EmpsTable"
import { MovementsEmpBar } from "../components/movements/MovementsEmpBar"
import { MovementsTable } from "../components/movements/MovementsTable"

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
  },
  container: {
    paddingTop: "10px",
  },
  container1: {
    padding: "60px 0 50px",
    margin: "0 auto",
    width: "95%",
  },

  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
  },
  title: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: blue[900],
    fontSize: "30px",
  },
}))

export const MovementPage: React.FC = () => {
  const classes = useStyles()
  return (
    //<MovementsTable />
    //<MovementsEmpBar />
    <div className={classes.container1}>
      <Grid container spacing={3} className={classes.container}>
        <Grid item xs={12}>
          <Typography className={classes.title} variant="h3">
            Перемещения сотрудников
          </Typography>
        </Grid>
       
        <Grid item xs={12} sm={6}>
          <Grid container direction="column" spacing={3}>

            <Grid item xs={12} sm={12}>

              <Card className={classes.paper}>
                <EmpsTable />
              </Card>
            </Grid>
            <Grid item>
              <Card className={classes.paper}><MovementsEmpBar /></Card>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card className={classes.paper}>
            <MovementsTable />
          </Card>
        </Grid>
      </Grid>
    </div>
  )
}
