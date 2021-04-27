import React, { useEffect, useState } from "react"
import {
  Card,
  Grid,
  makeStyles,
  Theme,
} from "@material-ui/core"
import { LateEmpsTable } from "./LateEmpsTable"
import { LateEmpsByDepChart } from "./LateEmpsByDepChart"
import { LateEmpsByEmpChart } from "./LateEmpsByEmpChart"


const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
  },
  paper1: {
    padding: theme.spacing(2),
    textAlign: "center",
    maxHeight: "351px",
  },
}))

interface propsLatenessGrid {
  setExportJSON: Function
}

export const LateEmpsGrid: React.FC<propsLatenessGrid> = (props: propsLatenessGrid) => {
  const classes = useStyles()
  const [selectedDepOnChart, SetselectedDepOnChart] = useState("")
  const [latenessTableJSON, setLatenessTableJSON] = useState<object>({})
  const [latenessByDepJSON, setLatenessByDepJSON] = useState<object>({})
  const [latenessByEmpsDepJSON, setLatenessByEmpsDepJSON] = useState<object>({})

  let exportJSON = {
    latenessTable: latenessTableJSON,
    latenessByDep: latenessByDepJSON,
    latenessByEmpsDep: latenessByEmpsDepJSON
  }

  useEffect(() => {
    props.setExportJSON(exportJSON)
   }, [latenessTableJSON,latenessByDepJSON,latenessByEmpsDepJSON])


  return (
    
          <React.Fragment>
            {" "}
            <Grid item xs={12} md={6}>
              <Card className={classes.paper}><LateEmpsTable setExportJSON={setLatenessTableJSON} /></Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Grid container direction="column" spacing={2}>
                <Grid item xs={12} md={12}>
                  <Card className={classes.paper}><LateEmpsByDepChart SetselectedDepOnChart={SetselectedDepOnChart} depName={selectedDepOnChart} setExportJSON={setLatenessByDepJSON} /></Card>
                </Grid>
                <Grid item xs={12} md={12}>
                  <Card className={classes.paper1}><LateEmpsByEmpChart depName={selectedDepOnChart} setExportJSON={setLatenessByEmpsDepJSON}/></Card>
                </Grid>
              </Grid>
            </Grid>{" "}
          </React.Fragment>
       
  )
}
