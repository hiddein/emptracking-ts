import { Avatar, Button, makeStyles, Snackbar, Theme, Typography } from "@material-ui/core"
import React, { useEffect } from "react"
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert"
import { useTypedSelector } from "../../../hooks/useTypedSelector"
import { useDispatch } from "react-redux"
import { getEmps } from "../../../store/action-creators/emps"
import { Loader } from "../../Loader"
import { blue, green } from "@material-ui/core/colors"
import { EditEmpWindow } from "./EditEmpWindow"

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

const useStyles = makeStyles((theme: Theme) => ({
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    marginRight: "30px",
  },
  titleEmpContainer: {
    display: "flex",
    padding: "10px 15px",
    alignItems: "center",
  },
  fioPlusDep: {
    textAlign: "left",
  },
  empInfoContainer: {
    backgroundColor: blue[50],
    display: "flex",
    justifyContent: "start",
    textAlign: "left",
    paddingLeft: "10px",
    border: `1px solid ${blue[200]}`,
    borderRadius: "5px",
  },
  empInfoItem: {
    fontSize: "15px",
  },
  editButtonCont: {
    marginLeft: "auto",
    padding: "10px",
  },
  noEmpContainer: {
    height: "285px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "25px",
  },
  openEditButton: {
    color: blue[600],
    backgroundColor: green[100],
    marginRight: "10px",
    "&:hover": {
      backgroundColor: green[200],
    },
  },
  headerContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  cancelButton: {
    color: blue[600],
    backgroundColor: blue[100],
    marginRight: "10px",
    "&:hover": {
      backgroundColor: blue[200],
    },
  },
  valuesEmp: {
    marginLeft: "10px",
  },
}))

interface propsEmpCard {
  idEmp: string
  setSelectedEmp: Function
  setExportJSON: Function
}

export const EmpCard: React.FC<propsEmpCard> = (props: propsEmpCard) => {
  const classes = useStyles()
  const [openSnack, setOpenSnack] = React.useState(false)
  const emps = useTypedSelector((state) => state.emp.emps)
  const isLoading = useTypedSelector((state) => state.emp.loading)
  const dispatch = useDispatch()
  const selectedEmp = emps.filter((item) => item.id_emp == props.idEmp)
  const [windowOpen, setWindowOpen] = React.useState(false)

  const handleCloseSnack = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return
    }
    setOpenSnack(false)
  }

  useEffect(() => {
    props.idEmp != ""
      ? props.setExportJSON({
          lastName: selectedEmp[0].last_name,
          firstName: selectedEmp[0].first_name,
          middleName: selectedEmp[0].middle_name,
          empDep: selectedEmp[0].name_dep,
          photoEmp: selectedEmp[0].photo_emp,
          dbEmp: selectedEmp[0].db_emp,
          email: selectedEmp[0].email_emp,
          telEmp: selectedEmp[0].tel_emp,
          startTime: selectedEmp[0].start_time,
          endTime: selectedEmp[0].end_time,
          lunchTime: selectedEmp[0].lunch_time,
          teaTime: selectedEmp[0].tea_time,
        })
      : props.setExportJSON({})
  }, [props.idEmp])

  useEffect(() => {
    dispatch(getEmps())
  }, [])

  return (
    <div style={{ height: 310, width: "100%" }}>
      {props.idEmp == "" ? (
        <div className={classes.noEmpContainer}>
          <Typography variant="h4">Выберите сотрудника</Typography>
        </div>
      ) : isLoading ? (
        <Loader size={60} height="290px" />
      ) : (
        <React.Fragment>
          <div className={classes.headerContainer}>
            <Typography variant="h5">Карточка сотрудника</Typography>
            <EditEmpWindow
              windowOpen={windowOpen}
              setWindowOpen={setWindowOpen}
              selectedEmp={selectedEmp}
              setOpenSnack={setOpenSnack}
            />
            <div>
              <Button
                className={classes.cancelButton}
                onClick={() => props.setSelectedEmp("")}
              >
                Отменить выбор
              </Button>
            </div>
          </div>
          <div className={classes.titleEmpContainer}>
            <Avatar
              alt="Remy Sharp"
              src={`http://localhost:7000/${selectedEmp[0].photo_emp}`}
              className={classes.large}
            />
            <div className={classes.fioPlusDep}>
              <Typography variant="h6">{`${selectedEmp[0].last_name} ${selectedEmp[0].first_name} ${selectedEmp[0].middle_name}`}</Typography>
              <Typography variant="h6">{selectedEmp[0].name_dep}</Typography>
            </div>
          </div>
          <div className={classes.empInfoContainer}>
            <div>
              <Typography variant="h6" className={classes.empInfoItem}>
                Дата рождения:{" "}
              </Typography>
              <Typography variant="h6" className={classes.empInfoItem}>
                E-mail:
              </Typography>
              <Typography variant="h6" className={classes.empInfoItem}>
                Номер телефона:{" "}
              </Typography>
              <Typography variant="h6" className={classes.empInfoItem}>
                Начало рабочего дня:{" "}
              </Typography>
              <Typography variant="h6" className={classes.empInfoItem}>
                Конец рабочего дня:
              </Typography>
              <Typography variant="h6" className={classes.empInfoItem}>
                Время на обед:
              </Typography>
              <Typography variant="h6" className={classes.empInfoItem}>
                Свободное время:
              </Typography>
            </div>
            <div className={classes.valuesEmp}>
              <Typography variant="h6" className={classes.empInfoItem}>
                {selectedEmp[0].db_emp}
              </Typography>
              <Typography variant="h6" className={classes.empInfoItem}>
                {selectedEmp[0].email_emp}
              </Typography>
              <Typography variant="h6" className={classes.empInfoItem}>
                {selectedEmp[0].tel_emp}
              </Typography>
              <Typography variant="h6" className={classes.empInfoItem}>
                {selectedEmp[0].start_time}
              </Typography>
              <Typography variant="h6" className={classes.empInfoItem}>
                {selectedEmp[0].end_time}
              </Typography>
              <Typography variant="h6" className={classes.empInfoItem}>
                {selectedEmp[0].lunch_time}
              </Typography>
              <Typography variant="h6" className={classes.empInfoItem}>
                {selectedEmp[0].tea_time}
              </Typography>
            </div>
            <div className={classes.editButtonCont}>
              <Button
                className={classes.openEditButton}
                onClick={() => setWindowOpen(true)}
              >
                Редактировать
              </Button>
            </div>
          </div>

          <Snackbar
            open={openSnack}
            autoHideDuration={6000}
            onClose={handleCloseSnack}
          >
            <Alert onClose={handleCloseSnack} severity="success">
              Обновление произошло успешно
            </Alert>
          </Snackbar>
        </React.Fragment>
      )}
    </div>
  )
}
