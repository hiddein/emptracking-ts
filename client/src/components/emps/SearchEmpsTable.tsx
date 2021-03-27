import { makeStyles, Typography } from "@material-ui/core"
import React, { useState } from "react"
import {
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridFilterToolbarButton,
} from "@material-ui/data-grid"
import { rusLocale } from "../../rusLocale/ruslocale"
import { blue } from "@material-ui/core/colors"
import { useTypedSelector } from "../../hooks/useTypedSelector"
import { Loader } from "../Loader"


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
    display: 'flex',
  },
  footerEmp: {
    marginLeft: 10,
    backgroundColor: blue[200]
  },
  toolBarOption: {
    paddingRight: '10px'
  },
}))

const CustomToolbar = () => {
  const classes = useStyles()
  return (
    <GridToolbarContainer className={classes.toolBarContainer}>
      <Typography variant="h6">Поиск сотрудника</Typography>
      <div className={classes.toolBarItem}>
        <div className={classes.toolBarOption} >
      <GridFilterToolbarButton />
      </div>

      </div>
    </GridToolbarContainer>
  )
}

interface propsTable {
  updateData: Function,
  height: number
  
}

export const SearchEmpsTable: React.FC<propsTable> = (props:propsTable) => {
  const emps = useTypedSelector(state => state.emp.emps)
  const isLoading = useTypedSelector(state => state.emp.loading)

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 0.4, disableColumnMenu: true , type: 'number'},
    { field: "empName", headerName: "ФИО сотрудника", flex: 1.2, type: 'string' },
    { field: "empDep", headerName: "Отдел", flex: 1, type: 'string' },
    {
      field: "dobEmp",
      headerName: "Дата рождения",
      flex: 1,
      disableColumnMenu: true,
      type: 'date'
    },
    {
      field: "telEmp",
      headerName: "Номер телефона",
      flex: 1,
      disableColumnMenu: true,
      type: 'string' 
    },

  ]

  interface Employee {
    id: number
    empDep: string
    empName: string
    dobEmp: string
    telEmp: string
  }

  const rows: Employee[] = []
  emps.map((emp:any) => rows.push({id: emp.id_emp, empDep: emp.name_dep, empName: `${emp.last_name} ${emp.first_name} ${emp.middle_name}`, dobEmp: emp.db_emp, telEmp: emp.tel_emp }))

  return (
    <div style={{ height: props.height, width: "100%" }}>
       {isLoading? <Loader size={60}/> :<DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowHeight={25}
        disableColumnSelector={true}
        disableColumnMenu={true}
        
        localeText={rusLocale}
        onRowSelected={(param:any) =>{props.updateData(`${param.data.id}  ${param.data.empName}`); }}
        components={{
          Toolbar: CustomToolbar,
        }}

        hideFooterSelectedRowCount = {true}
      />}
    </div>
  )
}
