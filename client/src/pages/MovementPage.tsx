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
import React, { useState } from "react"
import { EmpsTable } from "../components/movements/EmpsTable"
import { MovementsEmpBar } from "../components/movements/MovementsEmpChart"
import { MovementsTable } from "../components/movements/MovementsTable"

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

export const MovementPage: React.FC = () => {
  const classes = useStyles()
  const [selectedEmp, SetselectedEmp] = useState("")
  return (
    //<MovementsTable />
    //<MovementsEmpBar />
    <div className={classes.container1}>
      <Grid container spacing={2} className={classes.container}>
        {/* Заголовок страницы */}
        <Grid item xs={12}>
          <Typography className={classes.title} variant="h3">
            Перемещения сотрудников
          </Typography>
        </Grid>
        {/* Сетка дэшборда */}
        <Grid item xs={12} md={6}>
          <Grid container direction="column" spacing={2}>
            <Grid item xs={12} md={12}>
              <Card className={classes.paper}>
                <EmpsTable updateData={SetselectedEmp} />
              </Card>
            </Grid>
            <Grid item>
              <Card className={classes.paper1}>
                <MovementsEmpBar />
              </Card>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card className={classes.paper}>
            {selectedEmp != "" ? (
              <div className={classes.selectedEmpContainer}>
                <div className={classes.selectedEmpLabel}>
                  <Typography
                    variant="subtitle2"
                    className={classes.selectedEmp}
                  >
                    Выбран сотрудник:
                  </Typography>{" "}
                  {selectedEmp}
                </div>
                <Button
                  className={classes.selectedEmpButton}
                  onClick={() => {
                    SetselectedEmp("")
                  }}
                >
                  Отменить выбор
                </Button>
              </div>
            ) : null}

            <MovementsTable empSelected={selectedEmp ? true : false} />
          </Card>
        </Grid>
      </Grid>
    </div>
  )
}
