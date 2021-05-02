import { Button, Card, Grid, makeStyles, Snackbar, Theme, Tooltip, Typography } from "@material-ui/core"
import { blue, green } from "@material-ui/core/colors"
import React, { useState } from "react"
import { RangePicker } from "../components/RangePicker"
import { CountVisitsChart } from "../components/rooms/CountVisitsChart"
import { EmpsWithAccessTable } from "../components/rooms/access/EmpsWithAccessTable"
import { RoomSearchTable } from "../components/rooms/RoomSearchTable"
import { NewRoomWindow } from "./../components/rooms/NewRoomWindow"
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert"
import { useTypedSelector } from "../hooks/useTypedSelector"
import SaveIcon from "@material-ui/icons/Save"
import { EditRoomWindow } from "../components/rooms/EditRoomWindow"

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
  },
  container: {
    paddingTop: "10px",
  },
  containerCards: {
    margin: 0,
    padding: 0,
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
  papepSmallCard: {
    padding: theme.spacing(2),
    textAlign: "center",
    height: "145px",
  },
  papepBigCard: {
    textAlign: "center",
    height: "370px",
    marginRight: "-16px",
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
  titleContainer: {
    display: "flex",
    justifyContent: "space-between",
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
  selectedNameRoom: {
    color: blue[900],
    paddingRight: "10px",
    fontSize: "20px",
  },
  newRoomButton: {
    padding: 10,
    color: blue[800],
    backgroundColor: green[200],
    margin: "0 20px 0 5px",
  },
  editButton: {
    marginRight: "10px",
    padding: 5,
    color: blue[50],
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
  roomAccess: object
  roomsVis: object
}

export const RoomInfoPage: React.FC = () => {
  const classes = useStyles()
  const startDate = useTypedSelector((state) => state.dates.startDate)
  const endDate = useTypedSelector((state) => state.dates.endDate)
  const [selectedRoom, SetselectedRoom] = useState("")
  const [openSnack, setOpenSnack] = React.useState(false)
  const [addWindowOpen, setAddWindowOpen] = React.useState(false)
  const [roomAccessJSON, setRoomAccessJSON] = useState<object>({})
  const [roomsVisJSON, setRoomsVisJSON] = useState<object>({})
  const [editWindowOpen, setEditWindowOpen] = React.useState(false)

  let exportJSON: IExpObg = {
    startDate: startDate.toLocaleDateString(),
    endDate: endDate.toLocaleDateString(),
    roomAccess: roomAccessJSON,
    roomsVis: roomsVisJSON,
  }

  const handleCloseSnack = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return
    }
    setOpenSnack(false)
  }

  const fileToSave = new Blob([JSON.stringify(exportJSON)], {
    type: "application/json",
  })

  const onSaveButtonClickHandler = () => {
    saveAs(
      fileToSave,
      `roomData_${startDate.toLocaleDateString()}-${endDate.toLocaleDateString()}.json`
    )
  }

  return (
    <div className={classes.container1}>
      <Grid container spacing={2} className={classes.container}>
        <Grid item xs={12} className={classes.titleContainer}>
          <Typography className={classes.title} variant="h3">
            Помещения предприятия
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
            <Button
              className={classes.newRoomButton}
              onClick={() => setAddWindowOpen(true)}
            >
              Новое помещение
            </Button>
            <NewRoomWindow
              windowOpen={addWindowOpen}
              setWindowOpen={setAddWindowOpen}
              setOpenSnack={setOpenSnack}
            />
            <RangePicker />
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card className={classes.paper}>
            <RoomSearchTable
              SetselectedRoom={SetselectedRoom}
              height={340}
              editWindowOpen={editWindowOpen}
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card className={classes.paper}>
            {selectedRoom != "" ? (
              <div className={classes.selectedEmpContainer}>
                <div className={classes.selectedEmpLabel}>
                  <Typography
                    variant="subtitle2"
                    className={classes.selectedNameRoom}
                  >
                    {selectedRoom}
                  </Typography>
                </div>
                <EditRoomWindow
                  windowOpen={editWindowOpen}
                  setWindowOpen={setEditWindowOpen}
                  selectedRoom={selectedRoom}
                  setOpenSnack={setOpenSnack}
                />
                <div>
                  <Button
                    className={classes.editButton}
                    onClick={() => {
                      setEditWindowOpen(true)
                    }}
                  >
                    Редактировать
                  </Button>
                  <Button
                    className={classes.selectedEmpButton}
                    onClick={() => {
                      SetselectedRoom("")
                    }}
                  >
                    Отменить выбор
                  </Button>
                </div>
              </div>
            ) : null}
            <EmpsWithAccessTable
              nameRoom={selectedRoom}
              setExportJSON={setRoomAccessJSON}
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={12}>
          <Card className={classes.paper}>
            <CountVisitsChart setExportJSON={setRoomsVisJSON} />
          </Card>
        </Grid>
      </Grid>
      <Snackbar
        open={openSnack}
        autoHideDuration={6000}
        onClose={handleCloseSnack}
      >
        <Alert onClose={handleCloseSnack} severity="success">
          Список обновлен
        </Alert>
      </Snackbar>
    </div>
  )
}
