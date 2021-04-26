import { Avatar, makeStyles, Theme, Typography } from "@material-ui/core"
import React, { useEffect, useState } from "react"

import { useTypedSelector } from "../../../hooks/useTypedSelector"
import { useDispatch } from "react-redux"
import { getLateness } from "../../../store/action-creators/lateness"
import LatenessIcon from "../../../img/icons/icons8-hurry-96.png"
import { blue } from "@material-ui/core/colors"
import { Loader } from "../../Loader"
import _ from "lodash"

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
    justifyContent: "start",
    textAlign: "left",
    color: blue[900],
  },
  cardContentLabel: {
    fontSize: "15px",
  },
  cardContentLabelDep: {
    fontSize: "12px",
    alignSelf: 'left',
    color: blue[700],
    marginBottom: '5px'
  },
  cardContentCount: {
    fontSize: "25px",
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

interface ILatenessCount{
  setExportJSON: Function
}

export const LatenessCountCard: React.FC<ILatenessCount> = (props:ILatenessCount) => {
  const classes = useStyles()
  const lateness = useTypedSelector((state) => state.lateness.lateness)
  const isLoading = useTypedSelector((state) => state.lateness.loading)
  const dispatch = useDispatch()
  const startDate = useTypedSelector((state) => state.dates.startDate)
  const endDate = useTypedSelector((state) => state.dates.endDate)

  useEffect(() => {
    dispatch(getLateness(startDate, endDate))
    props.setExportJSON(lateness.length)
  }, [startDate, endDate])


  return (
    <React.Fragment>
      {isLoading ? (
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
              {lateness.length}{" "}
            </Typography>
            <Typography variant="h6" className={classes.cardContentLabel}>
              {" "}
              Опозданий на работу{" "}
            </Typography>
          </div>
        </div>
      )}
    </React.Fragment>
  )
}
