import { Avatar, makeStyles, Theme, Typography } from "@material-ui/core"
import React, { useEffect, useState } from "react"

import { useTypedSelector } from "../../hooks/useTypedSelector"
import { useDispatch } from "react-redux"
import { getEmps } from "../../store/action-creators/emps"
import { Loader } from "../Loader"

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
}))

interface propsEmpCard {
  idEmp: string
}

export const EmpCard: React.FC<propsEmpCard> = (props: propsEmpCard) => {
  const classes = useStyles()
  const emps = useTypedSelector((state) => state.emp.emps)
  const isLoading = useTypedSelector((state) => state.emp.loading)
  const dispatch = useDispatch()
  const selectedEmp = emps.filter((item) => item.id_emp == props.idEmp)

  useEffect(() => {
    dispatch(getEmps())
  }, [])

  return (
    <div style={{ height: 310, width: "100%" }}>
      <Typography variant="h5">Карточка сотрудника</Typography>
      {selectedEmp.length == 0 ? (
          <div className={classes.noEmpContainer}>
            <Typography variant="h4">Выберите сотрудника</Typography>
          </div>
        ) : isLoading ? (
          <Loader size={60} height="290px" />
        ) : (
        <React.Fragment>
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
          </React.Fragment>
      )}
    </div>
  )
}
