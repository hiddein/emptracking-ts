import React, { useEffect, useState } from "react"
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
import { useDispatch } from "react-redux"
import { CountVisitsByEmpsDepChart } from "../components/movements/stat/byEmp/CountVisitsByEmpsDepChart"
import { CountVisitsByDepChart } from "../components/movements/stat/byDep/CountVisitsByDepChart"
import { CountVisitsByEmpPerRangeChart } from "../components/movements/stat/byEmp/CountVisitsByEmpPerRangeChart"
import { CountVisitsByEmpChart } from "../components/movements/stat/byDep/CountVisitsByEmpChart"
import { StatTable } from "../components/movements/stat/StatTable"
import { SearchEmpsTable } from "../components/emps/SearchEmpsTable"
import { RoomSearchTable } from "../components/rooms/RoomSearchTable"
import { getEmps } from "../store/action-creators/emps"
import { getRooms } from "../store/action-creators/rooms"
import { getCountMovesInRange, getCountMovesInRangeDaySort, getCountMovesInRangeDepSort } from "../store/action-creators/stat"
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
}))

export const MovesStatPage: React.FC = () => {
  const classes = useStyles()
  const [empsSelected, SetEmpsSelected] = useState(true)
  const [roomsSelected, SetRoomsSelected] = useState(false)
  const [selectedEmp, SetselectedEmp] = useState("")
  const [selectedRoomOnChart, SetselectedRoomOnChart] = useState("")
  const [selectedDepOnChart, SetselectedDepOnChart] = useState("")
  const [selectedRoom, SetselectedRoom] = useState("")

  
  const handleSelected = () => {
    SetselectedEmp("")
    SetselectedRoom("")
    SetselectedRoomOnChart("")
    SetRoomsSelected(!roomsSelected)
    SetEmpsSelected(!empsSelected)
  }



  return (
    <div className={classes.container1}>
      <Grid container spacing={2} className={classes.container}>
        <Grid item xs={12} className={classes.titleContainer}>
          <Typography className={classes.title} variant="h3">
            Статистика посещений помещений
          </Typography>

          <Card className={classes.datePickerContainer}>
            <div className={classes.buttons}>
              <ButtonGroup color="primary" className={classes.buttonsGroup}>
                <Button
                  onClick={() => {
                    handleSelected()
                  }}
                  disabled={empsSelected}
                >
                  По сотрудникам
                </Button>
                <Button
                  onClick={() => {
                    handleSelected()
                  }}
                  disabled={roomsSelected}
                >
                  По помещениям
                </Button>
              </ButtonGroup>
            </div>
            <RangePicker />
          </Card>
        </Grid>

        <Grid  item xs={12} md={6}>
          <Card className={classes.paper}>
          {selectedEmp != "" ? (
              <div className={classes.selectedEmpContainer}>
                <div className={classes.selectedEmpLabel}>
                  <Typography
                    variant="subtitle2"
                    className={classes.selectedEmpFIO}
                  >
                  {`${selectedEmp.split(' ')[2]} ${selectedEmp.split(' ')[3]} ${selectedEmp.split(' ')[4]}`}
                  </Typography>
                </div>
                <Button
                  className={classes.selectedEmpButton}
                  onClick={() => {
                    SetselectedEmp("")
                    SetselectedRoomOnChart("")
                    SetselectedDepOnChart("")
                  }}
                >
                  Отменить выбор
                </Button>
              </div>
            ) : null}
            {selectedRoom != "" ?  (
              <div className={classes.selectedEmpContainer}>
                <div className={classes.selectedEmpLabel}>
                  <Typography
                    variant="subtitle2"
                    className={classes.selectedEmpFIO}
                  >
                  {selectedRoom}
                  </Typography>
                </div>
                <Button
                  className={classes.selectedEmpButton}
                  onClick={() => {
                    SetselectedRoom("")
                    SetselectedRoomOnChart("")
                    SetselectedDepOnChart("")
                  }}
                >
                  Отменить выбор
                </Button>
              </div>
            ) : null}

            <StatTable empId={selectedEmp.split(' ')[0]} nameRoom={selectedRoom}/>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card className={classes.paper}>
             {empsSelected ? (
              <SearchEmpsTable updateData={SetselectedEmp} height={310}  />
            ) : (
              <RoomSearchTable SetselectedRoom={SetselectedRoom} height={310} />
            )}
          
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card className={classes.paper}>
            {empsSelected ? (
              <CountVisitsByEmpsDepChart idEmp={selectedEmp.split(' ')[0]} SetselectedRoomOnChart={SetselectedRoomOnChart}  />
            ) : (
              <CountVisitsByDepChart nameRoom={selectedRoom} SetselectedDepOnChart={SetselectedDepOnChart} />
            )}
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card className={classes.paper1}>
            {empsSelected ? (
              <CountVisitsByEmpPerRangeChart idEmp={selectedEmp.split(' ')[0]}  selectedRoomOnChart={selectedRoomOnChart} />
            ) : (
              <CountVisitsByEmpChart nameDep={selectedDepOnChart} nameRoom={selectedRoom}/>
            )}
          </Card>
        </Grid>
      </Grid>
    </div>
  )
}
