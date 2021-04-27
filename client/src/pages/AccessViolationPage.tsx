import {
  Button,
  Card,
  Grid,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from "@material-ui/core"
import { blue } from "@material-ui/core/colors"
import React, { useState } from "react"
import Chart from "react-apexcharts"
import { RangePicker } from "../components/RangePicker"
import { AccessViolationTable } from "../components/violation/accessViolation/AccessViolationTable"
import { ByEmpsAccessViolChart } from "../components/violation/accessViolation/ByEmpsAccessViolChart"
import { DepsAccessViolChart } from "../components/violation/accessViolation/DepsAccessViolChart"
import { EmpAccessViolChart } from "../components/violation/accessViolation/EmpAccessViolChart"
import SaveIcon from "@material-ui/icons/Save"
import { useTypedSelector } from "../hooks/useTypedSelector"


const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
  },
  container: {
    paddingTop: "10px",
  },
  container1: {
    padding: "70px 0 50px",
    margin: "0 auto",
    width: "95%",
  },

  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    height: "320px",
  },
  paper1: {
    padding: theme.spacing(2),
    textAlign: "center",
    maxHeight: "351px",
  },
  title: {
    padding: theme.spacing(0),
    textAlign: "center",
    color: blue[900],
    fontSize: "25px",
    display: "flex",
    alignItems: "center",
  },
  titleContainer: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  datePickerContainer:{
    padding: '5px 20px',
    display: 'flex',
    flexWrap: 'nowrap'
  }
}))

interface IExpObg {
  violsTableData: object
  chartByDep: object
  chartByEmps: object
  chartByEmp: object
}

export const AccessViolationPage: React.FC = () => {
  const classes = useStyles()
  const startDate = useTypedSelector((state) => state.dates.startDate)
  const endDate = useTypedSelector((state) => state.dates.endDate)
  const [selectedDep, SetselectedDep] = useState("")
  const [selectedEmp, SetselectedEmp] = useState("")
  const [chartByEmpJSON, setChartByEmpJSON] = useState<object>({})
  const [chartByEmpsJSON, setChartByEmpsJSON] = useState<object>({})
  const [chartByDepJSON, setChartByDepJSON] = useState<object>({})
  const [tableJSON, setTableJSON] = useState<object>({})

  let exportJSON: IExpObg = {
    violsTableData: tableJSON,
    chartByDep: chartByDepJSON,
    chartByEmps: chartByEmpsJSON,
    chartByEmp: chartByEmpJSON
  }

  var fileToSave = new Blob([JSON.stringify(exportJSON)], {
    type: "application/json",
  })

  const onSaveButtonClickHandler = () =>
    saveAs(
      fileToSave,
      `accessViolsData_${startDate.toLocaleDateString()}-${endDate.toLocaleDateString()}.json`
    )
    
  return (
    <div className={classes.container1}>
      <Grid container spacing={2} className={classes.container}>
        <Grid item xs={12} className={classes.titleContainer}>
          <Typography className={classes.title} variant="h3">
            Нарушения прав доступа в помещения
          </Typography>
          <Card className={classes.datePickerContainer}>
          <Button onClick={onSaveButtonClickHandler}>
              <SaveIcon />
            </Button>
          <RangePicker />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card className={classes.paper}><AccessViolationTable setExportJSON={setTableJSON}/></Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card className={classes.paper}><DepsAccessViolChart SetselectedDepOnChart={SetselectedDep} idEmp={selectedEmp} depName={selectedDep}  SetselectedEmpOnChart={SetselectedEmp} setExportJSON={setChartByDepJSON}/></Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card className={classes.paper}><EmpAccessViolChart idEmp={selectedEmp} setExportJSON={setChartByEmpJSON}/></Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card className={classes.paper}><ByEmpsAccessViolChart depName={selectedDep} SetselectedEmpOnChart={SetselectedEmp} setExportJSON={setChartByEmpsJSON}/></Card>
        </Grid>
        
      </Grid>

    </div>
  )
}
