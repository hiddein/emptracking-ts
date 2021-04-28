import { Avatar, makeStyles, Theme, Typography } from "@material-ui/core"
import React, { useEffect, useState } from "react"

import { useTypedSelector } from "../../hooks/useTypedSelector"
import { useDispatch } from "react-redux"
import { getEmps } from "../../store/action-creators/emps"
import { getLatenessByEmp } from "../../store/action-creators/lateness"
import LatenessIcon from "../../img/icons/icons8-hurry-96.png"
import { blue } from "@material-ui/core/colors"
import { Loader } from "../Loader"

const useStyles = makeStyles((theme: Theme) => ({
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    marginRight: "30px",
  },
  img: {
    height: 60,
    padding: "0",
  },
  imgBack: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "80px",
    width: "80px",
    backgroundColor: blue[100],
    borderRadius: "50px",
    marginRight: "25px",
  },
  cardBack: {
    display: "flex",
    alignItems: "center",
    justifyContent: "start",
    height: "100%",
    padding: "0 10px",
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "start",
    textAlign: "left",
    color: blue[900],
  },
  cardContentLabel: {
    fontSize: "18px",
  },
  cardContentCount: {
    fontSize: "40px",
    alignSelf: "start",
  },
  noEmpContainer: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "10px",
  },
}))

interface propsLatenessCard {
  idEmp: string
  setExportJSON: Function
}

export const LatenessCard: React.FC<propsLatenessCard> = (
  props: propsLatenessCard
) => {
  const classes = useStyles()
  const lateness = useTypedSelector((state) => state.lateness.latenessByEmp)
  const isLoading = useTypedSelector((state) => state.lateness.loadingByEmp)
  const dispatch = useDispatch()
  const startDate = useTypedSelector((state) => state.dates.startDate)
  const endDate = useTypedSelector((state) => state.dates.endDate)
  const latenessFiltered = lateness.filter((item) => item.id_emp == props.idEmp)

  useEffect(() => {
    dispatch(getLatenessByEmp(startDate, endDate))
    props.setExportJSON(latenessFiltered.length == 0 ? '0' : latenessFiltered[0].count_lateness)

  }, [startDate, endDate,props.idEmp])

  return (
    <React.Fragment>
      {props.idEmp == ''  ? (
        <div className={classes.noEmpContainer}>
          <Typography variant="h6">Выберите сотрудника</Typography>
        </div>
      ) : isLoading ? (
        <Loader size={40} height="150" />
      ) : (
        <div className={classes.cardBack}>
          <div className={classes.imgBack}>
            <img
              src={LatenessIcon}
              alt="Опоздания"
              className={classes.img}
            ></img>
          </div>
          <div className={classes.cardContent}>
            <Typography variant="h6" className={classes.cardContentCount}>
              {" "}
              {latenessFiltered.length == 0 ? '0' : latenessFiltered[0].count_lateness}{" "}
            </Typography>
            <Typography variant="h6" className={classes.cardContentLabel}>
              {" "}
              Опозданий{" "}
            </Typography>
          </div>
        </div>
      )}
    </React.Fragment>
  )
}
