import { makeStyles, Theme, Typography } from "@material-ui/core"
import React, { useEffect } from "react"
import { useTypedSelector } from "../../../hooks/useTypedSelector"
import { useDispatch } from "react-redux"
import AccessViolsIcon from "../../../img/icons/icons8-bunch-of-keys-96.png"
import { blue } from "@material-ui/core/colors"
import { Loader } from "../../Loader"
import _ from "lodash"
import { getAccessViols } from "../../../store/action-creators/accessViols"

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

interface IViolsCount{
  setExportJSON: Function
}



export const AccessViolsCountCard: React.FC<IViolsCount> = (props:IViolsCount) => {
  const classes = useStyles()
  const accessViols = useTypedSelector((state) => state.viol.viols)
  const isLoading = useTypedSelector((state) => state.viol.loading)
  const dispatch = useDispatch()
  const startDate = useTypedSelector((state) => state.dates.startDate)
  const endDate = useTypedSelector((state) => state.dates.endDate)


  useEffect(() => {
    dispatch(getAccessViols(startDate, endDate))
    props.setExportJSON(accessViols.length)
  }, [startDate, endDate])

    


  return (
    <React.Fragment>
      {isLoading ? (
        <Loader size={40} height="150" />
      ) : (
        <div className={classes.cardBack}>
          <div className={classes.imgBack}>
            <img
              src={AccessViolsIcon}
              alt="Опоздания"
              className={classes.img}
            ></img>
          </div>
          <div className={classes.cardContent}>
            <Typography variant="h6" className={classes.cardContentCount}>
              {" "}
              {accessViols.length}{" "}
            </Typography>
            <Typography variant="h6" className={classes.cardContentLabel}>
              {" "}
              Нарушений доступа в помещения{" "}
            </Typography>
          </div>
        </div>
      )}
    </React.Fragment>
  )
}
