import { Card, Grid, makeStyles, Typography } from "@material-ui/core"
import React, { useEffect, useState } from "react"
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
import { useDispatch } from "react-redux"
import { getLateness } from "../../../store/action-creators/lateness"

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
      <Typography variant="h6">Опоздания сотрудников</Typography>
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


export const LateEmpsTable: React.FC = () => {
  const lateness = useTypedSelector((state) => state.lateness.lateness)
  const isLoading = useTypedSelector((state) => state.lateness.loading)
  const dispatch = useDispatch()
  const startDate = useTypedSelector(state => state.dates.startDate)
  const endDate = useTypedSelector(state => state.dates.endDate)

  useEffect(() => {
    dispatch(getLateness(startDate, endDate))
   }, [startDate, endDate])


  const columns: GridColDef[] = [
    { field: "fioEmp", headerName: "ФИО сотрудника", flex: 1, type: "string" },
    { field: "depName", headerName: "Отдел", flex: 1, type: "string" },
    { field: "dateViol", headerName: "Дата нарушения", flex: 1, type: "date", },
    { field: "timeViol", headerName: "Время опоздания", flex: 1, type: "time", }
  ]

  interface Lateness {
    id: number
    fioEmp: string
    depName: string
    dateViol: string
    timeViol: string

  }
console.log(lateness)
  const rows: Lateness[] = []
  lateness.map((item:any, index:any) => rows.push({id: index, fioEmp: `${item.last_name} ${item.first_name} ${item.middle_name}`, depName: item.name_dep, dateViol: item.date, timeViol: item.late_time}))
 
  return (
    <div style={{ height: 699, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={18}
        rowHeight={28}
        localeText={rusLocale}
        components={{
          Toolbar: CustomToolbar,
        }}
        disableColumnSelector={true}
        disableColumnMenu={true}
      />
    </div>
  )
}
