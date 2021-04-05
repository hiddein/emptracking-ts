import { Avatar, makeStyles, Theme, Typography } from "@material-ui/core"
import React, { useEffect, useState } from "react"

import { useTypedSelector } from "../../hooks/useTypedSelector"
import { useDispatch } from "react-redux"
import { getEmps } from "../../store/action-creators/emps"
import { getLatenessByEmp } from "../../store/action-creators/lateness"
import ViolsIcon from "../../img/icons/icons8-bunch-of-keys-96.png"
import { blue } from "@material-ui/core/colors"
import { getAccessViolsByEmp } from "../../store/action-creators/accessViols"
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

interface propsAccessViolsCard {
  idEmp: string
}

export const AccessViolsCard: React.FC<propsAccessViolsCard> = (
  props: propsAccessViolsCard
) => {
  const classes = useStyles()
  const viols = useTypedSelector((state) => state.viol.violsByEmp)
  const isLoading = useTypedSelector((state) => state.viol.loadingByEmp)
  const startDate = useTypedSelector((state) => state.dates.startDate)
  const endDate = useTypedSelector((state) => state.dates.endDate)
  const dispatch = useDispatch()
  const violsFiltered = viols.filter((item) => item.id_emp == props.idEmp)
  console.log(violsFiltered)

  useEffect(() => {
    dispatch(getAccessViolsByEmp(startDate, endDate))
  }, [startDate, endDate])

  return (
    <React.Fragment>
      {violsFiltered.length == 0 ? (
        <div className={classes.noEmpContainer}>
          <Typography variant="h6">Выберите сотрудника</Typography>
        </div>
      ) : isLoading ? (
        <Loader size={40} height="150" />
      ) : (
        <div className={classes.cardBack}>
          <div className={classes.imgBack}>
            <img
              src={ViolsIcon}
              alt="Нарушения доступа"
              className={classes.img}
            ></img>
          </div>
          <div className={classes.cardContent}>
            <Typography variant="h6" className={classes.cardContentCount}>
              {" "}
              {violsFiltered[0].count}{" "}
            </Typography>
            <Typography variant="h6" className={classes.cardContentLabel}>
              {" "}
              Нарушений доступа{" "}
            </Typography>
          </div>
        </div>
      )}
    </React.Fragment>
  )
}
