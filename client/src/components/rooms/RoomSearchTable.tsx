import { Button, makeStyles, Snackbar, Typography } from "@material-ui/core"
import React, { useState,useEffect } from "react"
import {
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridFilterToolbarButton,
  GridToolbarExport,
} from "@material-ui/data-grid"
import { rusLocale } from "../../rusLocale/ruslocale"
import { blue, green } from "@material-ui/core/colors"
import { useTypedSelector } from "../../hooks/useTypedSelector"
import { Loader } from "../Loader"
import { useDispatch } from "react-redux"
import { getRooms } from "../../store/action-creators/rooms"
import { NewRoomWindow } from "./NewRoomWindow"
import AddIcon from '@material-ui/icons/Add';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';


function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(() => ({
  toolBarContainer: {
    display: "flex",
    justifyContent: "space-between",
    margin: "6px",
  },
  footerContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  toolBarItem: {
    display: "flex",
  },
  footerEmp: {
    marginLeft: 10,
    backgroundColor: blue[200],
  },
  toolBarOption: {
    paddingRight: "10px",
  },
  addButton: {
    color: green[300]
  },
}))

const CustomToolbar = (props: any) => {
  const classes = useStyles()
  return (
    <GridToolbarContainer className={classes.toolBarContainer}>
      <Typography variant="h6">Список помещений</Typography>
      <div className={classes.toolBarItem}>
      <div className={classes.toolBarOption}>
        <Button className={classes.addButton} onClick={() => props.setAddWindowOpen(true)}><AddIcon />{'  '}Помещение</Button>
        <NewRoomWindow windowOpen={props.addWindowOpen} setWindowOpen={props.setAddWindowOpen} setOpenSnack={props.setOpenSnack}/>
        </div>
        <div className={classes.toolBarOption}>
          <GridFilterToolbarButton />
        </div>
        <div className={classes.toolBarOption}>
          <GridToolbarExport />
        </div>
      </div>
    </GridToolbarContainer>
  )
}
interface propsTable {
  SetselectedRoom: Function,
  height: number
  
}

export const RoomSearchTable: React.FC<propsTable> = (props:propsTable) => {
  const [openSnack, setOpenSnack] = React.useState(false);
  const [addWindowOpen, setAddWindowOpen] = React.useState(false)
  const rooms = useTypedSelector(state => state.room.rooms)
  const isLoading = useTypedSelector(state => state.room.loading)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getRooms())
   }, [])

   const handleCloseSnack = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnack(false);
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 0.2, type: "string"},
    { field: "roomName", headerName: "Название помещения", flex: 1, type: "string"},
    { field: "roomAbout", headerName: "Описание помещения", flex: 1, type: "string" },
  ]

  interface Room {
    id: number
    roomName: string
    roomAbout: string

  }

  const rows: Room[] = []
  rooms.map((room:any) => rows.push({id: room.id_room, roomName: room.name_room, roomAbout: room.about_room}))


  return (
    <div style={{ height: props.height, width: "100%" }}>
       {isLoading? <Loader size={60}/> :<DataGrid
        rows={rows}
        columns={columns}
        pageSize={6}
        rowHeight={25}
        disableColumnSelector={true}
        disableColumnMenu={true}
        localeText={rusLocale}
        onRowSelected={(param: any) => {
          props.SetselectedRoom(param.data.roomName)
        }}
        components={{
          Toolbar: CustomToolbar,
        }}
        componentsProps={{
          toolbar: {
            addWindowOpen,
            setAddWindowOpen,
            setOpenSnack
          }
        }}
        hideFooterSelectedRowCount={true}
      />}
      <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleCloseSnack}>
        <Alert onClose={handleCloseSnack} severity="success">
          Помещение добавлено
        </Alert>
      </Snackbar>
    </div>
  )
}
