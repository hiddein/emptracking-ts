import { makeStyles, Typography } from "@material-ui/core"
import React, { useEffect, useState } from "react"
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
import { useDispatch } from "react-redux"
import { getAccess } from "../../store/action-creators/emps"
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
    display: "flex",
  },
  footerEmp: {
    marginLeft: 10,
    backgroundColor: blue[200],
  },
  toolBarOption: {
    paddingRight: "10px",
  },
  noRoomContainer: {
    height: "285px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "25px",
  },
}))



const CustomToolbar = () => {
  const classes = useStyles()



  return (
    <GridToolbarContainer className={classes.toolBarContainer}>
      <Typography variant="h6">Сотрудники, имеющие доступ в помещение</Typography>
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

interface propsAccessTable {
  nameRoom: string
}

export const EmpsWithAccessTable: React.FC<propsAccessTable> = (props: propsAccessTable) => {
  const classes = useStyles()
  const access = useTypedSelector((state) => state.emp.access)
  const isLoading = useTypedSelector((state) => state.emp.accessLoading)
  const accessFiltered = access.filter((item) => item.name_room == props.nameRoom)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAccess())
   }, [])

  const columns: GridColDef[] = [
    { field: "empName", headerName: "ФИО сотрудника", flex: 1.2, type: "string", },
    { field: "empDep", headerName: "Отдел", flex: 1, type: "string" },
    { field: "dobEmp", headerName: "Дата рождения", flex: 1, disableColumnMenu: true, type: "date", },
    { field: "telEmp", headerName: "Номер телефона", flex: 1, disableColumnMenu: true, type: "string", },
  ]

  interface Access {
    id: number
    empName: string
    empDep: string
    dobEmp: string
    telEmp: string
  }

  const rows: Access[] = []
  accessFiltered.map((item:any, index:any) => rows.push({id: index, empName: `${item.last_name} ${item.first_name} ${item.middle_name}`,  empDep: item.name_dep, dobEmp: item.db_emp, telEmp: item.tel_emp}))


  return (
    <div style={{ height: props.nameRoom == "" ? 340 : 296, width: "100%" }}>
       {props.nameRoom == "" ? (
          <div className={classes.noRoomContainer}>
            <Typography variant="h4">Выберите помещение</Typography>
          </div>
        ) : isLoading ? (
          <Loader size={60} height="290px" />
        ) : (
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={6}
        rowHeight={25}
        disableColumnSelector={true}
        disableColumnMenu={true}
        localeText={rusLocale}
        components={{
          Toolbar: CustomToolbar,
        }}
        hideFooterSelectedRowCount={true}
      />)}
    </div>
  )
}
