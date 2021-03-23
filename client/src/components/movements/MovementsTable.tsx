import { Card, Grid, makeStyles, Typography } from "@material-ui/core"
import React, { useState } from "react"
import { DataGrid, GridColDef, GridFilterToolbarButton, GridToolbarContainer, GridToolbarExport, ValueGetterParams } from '@material-ui/data-grid'
import { rusLocale } from "../../rusLocale/ruslocale";

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
      <Typography variant="h6">Перемещения сотрудников предприятия</Typography>
      <div className={classes.toolBarItem}>
        <div className={classes.toolBarOption} >
      <GridFilterToolbarButton />
      </div>
      <div className={classes.toolBarOption} >
      <GridToolbarExport />
      </div>
      </div>
    </GridToolbarContainer>
  )
}
  
interface propsTable {
  empSelected: boolean,
}

export const MovementsTable: React.FC<propsTable> = (props:propsTable) => {
  const classes = useStyles()

  const columns: GridColDef[] = [
    { field: 'fioEmp', headerName: 'ФИО сотрудника', flex: 1, type: 'string' },
    {field: 'room', headerName: 'Помещение',flex: 1, type: 'string' },
    {field: 'enterTime',headerName: 'Время входа',flex: 1, type: 'dateTime'},
    {field: 'exitTime',headerName: 'Время выхода',flex: 1, type: 'dateTime' },
  ];
  
  const rows = [
    { id: 1, fioEmp: 'Snow', room: 'Jon',enterTime: 123, exitTime: 35 },
    { id: 2, fioEmp: '2', room: '2',enterTime: 123, exitTime: 35 },
    { id: 3, fioEmp: '3', room: '3',enterTime: 123, exitTime: 35 },
    { id: 4, fioEmp: 'Snow', room: 'Jon',enterTime: 123, exitTime: 35 },
    { id: 5, fioEmp: 'Snow', room: 'Jon',enterTime: 123, exitTime: 35 },
    { id: 6, fioEmp: 'Snow', room: 'Jon',enterTime: 123, exitTime: 35 },
    { id: 7, fioEmp: 'Snow', room: 'Jon',enterTime: 123, exitTime: 35 },
    { id: 8, fioEmp: 'Snow', room: 'Jon',enterTime: 123, exitTime: 35 },
    { id: 9, fioEmp: 'Snow', room: 'Jon',enterTime: 123, exitTime: 35 },
    { id: 10, fioEmp: 'Snow', room: 'Jon',enterTime: 123, exitTime: 35 },
    { id: 11, fioEmp: 'Snow', room: 'Jon',enterTime: 123, exitTime: 35 },
    { id: 12, fioEmp: 'Snow', room: 'Jon',enterTime: 123, exitTime: 35 },
    { id: 13, fioEmp: 'Snow', room: 'Jon',enterTime: 123, exitTime: 35 },
    { id: 14, fioEmp: 'Snow', room: 'Jon',enterTime: 123, exitTime: 35 },
    { id: 15, fioEmp: 'Snow', room: 'Jon',enterTime: 123, exitTime: 35 },
    { id: 16, fioEmp: 'Snow', room: 'Jon',enterTime: 123, exitTime: 35 },
    { id: 17, fioEmp: 'Snow', room: 'Jon',enterTime: 123, exitTime: 35 },
    { id: 18, fioEmp: 'Snow', room: 'Jon',enterTime: 123, exitTime: 35 },
    { id: 19, fioEmp: 'Snow', room: 'Jon',enterTime: 123, exitTime: 35 },
    { id: 20, fioEmp: 'Snow', room: 'Jon',enterTime: 123, exitTime: 35 },
    { id: 21, fioEmp: 'Snow', room: 'Jon',enterTime: 123, exitTime: 35 },
    { id: 22, fioEmp: 'Snow', room: 'Jon',enterTime: 123, exitTime: 35 },
    { id: 23, fioEmp: 'Snow', room: 'Jon',enterTime: 123, exitTime: 35 },
    { id: 24, fioEmp: 'Snow', room: 'Jon',enterTime: 123, exitTime: 35 },



  ];

  return (

        <div style={{ height: props.empSelected? 655: 699, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={props.empSelected? 17: 18} rowHeight={28}  localeText={rusLocale} components={{
          Toolbar: CustomToolbar,
        }}
        disableColumnSelector={true}
        disableColumnMenu={true}
        
       />
    </div>
  )
}
