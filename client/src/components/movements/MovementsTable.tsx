import { Card, Grid, makeStyles } from "@material-ui/core"
import React, { useState } from "react"
import { DataGrid, GridColDef, GridToolbarContainer, GridToolbarExport, ValueGetterParams } from '@material-ui/data-grid'

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    minHeight: "100vh",
    padding: "20px",
  },

  button: {
    background: "linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)",
    width: "100%",
  },
  content: {
    minWidth: "200px",
  },
  card: {
    borderRadius: 10,
  },
  item: {
    width: "100%",
  },
  padding: {
    padding: 25,
  },
}))

function CustomToolbar() {
    return (
      <GridToolbarContainer>
        Пермещения сотрудников предприятия<GridToolbarExport />
      </GridToolbarContainer>
    );
  }
  
export const MovementsTable: React.FC = () => {
  const classes = useStyles()

  const columns: GridColDef[] = [
    { field: 'fioEmp', headerName: 'ФИО сотрудника', width: 200 },
    {field: 'room', headerName: 'Помещение',width: 150},
    {field: 'enterTime',headerName: 'Время входа',width: 180},
    {field: 'exitTime',headerName: 'Время выхода',width: 180},
  ];
  
  const rows = [
    { id: 1, fioEmp: 'Snow', room: 'Jon',enterTime: 123, exitTime: 35 },
    { id: 1, fioEmp: 'Snow', room: 'Jon',enterTime: 123, exitTime: 35 },
    { id: 1, fioEmp: 'Snow', room: 'Jon',enterTime: 123, exitTime: 35 },
    { id: 1, fioEmp: 'Snow', room: 'Jon',enterTime: 123, exitTime: 35 },
    { id: 1, fioEmp: 'Snow', room: 'Jon',enterTime: 123, exitTime: 35 },
    { id: 1, fioEmp: 'Snow', room: 'Jon',enterTime: 123, exitTime: 35 },
    { id: 1, fioEmp: 'Snow', room: 'Jon',enterTime: 123, exitTime: 35 },
    { id: 1, fioEmp: 'Snow', room: 'Jon',enterTime: 123, exitTime: 35 },
    { id: 1, fioEmp: 'Snow', room: 'Jon',enterTime: 123, exitTime: 35 },
    { id: 1, fioEmp: 'Snow', room: 'Jon',enterTime: 123, exitTime: 35 },
    { id: 1, fioEmp: 'Snow', room: 'Jon',enterTime: 123, exitTime: 35 },
    { id: 1, fioEmp: 'Snow', room: 'Jon',enterTime: 123, exitTime: 35 },
    { id: 1, fioEmp: 'Snow', room: 'Jon',enterTime: 123, exitTime: 35 },
    { id: 1, fioEmp: 'Snow', room: 'Jon',enterTime: 123, exitTime: 35 },
    { id: 1, fioEmp: 'Snow', room: 'Jon',enterTime: 123, exitTime: 35 },
    { id: 1, fioEmp: 'Snow', room: 'Jon',enterTime: 123, exitTime: 35 },
    { id: 1, fioEmp: 'Snow', room: 'Jon',enterTime: 123, exitTime: 35 },
    { id: 1, fioEmp: 'Snow', room: 'Jon',enterTime: 123, exitTime: 35 },
    { id: 1, fioEmp: 'Snow', room: 'Jon',enterTime: 123, exitTime: 35 },
    { id: 1, fioEmp: 'Snow', room: 'Jon',enterTime: 123, exitTime: 35 },
    { id: 1, fioEmp: 'Snow', room: 'Jon',enterTime: 123, exitTime: 35 },
    { id: 1, fioEmp: 'Snow', room: 'Jon',enterTime: 123, exitTime: 35 },
    { id: 1, fioEmp: 'Snow', room: 'Jon',enterTime: 123, exitTime: 35 },
    { id: 1, fioEmp: 'Snow', room: 'Jon',enterTime: 123, exitTime: 35 },



  ];
  

  return (

        <div style={{ height: 690, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={17} rowHeight={30}   components={{
          Toolbar: CustomToolbar,
        }}/>
    </div>
  )
}
