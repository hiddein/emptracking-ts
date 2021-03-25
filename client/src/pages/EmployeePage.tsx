import {
  Button,
  Card,
  Grid,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from "@material-ui/core"
import { blue } from "@material-ui/core/colors"
import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { EmpCard } from "../components/emps/EmpCard"
import { GetEmpAccessTable } from "../components/emps/GetEmpAccessTable"
import { MostVisitedChart } from "../components/emps/MostVisitedChart"
import { SearchEmpsTable } from "../components/emps/SearchEmpsTable"
import { useTypedSelector } from "../hooks/useTypedSelector"
import { getEmps } from "../store/action-creators/emps"

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
    marginRight: '0'

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
  selectedEmpContainer: {
    padding: 5,
    backgroundColor: blue[300],
    display: "flex",
    justifyContent: "space-between",
  },
  selectedEmpButton: {
    padding: 5,
    color: blue[900],
  },
  selectedEmpLabel: {
    paddingLeft: "10px",
    display: "flex",
    alignItems: "center",
  },
  selectedEmp: {
    color: blue[800],
    paddingRight: "10px",
    fontSize: "20px",
  },
}))

export const EmployeePage: React.FC = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getEmps())
  }, [])
  return (
    //<MovementsTable />
    //<MovementsEmpBar />
    <div className={classes.container1}>
      <Grid container spacing={2} className={classes.container}>
        {/* Заголовок страницы */}
        <Grid item xs={12}>
          <Typography className={classes.title} variant="h3">
            Cотрудники предприятия
          </Typography>
        </Grid>
        {/* Сетка дэшборда */}

        <Grid item xs={12} md={6}>
          <Card className={classes.paper}>
            <SearchEmpsTable />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card className={classes.paper}>
            <EmpCard />
          </Card>
        </Grid>
        <Grid item  xs={12} md={6}>
          <Grid container spacing={2}>
            <Grid item container spacing={2} xs={12} md={6} direction="column">
              <Grid item xs={12} md={12}>
                <Card className={classes.papepSmallCard}>1</Card>
              </Grid>
              <Grid item xs={12} md={12}>
                <Card className={classes.papepSmallCard}>2</Card>
              </Grid>
            </Grid>
            <Grid item container  xs={12} md={6} direction="column">
              <Grid item xs={12} md={12}>
                <Card className={classes.papepBigCard}><MostVisitedChart /></Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card className={classes.paper}>
            <GetEmpAccessTable />
          </Card>
        </Grid>
      </Grid>
    </div>
  )
}
