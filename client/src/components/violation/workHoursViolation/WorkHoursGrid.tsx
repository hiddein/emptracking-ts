import React, { useEffect, useState } from "react"
import {
  Card,
  Grid,
  makeStyles,
  Theme,
} from "@material-ui/core"
import { WorkHoursTable } from "./WorkHoursTable"
import { WorkHoursByDepChart } from "./WorkHoursByDepChart"
import { WorkHoursByEmpChart } from "./WorkHoursByEmpChart"


const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
  },
  paper2: {
    padding: theme.spacing(2),
    textAlign: "center",
    height: "326px",
  },
}))

interface propsWorkHoursGrid {
  setExportJSON: Function
}

export const WorkHoursGrid: React.FC<propsWorkHoursGrid> = (props: propsWorkHoursGrid) => {
  const classes = useStyles()
  const [selectedDepOnChart, SetselectedDepOnChart] = useState("")
  const [workHoursViolsTableJSON, setWorkHoursViolsTableJSON] = useState<object>({})
  const [workHoursViolsByDepJSON, setWorkHoursViolsByDepJSON] = useState<object>({})
  const [workHoursViolsByEmpsDepJSON, setWorkHoursViolsByEmpsDepJSON] = useState<object>({})

  let exportJSON = {
    workHoursViolsTable: workHoursViolsTableJSON,
    workHoursViolsByDep: workHoursViolsByDepJSON,
    workHoursViolsEmpsDep: workHoursViolsByEmpsDepJSON
  }

  useEffect(() => {
    props.setExportJSON(exportJSON)
   }, [workHoursViolsTableJSON, workHoursViolsByDepJSON, workHoursViolsByEmpsDepJSON])


  return (
    
    <React.Fragment>
    <Grid item xs={12} md={6}>
      <Grid container direction="column" spacing={2}>
        <Grid item xs={12} md={12}>
          <Card className={classes.paper2}><WorkHoursByDepChart SetselectedDepOnChart={SetselectedDepOnChart} depName={selectedDepOnChart} setExportJSON={setWorkHoursViolsByDepJSON} /></Card>
        </Grid>
        <Grid item xs={12} md={12}>
          <Card className={classes.paper2}><WorkHoursByEmpChart depName={selectedDepOnChart} setExportJSON={setWorkHoursViolsByEmpsDepJSON} /></Card>
        </Grid>
      </Grid>
    </Grid>
    <Grid item xs={12} md={6}>
      <Card className={classes.paper}><WorkHoursTable setExportJSON={setWorkHoursViolsTableJSON}/></Card>
    </Grid>
  </React.Fragment>
  )
}
