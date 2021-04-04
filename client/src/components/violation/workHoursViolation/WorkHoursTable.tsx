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
import { useDispatch } from "react-redux"
import { getWorkHoursViols } from "../../../store/action-creators/workHoursViols"
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
      <Typography variant="h6">Нарушения</Typography>
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


export const WorkHoursTable: React.FC = () => {
  const viols = useTypedSelector((state) => state.workHoursViol.viols)
  const isLoading = useTypedSelector((state) => state.workHoursViol.loading)
  const dispatch = useDispatch()
  const startDate = useTypedSelector(state => state.dates.startDate)
  const endDate = useTypedSelector(state => state.dates.endDate)

  useEffect(() => {
    dispatch(getWorkHoursViols(startDate, endDate))
   }, [startDate, endDate])

  const columns: GridColDef[] = [
    { field: "fioEmp", headerName: "ФИО сотрудника", flex: 1, type: "string" },
    { field: "depName", headerName: "Отдел", flex: 1, type: "string" },
    { field: "dateViol", headerName: "Дата нарушения", flex: 1, type: "date", },
    { field: "timeViol", headerName: "Время отсутствия", flex: 1, type: "time", },
  ]

  interface Viol {
    id: number
    fioEmp: string
    depName: string
    dateViol: string
    timeViol: string

  }
  const rows: Viol[] = []
  viols.map((viol:any, index:any) => rows.push({id: index, fioEmp: `${viol.last_name} ${viol.first_name} ${viol.middle_name}`, depName: viol.name_dep, dateViol: viol.date, timeViol: viol.absence_time}))
 

  return (
    <div style={{ height: 699, width: "100%" }}>
       {isLoading ? (
        <Loader size={60} />
      ) : (
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
      />)}
    </div>
  )
}
