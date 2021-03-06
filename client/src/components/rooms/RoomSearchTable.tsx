import { makeStyles, Typography } from "@material-ui/core"
import React, { useEffect } from "react"
import { DataGrid, GridColDef, GridToolbarContainer, GridFilterToolbarButton, GridToolbarExport,} from "@material-ui/data-grid"
import { rusLocale } from "../../rusLocale/ruslocale"
import { blue, green } from "@material-ui/core/colors"
import { useTypedSelector } from "../../hooks/useTypedSelector"
import { Loader } from "../Loader"
import { useDispatch } from "react-redux"
import { getOwns, getRooms } from "../../store/action-creators/rooms"

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
    color: green[300],
  },
}))

const CustomToolbar = (props: any) => {
  const classes = useStyles()
  return (
    <GridToolbarContainer className={classes.toolBarContainer}>
      <Typography variant="h6">Список помещений</Typography>
      <div className={classes.toolBarItem}>
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
  editWindowOpen?: boolean
  SetselectedRoom: Function
  height: number
}

interface newI {
  id_room: number
  name_room: string
  about_room: string
  deps: any[]
}

export const RoomSearchTable: React.FC<propsTable> = (props: propsTable) => {
  const rooms = useTypedSelector((state) => state.room.rooms)
  const owns = useTypedSelector((state) => state.room.owns)
  const isLoading = useTypedSelector((state) => state.room.loading)
  const dispatch = useDispatch()
  rooms.map((room) => {
    room.deps = []
  })

  useEffect(() => {
    dispatch(getRooms())
    dispatch(getOwns())
  }, [props.editWindowOpen])

  owns.map((own) => {
    rooms
      .filter((room) => room.id_room == own.id_room)
      .map((fitlred: newI) => {
        fitlred.deps.push(own.name_dep)
      })
  })

  console.log(rooms)

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 0.2, type: "string" },
    {
      field: "roomName",
      headerName: "Название помещения",
      flex: 0.6,
      type: "string",
    },
    {
      field: "roomAbout",
      headerName: "Описание помещения",
      flex: 0.7,
      type: "string",
    },
    {
      field: "deps",
      headerName: "Закреплен за отделами",
      flex: 0.5,
      type: "string",
    },
  ]

  interface Room {
    id: number
    roomName: string
    roomAbout: string
    deps: string
  }

  const rows: Room[] = []
  rooms.map((room: any) =>
    rows.push({
      id: room.id_room,
      roomName: room.name_room,
      roomAbout: room.about_room,
      deps: room.deps.join(", "),
    })
  )

  return (
    <div style={{ height: props.height, width: "100%" }}>
      {isLoading ? (
        <Loader size={60} />
      ) : (
        <DataGrid
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
          hideFooterSelectedRowCount={true}
        />
      )}
    </div>
  )
}
