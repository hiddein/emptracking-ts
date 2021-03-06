import { Button, Card, Grid, makeStyles, Theme, Tooltip, Typography } from "@material-ui/core"
import { blue } from "@material-ui/core/colors"
import React, { useState } from "react"
import { SearchEmpsTable } from "../components/emps/SearchEmpsTable"
import { MovementsEmpBar } from "../components/movements/MovementsEmpChart"
import { MovementsTable } from "../components/movements/MovementsTable"
import { RangePicker } from "../components/RangePicker"
import { saveAs } from "file-saver"
import SaveIcon from "@material-ui/icons/Save"
import { useTypedSelector } from "../hooks/useTypedSelector"

const useStyles = makeStyles((theme: Theme) => ({
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
  selectedEmpContainer: {
    padding: 5,
    backgroundColor: blue[300],
    display: "flex",
    justifyContent: "space-between",
  },
  selectedEmpButton: {
    padding: 5,
    color: blue[900],
  },
  selectedEmpLabel: {
    paddingLeft: "10px",
    display: "flex",
    alignItems: "center",
  },
  selectedEmpFIO: {
    color: blue[900],
    paddingRight: "10px",
    fontSize: "20px",
  },
  titleContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  datePickerContainer: {
    padding: "5px 20px",
    display: "flex",
    flexWrap: "nowrap",
  },
  saveButton: {
    backgroundColor: blue[200],
    marginRight: "10px",
    "&:hover": {
      backgroundColor: blue[100],
    },
  },
}))
interface IExpObg {
  startDate: string
  endDate: string
  moves: object
  oneDayMoves: object
}

export const MovementPage: React.FC = () => {
  const classes = useStyles()
  const [selectedEmp, SetselectedEmp] = useState("")
  const [oneDayMovesExp, setOneDayMovesExp] = useState<object>({})
  const [movesExp, setMovesExp] = useState<object>({})
  const startDate = useTypedSelector((state) => state.dates.startDate)
  const endDate = useTypedSelector((state) => state.dates.endDate)

  const exportJSON: IExpObg = {
    startDate: startDate.toLocaleDateString(),
    endDate: endDate.toLocaleDateString(),
    moves: movesExp,
    oneDayMoves: oneDayMovesExp,
  }

  var fileToSave = new Blob([JSON.stringify(exportJSON)], {
    type: "application/json",
  })

  const onSaveButtonClickHandler = () =>
    saveAs(
      fileToSave,
      `movesData_${startDate.toLocaleDateString()}-${endDate.toLocaleDateString()}.json`
    )

  return (
    <div className={classes.container1}>
      <Grid container spacing={2} className={classes.container}>
        {/* Заголовок страницы */}
        <Grid item xs={12} className={classes.titleContainer}>
          <Typography className={classes.title} variant="h3">
            Перемещения сотрудников
          </Typography>
          <Card className={classes.datePickerContainer}>
            <Tooltip title="Сохранить в JSON" aria-label="add">
              <Button
                onClick={onSaveButtonClickHandler}
                className={classes.saveButton}
              >
                <SaveIcon />
              </Button>
            </Tooltip>
            <RangePicker />
          </Card>
        </Grid>
        {/* Сетка дэшборда */}
        <Grid item xs={12} md={6}>
          <Grid container direction="column" spacing={2}>
            <Grid item xs={12} md={12}>
              <Card className={classes.paper}>
                <SearchEmpsTable updateData={SetselectedEmp} height={300} />
              </Card>
            </Grid>
            <Grid item>
              <Card className={classes.paper1}>
                <MovementsEmpBar
                  idEmp={selectedEmp.split(" ")[0]}
                  setOneDayMovesExp={setOneDayMovesExp}
                />
              </Card>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card className={classes.paper}>
            {selectedEmp != "" ? (
              <div className={classes.selectedEmpContainer}>
                <div className={classes.selectedEmpLabel}>
                  <Typography
                    variant="subtitle2"
                    className={classes.selectedEmpFIO}
                  >
                    {`${selectedEmp.split(" ")[2]} ${
                      selectedEmp.split(" ")[3]
                    } ${selectedEmp.split(" ")[4]}`}
                  </Typography>
                </div>
                <Button
                  className={classes.selectedEmpButton}
                  onClick={() => {
                    SetselectedEmp("")
                  }}
                >
                  Отменить выбор
                </Button>
              </div>
            ) : null}

            <MovementsTable
              empId={selectedEmp.split(" ")[0]}
              setMovesExp={setMovesExp}
            />
          </Card>
        </Grid>
      </Grid>
    </div>
  )
}
