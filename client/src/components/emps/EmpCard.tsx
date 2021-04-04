import { Avatar, makeStyles, Theme, Typography } from "@material-ui/core"
import React, { useEffect, useState } from "react"

import { useTypedSelector } from "../../hooks/useTypedSelector"
import { useDispatch } from "react-redux"
import { getEmps } from "../../store/action-creators/emps"

const useStyles = makeStyles((theme: Theme) => ({
  large: {
    width: theme.spacing(14),
    height: theme.spacing(14),
  },
}))

interface propsEmpCard {
  idEmp: string
}


export const EmpCard: React.FC<propsEmpCard> = (props: propsEmpCard) => {
  const classes = useStyles()
  const emps = useTypedSelector(state => state.emp.emps)
  const isLoading = useTypedSelector(state => state.emp.loading)
  const dispatch = useDispatch()
  const selectedEmp = emps.filter((item) => item.id_emp == props.idEmp)

  useEffect(() => {
    dispatch(getEmps())
   }, [])


  return (

    <div style={{ height: 310, width: "100%" }}>
     <Typography variant="h6">Карточка сотрудника</Typography>
     {selectedEmp.length != 0 ? (<Avatar alt="Remy Sharp" src={`http://localhost:7000/${selectedEmp[0].photo_emp}`} className={classes.large} />) :null}

    </div>
  )
}
