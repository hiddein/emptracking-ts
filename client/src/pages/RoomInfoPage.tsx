import {
  Button,
  Card,
  Grid,
  makeStyles,
  Paper,
  Snackbar,
  Theme,
  Typography,
} from "@material-ui/core"
import { blue, green } from "@material-ui/core/colors"
import React, { useState } from "react"
import { RangePicker } from "../components/RangePicker"
import { CountVisitsChart } from "../components/rooms/CountVisitsChart"
import { EmpsWithAccessTable } from "../components/rooms/access/EmpsWithAccessTable"
import { RoomSearchTable } from "../components/rooms/RoomSearchTable"
import { NewRoomWindow } from "./../components/rooms/NewRoomWindow"
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
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
    margin: '0 20px 0 5px'
  }
}))

export const RoomInfoPage: React.FC = () => {
  const classes = useStyles()
  const [selectedRoom, SetselectedRoom] = useState("")
  const [openSnack, setOpenSnack] = React.useState(false);
  const [addWindowOpen, setAddWindowOpen] = React.useState(false)

  const handleCloseSnack = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnack(false);
  };

  return (
    <div className={classes.container1}>
      <Grid container spacing={2} className={classes.container}>
        <Grid item xs={12} className={classes.titleContainer}>
          <Typography className={classes.title} variant="h3">
            Помещения предприятия
          </Typography>
          <Card className={classes.datePickerContainer}>
          <Button className={classes.newRoomButton} onClick={()=> setAddWindowOpen(true)}>Новое помещение</Button>
          <NewRoomWindow windowOpen={addWindowOpen} setWindowOpen={setAddWindowOpen} setOpenSnack={setOpenSnack} />
            <RangePicker />
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card className={classes.paper}>
            <RoomSearchTable SetselectedRoom={SetselectedRoom} height={340} />
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
                <Button
                  className={classes.selectedEmpButton}
                  onClick={() => {
                    SetselectedRoom("")
                  }}
                >
                  Отменить выбор
                </Button>
              </div>
            ) : null}
            <EmpsWithAccessTable nameRoom={selectedRoom} />
          </Card>
        </Grid>
        <Grid item xs={12} md={12}>
          <Card className={classes.paper}>
            <CountVisitsChart/>
          </Card>
        </Grid>
      </Grid>
      <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleCloseSnack}>
        <Alert onClose={handleCloseSnack} severity="success">
          Помещение добавлено
        </Alert>
      </Snackbar>
    </div>
  )
}
