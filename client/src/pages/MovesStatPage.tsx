import React, { useState } from "react"
import {
  Button,
  ButtonGroup,
  Card,
  Grid,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from "@material-ui/core"
import { blue } from "@material-ui/core/colors"
import { RangePicker } from "../components/RangePicker"

import { CountVisitsByEmpsDepChart } from "../components/movements/stat/byEmp/CountVisitsByEmpsDepChart"
import { CountVisitsByDepChart } from "../components/movements/stat/byDep/CountVisitsByDepChart"
import { CountVisitsByEmpPerRangeChart } from "../components/movements/stat/byEmp/CountVisitsByEmpPerRangeChart"
import { CountVisitsByEmpChart } from "../components/movements/stat/byDep/CountVisitsByEmpChart"
import { StatTable } from "../components/movements/stat/StatTable"

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
  titleContainer: {
    display: "flex",
    justifyContent: "space-between",
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
    fontSize: "25px",
    display: "flex",
    alignItems: "center",
  },
  datePickerContainer: {
    padding: "5px 20px",
    display: "flex",
    flexWrap: "nowrap",
  },
  buttons: {
    padding: "5px 20px",
  },
  buttonsGroup: {
    backgroundColor: blue[200],
  },
}))

export const MovesStatPage: React.FC = () => {
  const classes = useStyles()
  const [empsSelected, SetEmpsSelected] = useState(true)
  const [roomsSelected, SetRoomsSelected] = useState(false)

  const handleSelected = () => {
    SetRoomsSelected(!roomsSelected)
    SetEmpsSelected(!empsSelected)
  }

  return (
    <div className={classes.container1}>
      <Grid container spacing={2} className={classes.container}>
        <Grid item xs={12} className={classes.titleContainer}>
          <Typography className={classes.title} variant="h3">
            Статистика посещений помещений
          </Typography>

          <Card className={classes.datePickerContainer}>
            <div className={classes.buttons}>
              <ButtonGroup color="primary" className={classes.buttonsGroup}>
                <Button
                  onClick={() => {
                    handleSelected()
                  }}
                  disabled={empsSelected}
                >
                  По сотрудникам
                </Button>
                <Button
                  onClick={() => {
                    handleSelected()
                  }}
                  disabled={roomsSelected}
                >
                  По помещениям
                </Button>
              </ButtonGroup>
            </div>
            <RangePicker />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
              <Card className={classes.paper}><StatTable /></Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Grid container direction="column" spacing={2}>
                <Grid item xs={12} md={12}>
                  <Card className={classes.paper}>{empsSelected? <CountVisitsByEmpsDepChart />: <CountVisitsByDepChart />} </Card>
                </Grid>
                <Grid item xs={12} md={12}>
                  <Card className={classes.paper1}>{empsSelected? <CountVisitsByEmpPerRangeChart />: <CountVisitsByEmpChart />}</Card>
                </Grid>
              </Grid>
            </Grid>
      </Grid>
    </div>
  )
}
