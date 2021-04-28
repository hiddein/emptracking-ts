import React, { useState } from "react"
import {
  Button,
  ButtonGroup,
  Card,
  Grid,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from "@material-ui/core"
import { blue } from "@material-ui/core/colors"
import { RangePicker } from "../components/RangePicker"
import { LateEmpsGrid } from "../components/violation/lateEmpsViolation/LateEmpsGrid"
import { WorkHoursGrid } from "../components/violation/workHoursViolation/WorkHoursGrid"
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
  titleContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
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
  datePickerContainer: {
    padding: "5px 20px",
    display: "flex",
    flexWrap: "nowrap",
  },
  buttons: {
    padding: "5px 20px",
  },
  buttonsGroup: {
    backgroundColor: blue[200],
  },
}))

interface IExpObg {
  startDate: string
  endDate:string
  lateness?: object
  workHours?: object
}

export const HoursViolationPage: React.FC = () => {
  const classes = useStyles()
  const startDate = useTypedSelector((state) => state.dates.startDate)
  const endDate = useTypedSelector((state) => state.dates.endDate)
  const [lateSelected, SetLateSelected] = useState(true)
  const [hoursSelected, SetHoursSelected] = useState(false)
  const [latenessJSON, setLatenessJSON] = useState<object>({})
  const [workHoursJSON, setWorkHoursJSON] = useState<object>({})

  let exportJSON: IExpObg = {
    startDate: startDate.toLocaleDateString(),
    endDate: endDate.toLocaleDateString(),
  }

  lateSelected
    ? (exportJSON.lateness = latenessJSON)
    : (exportJSON.workHours = workHoursJSON)

  var fileToSave = new Blob([JSON.stringify(exportJSON)], {
    type: "application/json",
  })

  const handleSelected = () => {
    SetHoursSelected(!hoursSelected)
    SetLateSelected(!lateSelected)
  }

  const onSaveButtonClickHandler = () =>
    saveAs(
      fileToSave,
      `hoursViolsData_${startDate.toLocaleDateString()}-${endDate.toLocaleDateString()}.json`
    )

  return (
    <div className={classes.container1}>
      <Grid container spacing={2} className={classes.container}>
        <Grid item xs={12} className={classes.titleContainer}>
          <Typography className={classes.title} variant="h3">
            Нарушения рабочего времени сотрудниками
          </Typography>

          <Card className={classes.datePickerContainer}>
            <Button onClick={onSaveButtonClickHandler}>
              <SaveIcon />
            </Button>
            <div className={classes.buttons}>
              <ButtonGroup color="primary" className={classes.buttonsGroup}>
                <Button
                  onClick={() => {
                    handleSelected()
                  }}
                  disabled={lateSelected}
                >
                  Опоздания
                </Button>
                <Button
                  onClick={() => {
                    handleSelected()
                  }}
                  disabled={hoursSelected}
                >
                  Рабочее время
                </Button>
              </ButtonGroup>
            </div>
            <RangePicker />
          </Card>
        </Grid>
        {lateSelected ? <LateEmpsGrid setExportJSON={setLatenessJSON} /> : <WorkHoursGrid setExportJSON={setWorkHoursJSON} />}
      </Grid>
    </div>
  )
}
