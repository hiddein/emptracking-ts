import { Card, Grid, makeStyles } from "@material-ui/core"
import React, { useState } from "react"
import { DataGrid, GridColDef, GridToolbarContainer, GridToolbarExport, ValueGetterParams } from '@material-ui/data-grid'
import { rusLocale } from "../rusLocale/ruslocale";

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
        Поиск сотрудника<GridToolbarExport />
      </GridToolbarContainer>
    );
  }
  
export const EmpsTable: React.FC = () => {
  const classes = useStyles()

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'empName', headerName: 'ФИО сотрудника', width: 200 },
    { field: 'empDep', headerName: 'Отдел', width: 180 },
    { field: 'dobEmp', headerName: 'Дата рождения', width: 180 },
    { field: 'telEmp', headerName: 'Номер телефона', width: 180 },

    // {
    //   field: 'fullName',
    //   headerName: 'Full name',
    //   description: 'This column has a value getter and is not sortable.',
    //   sortable: false,
    //   width: 160,
    //   valueGetter: (params: ValueGetterParams) =>
    //     `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`,
    // },
  ];
  
  const rows = [
    { id: 1, empName: 'Николаев Денис', empDep: 'Отдел разработки', dobEmp: '15.11.1999', telEmp: '83921232313' },
    { id: 2, empName: 'Николаев Денис', empDep: 'Отдел разработки', dobEmp: '15.11.1999', telEmp: '83921232313' },
    { id: 3, empName: 'Николаев Денис', empDep: 'Отдел разработки', dobEmp: '15.11.1999', telEmp: '83921232313' },
    { id: 4, empName: 'Николаев Денис', empDep: 'Отдел разработки', dobEmp: '15.11.1999', telEmp: '83921232313' },
    { id: 5, empName: 'Николаев Денис', empDep: 'Отдел разработки', dobEmp: '15.11.1999', telEmp: '83921232313' },
    { id: 5, empName: 'Николаев Денис', empDep: 'Отдел разработки', dobEmp: '15.11.1999', telEmp: '83921232313' },

  ];
  

  return (

        <div style={{ height: 260, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} rowHeight={20}  components={{
          Toolbar: CustomToolbar,
        }}
        localeText={rusLocale}/>
    </div>
  )
}
