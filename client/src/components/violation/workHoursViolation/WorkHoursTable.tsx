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

  const columns: GridColDef[] = [
    { field: "fioEmp", headerName: "ФИО сотрудника", flex: 1, type: "string" },
    { field: "dep", headerName: "Отдел", flex: 1, type: "string" },
    {
      field: "dateViol",
      headerName: "Дата нарушения",
      flex: 1,
      type: "date",
    },
    {
      field: "timeViol",
      headerName: "Время отсутствия",
      flex: 1,
      type: "time",
    },
  ]

  const rows = [
    { id: 1, fioEmp:"Николаев Денис", dep: "Snow", dateViol : "22.02.2020", timeViol: 123},
    { id: 2, fioEmp:"Николаев Денис", dep: "2", dateViol : "22.02.2020", timeViol: 123},
    { id: 3, fioEmp:"Николаев Денис", dep: "3", dateViol : "22.02.2020", timeViol: 123},
    { id: 4, fioEmp:"Николаев Денис", dep: "Snow", dateViol : "22.02.2020", timeViol: 123},
    { id: 5, fioEmp:"Николаев Денис", dep: "Snow", dateViol : "22.02.2020", timeViol: 123},
    { id: 6, fioEmp:"Николаев Денис", dep: "Snow", dateViol : "22.02.2020", timeViol: 123},
    { id: 7, fioEmp:"Николаев Денис", dep: "Snow", dateViol : "22.02.2020", timeViol: 123},
    { id: 8, fioEmp:"Николаев Денис", dep: "Snow", dateViol : "22.02.2020", timeViol: 123},
    { id: 9, fioEmp:"Николаев Денис", dep: "Snow", dateViol : "22.02.2020", timeViol: 123},
    { id: 10, fioEmp:"Николаев Денис", dep: "Snow", dateViol : "22.02.2020", timeViol: 123},
    { id: 11, fioEmp:"Николаев Денис", dep: "Snow", dateViol : "22.02.2020", timeViol: 123},
    { id: 12, fioEmp:"Николаев Денис", dep: "Snow", dateViol : "22.02.2020", timeViol: 123},
    { id: 13, fioEmp:"Николаев Денис", dep: "Snow", dateViol : "22.02.2020", timeViol: 123},
    { id: 14, fioEmp:"Николаев Денис", dep: "Snow", dateViol : "22.02.2020", timeViol: 123},
    { id: 15, fioEmp:"Николаев Денис", dep: "Snow", dateViol : "22.02.2020", timeViol: 123},
    { id: 16, fioEmp:"Николаев Денис", dep: "Snow", dateViol : "22.02.2020", timeViol: 123},
    { id: 17, fioEmp:"Николаев Денис", dep: "Snow", dateViol : "22.02.2020", timeViol: 123},
    { id: 18, fioEmp:"Николаев Денис", dep: "Snow", dateViol : "22.02.2020", timeViol: 123},
    { id: 19, fioEmp:"Николаев Денис", dep: "Snow", dateViol : "22.02.2020", timeViol: 123},
    { id: 20, fioEmp:"Николаев Денис", dep: "Snow", dateViol : "22.02.2020", timeViol: 123},
    { id: 21, fioEmp:"Николаев Денис", dep: "Snow", dateViol : "22.02.2020", timeViol: 123},
    { id: 22, fioEmp:"Николаев Денис", dep: "Snow", dateViol : "22.02.2020", timeViol: 123},
    { id: 23, fioEmp:"Николаев Денис", dep: "Snow", dateViol : "22.02.2020", timeViol: 123},
    { id: 24, fioEmp:"Николаев Денис", dep: "Snow", dateViol : "22.02.2020", timeViol: 123},
  ]

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
