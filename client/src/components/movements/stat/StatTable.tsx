import { Card, Grid, makeStyles, Typography } from "@material-ui/core"
import React, { useState } from "react"
import {
  DataGrid,
  GridColDef,
  GridFilterToolbarButton,
  GridToolbarContainer,
  GridToolbarExport,
  ValueGetterParams,
} from "@material-ui/data-grid"
import { rusLocale } from "../../../rusLocale/ruslocale"
import { useTypedSelector } from "../../../hooks/useTypedSelector"
import { Loader } from "../../Loader"

const useStyles = makeStyles(() => ({
  toolBarContainer: {
    display: "flex",
    justifyContent: "space-between",
    margin: "6px",
  },
  toolBarItem: {
    display: "flex",
  },
  toolBarOption: {
    paddingRight: "10px",
  },
}))

const CustomToolbar = () => {
  const classes = useStyles()
  return (
    <GridToolbarContainer className={classes.toolBarContainer}>
      <Typography variant="h6">Статистика посещений</Typography>
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
  empId: string
  nameRoom:string
}

export const StatTable: React.FC<propsTable> = (props: propsTable) => {
  const stat = useTypedSelector((state) => state.stat.stat)
  const isLoading = useTypedSelector((state) => state.stat.loading)


  const columns: GridColDef[] = [
    { field: "fioEmp", headerName: "ФИО сотрудника", flex: 1, type: "string" },
    { field: "nameDep", headerName: "Отдел", flex: 1, type: "string", },
    { field: "room", headerName: "Помещение", flex: 1, type: "string" },
    { field: "countVis", headerName: "Количество посещений", flex: 0.8, type: "number", },
  ]

  interface Stat {
    id:number
    fioEmp: string
    nameDep: string
    room: string
    countVis: number
  }

  const rows: Stat[] = []

  let movesFiltered: Stat [] = stat

  if (props.empId !== "") {
    movesFiltered = stat.filter((item) => item.id_emp == props.empId)
  } 
  if (props.nameRoom !== "") {
    movesFiltered = stat.filter((item) => item.name_room == props.nameRoom)
  } 

  movesFiltered.map((item: any,index:number) =>
    rows.push({
      id: index,
      fioEmp: `${item.last_name} ${item.first_name} ${item.middle_name} `,
      nameDep: item.name_dep,
      room: item.name_room,
      countVis: item.count_visits,
    })
  )

  return (
    <div style={{ height: props.empId != "" || props.nameRoom!= "" ? 266 : 310, width: "100%" }}>
       {isLoading ? (
        <Loader size={60} />
      ) : (
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowHeight={28}
        localeText={rusLocale}
        components={{
          Toolbar: CustomToolbar,
        }}
        disableColumnSelector={true}
        disableColumnMenu={true}
        hideFooterSelectedRowCount = {true}
      />
      )}
    </div>
  )
}
