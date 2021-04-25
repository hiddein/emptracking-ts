import { Avatar, Button, makeStyles, Snackbar, Theme, Typography } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { useTypedSelector } from "../../../hooks/useTypedSelector"
import { useDispatch } from "react-redux"
import { getEmps } from "../../../store/action-creators/emps"
import { Loader } from "../../Loader"
import { blue, green, yellow } from "@material-ui/core/colors"
import { EditEmpWindow } from "./EditEmpWindow"

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme: Theme) => ({
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    marginRight: '30px'
  },
  titleEmpContainer: {
    display: 'flex',
    padding: '10px 15px',
    alignItems: 'center'
  },
  fioPlusDep: {
    textAlign:'left'
  },
  empInfoContainer: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left',
    paddingLeft: '10px',
    border: '1px solid',
    borderRadius: '5px'

  },
  empInfoItem: {
    fontSize: '15px'

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

  },
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between'
  }
}))

interface propsEmpCard {
  idEmp: string
}

export const EmpCard: React.FC<propsEmpCard> = (props: propsEmpCard) => {
  const classes = useStyles()
  const [openSnack, setOpenSnack] = React.useState(false);
  const emps = useTypedSelector((state) => state.emp.emps)
  const isLoading = useTypedSelector((state) => state.emp.loading)
  const dispatch = useDispatch()
  const selectedEmp = emps.filter((item) => item.id_emp == props.idEmp)
  const [windowOpen, setWindowOpen] = React.useState(false)

  const handleCloseSnack = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnack(false);
  };

  useEffect(() => {
    dispatch(getEmps())
  }, [])

  return (
    <div style={{ height: 310, width: "100%" }}>
      
      {props.idEmp == '' ? (
          <div className={classes.noEmpContainer}>
            <Typography variant="h4">Выберите сотрудника</Typography>
          </div>
        ) : isLoading ? (
          <Loader size={60} height="290px" />
        ) : (
        <React.Fragment>
          <div className={classes.headerContainer} >
      <Typography variant="h5">Карточка сотрудника</Typography>
      <EditEmpWindow windowOpen={windowOpen} setWindowOpen={setWindowOpen}  selectedEmp={selectedEmp} setOpenSnack={setOpenSnack}/>
      <Button className={classes.openEditButton} onClick={()=> setWindowOpen(true)}>Редактировать</Button>
      </div>
        <div className={classes.titleEmpContainer}>
          <Avatar alt="Remy Sharp" src={`http://localhost:7000/${selectedEmp[0].photo_emp}`} className={classes.large} />
          <div className={classes.fioPlusDep}>
          <Typography variant="h6">{`${selectedEmp[0].last_name} ${selectedEmp[0].first_name} ${selectedEmp[0].middle_name}`}</Typography>
          <Typography variant="h6">{selectedEmp[0].name_dep}</Typography>
          </div>
          </div>
          <div className={classes.empInfoContainer}>
          <Typography variant="h6" className={classes.empInfoItem}>Дата рождения:   {selectedEmp[0].db_emp}</Typography>
          <Typography variant="h6" className={classes.empInfoItem}>E-mail:   {selectedEmp[0].email_emp}</Typography>
          <Typography variant="h6" className={classes.empInfoItem}>Номер телефона:   {selectedEmp[0].tel_emp}</Typography>
          <Typography variant="h6" className={classes.empInfoItem}>Время начала рабочего дня:   {selectedEmp[0].start_time}</Typography>
          <Typography variant="h6" className={classes.empInfoItem}>Время конца рабочего дня:   {selectedEmp[0].end_time}</Typography>
          <Typography variant="h6" className={classes.empInfoItem}>Время на обед:   {selectedEmp[0].lunch_time}</Typography>
          <Typography variant="h6" className={classes.empInfoItem}>Время на чай   (свободное время): {selectedEmp[0].tea_time}</Typography>
          </div>
          <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleCloseSnack}>
        <Alert onClose={handleCloseSnack} severity="success">
          Обновление произошло успешно
        </Alert>
      </Snackbar>
          </React.Fragment>
      )}
    </div>
  )
}
