import {
  Button,
  Card,
  Grid,
  makeStyles,
  Paper,
  Snackbar,
  Theme,
  Typography,
} from "@material-ui/core"
import { blue, green } from "@material-ui/core/colors"
import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { AccessViolsCard } from "../components/emps/AccessViolsCard"
import { EmpCard } from "../components/emps/empCard/EmpCard"
import { GetEmpAccessTable } from "../components/emps/access/GetEmpAccessTable"
import { LatenessCard } from "../components/emps/LatenessCard"
import { MostVisitedChart } from "../components/emps/MostVisitedChart"
import { NewEmpWindow } from "../components/emps/NewEmpWindow"
import { SearchEmpsTable } from "../components/emps/SearchEmpsTable"
import { RangePicker } from "../components/RangePicker"
import { useTypedSelector } from "../hooks/useTypedSelector"
import { getEmps } from "../store/action-creators/emps"
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
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
    display: "flex",
    alignItems: "center",
  },
  selectedEmpContainer: {
    padding: 5,
    backgroundColor: blue[300],
    display: "flex",
    justifyContent: "space-between",
  },
  selectedEmpButton: {
    padding: 10,
    color: blue[800],
    backgroundColor: green[200],
    margin: '0 20px 0 5px'
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
  titleContainer: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  datePickerContainer:{
    padding: '5px 20px',
    display: 'flex',
    flexWrap: 'nowrap'
  },
  
}))

export const EmployeePage: React.FC = () => {
  const classes = useStyles()
  const [openSnack, setOpenSnack] = React.useState(false);
  const [selectedEmp, SetselectedEmp] = useState("")
  const [windowOpen, setWindowOpen] = React.useState(false)

  const handleClickOpen = () => {
    setWindowOpen(true);
  };

  const handleCloseSnack = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnack(false);
  };

  return (
    //<MovementsTable />
    //<MovementsEmpBar />
    <div className={classes.container1}>
      <Grid container spacing={2} className={classes.container}>
        {/* Заголовок страницы */}
        <Grid item xs={12} className={classes.titleContainer}>
          <Typography className={classes.title} variant="h3">
            Cотрудники предприятия
          </Typography>
          <Card className={classes.datePickerContainer}>
          <Button className={classes.selectedEmpButton} onClick={handleClickOpen}>Новый сотрудник</Button>
          <NewEmpWindow windowOpen={windowOpen} setWindowOpen={setWindowOpen} setOpenSnack={setOpenSnack} />
          <RangePicker />
          </Card>
        </Grid>
        {/* Сетка дэшборда */}

        <Grid item xs={12} md={6}>
          <Card className={classes.paper}>
          <SearchEmpsTable updateData={SetselectedEmp} height={310} />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card className={classes.paper}>
            <EmpCard idEmp={selectedEmp.split(' ')[0]}  />
          </Card>
        </Grid>
        <Grid item  xs={12} md={6}>
          <Grid container spacing={2}>
            <Grid item container spacing={2} xs={12} md={6} direction="column">
              <Grid item xs={12} md={12}>
                <Card className={classes.papepSmallCard}><LatenessCard idEmp={selectedEmp.split(' ')[0]} /></Card>
              </Grid>
              <Grid item xs={12} md={12}>
                <Card className={classes.papepSmallCard}><AccessViolsCard idEmp={selectedEmp.split(' ')[0]} /></Card>
              </Grid>
            </Grid>
            <Grid item container  xs={12} md={6} direction="column">
              <Grid item xs={12} md={12}>
                <Card className={classes.papepBigCard}><MostVisitedChart idEmp={selectedEmp.split(' ')[0]} /></Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card className={classes.paper}>
            <GetEmpAccessTable idEmp={selectedEmp.split(' ')[0]} />
          </Card>
        </Grid>
      </Grid>
      <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleCloseSnack}>
        <Alert onClose={handleCloseSnack} severity="success">
          Сотрудник успешно добавлен
        </Alert>
      </Snackbar>
    </div>
  )
}
