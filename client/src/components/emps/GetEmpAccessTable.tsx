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
      <Typography variant="h6">Доступ в помещения</Typography>
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


export const GetEmpAccessTable: React.FC = () => {

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 0.2, type: "string" },
    {
      field: "roomName",
      headerName: "Название помещения",
      flex: 1,
      type: "string",
    },
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

  const rows = [
    {
      id: 1,
      roomName: "Цех №1",
      roomAbout: "Отдел разработки",
    },
    {
        id: 2,
        roomName: "Цех №1",
        roomAbout: "Отдел разработки",
      },
      {
        id: 3,
        roomName: "Цех №1",
        roomAbout: "Отдел разработки",
      },
      {
        id: 4,
        roomName: "Цех №1",
        roomAbout: "Отдел разработки",
      },
      {
        id: 5,
        roomName: "Цех №1",
        roomAbout: "Отдел разработки",
      },
      {
        id: 6,
        roomName: "Цех №1",
        roomAbout: "Отдел разработки",
      },
      {
        id: 7,
        roomName: "Цех №1",
        roomAbout: "Отдел разработки",
      },
    
  ]

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
