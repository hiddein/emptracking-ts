import { makeStyles, Theme, Typography } from "@material-ui/core"
import React, { useEffect } from "react"
import { useTypedSelector } from "../../hooks/useTypedSelector"
import { useDispatch } from "react-redux"
import ViolsIcon from "../../img/icons/icons8-bunch-of-keys-96.png"
import { blue } from "@material-ui/core/colors"
import { getAccessViolsByEmp } from "../../store/action-creators/accessViols"
import { Loader } from "../Loader"

const useStyles = makeStyles((theme: Theme) => ({
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
  setExportJSON: Function
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

  useEffect(() => {
    dispatch(getAccessViolsByEmp(startDate, endDate))
    props.setExportJSON(
      violsFiltered.length == 0 ? `0` : violsFiltered[0].count
    )
  }, [startDate, endDate, props.idEmp])

  return (
    <React.Fragment>
      {props.idEmp == "" ? (
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
              {violsFiltered.length == 0 ? `0` : violsFiltered[0].count}
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
