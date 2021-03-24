import { makeStyles, Typography } from "@material-ui/core"
import React, { useState } from "react"
import {
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridFilterToolbarButton,
  GridToolbarExport,
} from "@material-ui/data-grid"
import { rusLocale } from "../../../rusLocale/ruslocale"
import { blue } from "@material-ui/core/colors"


const useStyles = makeStyles(() => ({
  toolBarContainer: {
    display: "flex",
    justifyContent: "space-between",
    margin: "6px",
  },
  
  toolBarItem: {
    display: 'flex',
  },

  toolBarOption: {
    paddingRight: '10px'
  },
}))

const CustomToolbar = () => {
  const classes = useStyles()
  return (
    <GridToolbarContainer className={classes.toolBarContainer}>
      <Typography variant="h6">Нарушения доступа </Typography>
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



export const AccessViolationTable: React.FC = () => {


  const columns: GridColDef[] = [
    { field: "empName", headerName: "ФИО сотрудника", flex: 1.2, type: 'string' },
    { field: "empDep", headerName: "Отдел", flex: 1, type: 'string' },
    { field: "room", headerName: "Помещение", flex: 1, disableColumnMenu: true, type: 'string' },
    { field: "timeViol", headerName: "Время нарушения", flex: 1, disableColumnMenu: true, type: 'dateTime' },

    // {field: 'fullName', headerName: 'Full name', description: 'This column has a value getter and is not sortable.', sortable: false, width: 160,
    //   valueGetter: (params: ValueGetterParams) =>
    //     `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`,
    // },
  ]

  const rows = [
    {
      id: 1,
      empName: "Николаев Денис",
      empDep: "Отдел разработки",
      room: "asdfgadf",
      timeViol: "83921232313",
    },
    {
      id: 2,
      empName: "Васильев Владимир",
      empDep: "Отдел разработки",
      room: "sdfhsdfgh",
      timeViol: "83921232313",
    },
    {
      id: 3,
      empName: "Николаев Денис",
      empDep: "Отдел разработки",
      room: "sdfhsdgh",
      timeViol: "83921232313",
    },
    {
      id: 4,
      empName: "Николаев Денис",
      empDep: "Отдел разработки",
      room: "sdghsfdgh",
      timeViol: "83921232313",
    },
    {
      id: 5,
      empName: "Николаев Денис",
      empDep: "Отдел разработки",
      room: "sdghsfghdf",
      timeViol: "83921232313",
    },
    {
      id: 6,
      empName: "Николаев Денис",
      empDep: "Отдел разработки",
      room: "sdfhsdfh",
      timeViol: "83921232313",
    },
    {
      id: 7,
      empName: "Николаев Денис",
      empDep: "Отдел разработки",
      room: "sdfhsdfh",
      timeViol: "83921232313",
    },
  ]

  return (
    <div style={{ height: 338, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={6}
        rowHeight={25}
        disableColumnSelector={true}
        disableColumnMenu={true}
        
        localeText={rusLocale}
        //onRowSelected={(param:any) =>{props.updateData(param.data.empName); }}
        components={{
          Toolbar: CustomToolbar,
        }}

        hideFooterSelectedRowCount = {true}
      />
    </div>
  )
}
