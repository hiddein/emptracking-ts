import { makeStyles, Typography } from "@material-ui/core"
import React, { useState } from "react"
import {
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridFilterToolbarButton,
  GridFooterContainer,
  GridPagination,
  GridBaseComponentProps,
  GridToolbarExport,
} from "@material-ui/data-grid"
import { rusLocale } from "../../rusLocale/ruslocale"
import { blue } from "@material-ui/core/colors"
import { useTypedSelector } from "../../hooks/useTypedSelector"

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
}))

const CustomToolbar = () => {
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


export const RoomSearchTable: React.FC = () => {
  const rooms = useTypedSelector(state => state.room.rooms)
  const isLoading = useTypedSelector(state => state.room.loading)

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 0.2, type: "string"},
    { field: "roomName", headerName: "Название помещения", flex: 1, type: "string"},
    { field: "roomAbout", headerName: "Описание помещения", flex: 1, type: "string" },
  

    // {
    //   field: 'fullName',
    //   headerName: 'Full name',
    //   description: 'This column has a value getter and is not sortable.',
    //   sortable: false,
    //   width: 160,
    //   valueGetter: (params: ValueGetterParams) =>
    //     `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`,
    // },
  ]

  interface Room {
    id: number
    roomName: string
    roomAbout: string

  }

  const rows: Room[] = []
  rooms.map((room:any) => rows.push({id: room.id_room, roomName: room.name_room, roomAbout: room.about_room}))


  return (
    <div style={{ height: 340, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={6}
        rowHeight={25}
        disableColumnSelector={true}
        disableColumnMenu={true}
        localeText={rusLocale}
        // onRowSelected={(param: any) => {
        //   props.updateData(param.data.empName)
        // }}
        components={{
          Toolbar: CustomToolbar,
        }}
        hideFooterSelectedRowCount={true}
      />
    </div>
  )
}
