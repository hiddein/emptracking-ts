import { makeStyles, Theme, Typography } from "@material-ui/core"
import React, { useEffect } from "react"
import { useTypedSelector } from "../../../hooks/useTypedSelector"
import { useDispatch } from "react-redux"
import { getLatenessByEmp } from "../../../store/action-creators/lateness"
import LatenessIcon from "../../../img/icons/icons8-employee-96.png"
import { blue } from "@material-ui/core/colors"
import { Loader } from "../../Loader"
import _ from "lodash"

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
    justifyContent: "start",
    textAlign: "left",
    color: blue[900],
  },
  cardContentLabel: {
    fontSize: "12px",
  },
  cardContentLabelDep: {
    fontSize: "12px",
    alignSelf: "left",
    color: blue[700],
    marginBottom: "5px",
  },
  cardContentCount: {
    fontSize: "12px",
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

interface ITopLateness {
  setExportJSON: Function
}

export const TopLatenessCard: React.FC<ITopLateness> = (
  props: ITopLateness
) => {
  const classes = useStyles()
  const lateness = useTypedSelector((state) => state.lateness.latenessByEmp)
  const isLoading = useTypedSelector((state) => state.lateness.loadingByEmp)
  const dispatch = useDispatch()
  const startDate = useTypedSelector((state) => state.dates.startDate)
  const endDate = useTypedSelector((state) => state.dates.endDate)

  useEffect(() => {
    dispatch(getLatenessByEmp(startDate, endDate))
    props.setExportJSON({
      nameEmp:
        latenessSortedFiltered.length != 0
          ? `${latenessSortedFiltered[0].last_name} ${latenessSortedFiltered[0].first_name} ${latenessSortedFiltered[0].middle_name}`
          : null,
      depEmp:
        latenessSortedFiltered.length != 0
          ? latenessSortedFiltered[0].name_dep
          : null,
      countLateness:
        latenessSortedFiltered.length != 0
          ? latenessSortedFiltered[0].count_lateness
          : null,
    })
  }, [startDate, endDate])

  const latenessSorted = _.sortBy(lateness, "count_lateness")

  const latenessSortedFiltered = latenessSorted.reverse()

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
            <Typography variant="h6" className={classes.cardContentLabel}>
              {latenessSortedFiltered.length != 0
                ? `${latenessSortedFiltered[0].last_name} ${latenessSortedFiltered[0].first_name} ${latenessSortedFiltered[0].middle_name}`
                : null}
            </Typography>
            <Typography variant="h6" className={classes.cardContentLabelDep}>
              {latenessSortedFiltered.length != 0
                ? latenessSortedFiltered[0].name_dep
                : null}
            </Typography>
            <Typography variant="h6" className={classes.cardContentCount}>
              Наибольшее количество опозданий -
              {latenessSortedFiltered.length != 0
                ? ` ${latenessSortedFiltered[0].count_lateness}`
                : null}
            </Typography>
          </div>
        </div>
      )}
    </React.Fragment>
  )
}
