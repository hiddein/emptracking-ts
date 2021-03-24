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
      <Typography variant="h6">Поиск сотрудника</Typography>
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


export const SearchEmpsTable: React.FC = () => {

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.4,
      disableColumnMenu: true,
      type: "number",
    },
    {
      field: "empName",
      headerName: "ФИО сотрудника",
      flex: 1.2,
      type: "string",
    },
    { field: "empDep", headerName: "Отдел", flex: 1, type: "string" },
    {
      field: "dobEmp",
      headerName: "Дата рождения",
      flex: 1,
      disableColumnMenu: true,
      type: "date",
    },
    {
      field: "telEmp",
      headerName: "Номер телефона",
      flex: 1,
      disableColumnMenu: true,
      type: "string",
    },

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
      empName: "Николаев Денис",
      empDep: "Отдел разработки",
      dobEmp: "15.11.1999",
      telEmp: "83921232313",
    },
    {
      id: 2,
      empName: "Васильев Владимир",
      empDep: "Отдел разработки",
      dobEmp: "15.11.1999",
      telEmp: "83921232313",
    },
    {
      id: 3,
      empName: "Николаев Денис",
      empDep: "Отдел разработки",
      dobEmp: "15.11.1999",
      telEmp: "83921232313",
    },
    {
      id: 4,
      empName: "Николаев Денис",
      empDep: "Отдел разработки",
      dobEmp: "15.11.1999",
      telEmp: "83921232313",
    },
    {
      id: 5,
      empName: "Николаев Денис",
      empDep: "Отдел разработки",
      dobEmp: "15.11.1999",
      telEmp: "83921232313",
    },
    {
      id: 6,
      empName: "Николаев Денис",
      empDep: "Отдел разработки",
      dobEmp: "15.11.1999",
      telEmp: "83921232313",
    },
    {
      id: 7,
      empName: "Васильев Владимир",
      empDep: "Отдел разработки",
      dobEmp: "15.11.1999",
      telEmp: "83921232313",
    },
    {
      id: 8,
      empName: "Васильев Владимир",
      empDep: "Отдел разработки",
      dobEmp: "15.11.1999",
      telEmp: "83921232313",
    }
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
