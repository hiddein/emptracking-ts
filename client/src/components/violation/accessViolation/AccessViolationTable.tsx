import { makeStyles, Typography } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import {
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridFilterToolbarButton,
  GridToolbarExport,
} from "@material-ui/data-grid"
import { rusLocale } from "../../../rusLocale/ruslocale"
import { useTypedSelector } from "../../../hooks/useTypedSelector"
import { useDispatch } from "react-redux"
import {
  getAccessViols,
  getAccessViolsByEmp,
} from "../../../store/action-creators/accessViols"
import { Loader } from "../../Loader"
import _ from "lodash"

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
      <Typography variant="h6">Нарушения доступа </Typography>
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
  setExportJSON: Function
}

interface IExpObg {
  columns: any[]
  rows: any[]
}

export const AccessViolationTable: React.FC<propsTable> = (
  props: propsTable
) => {
  const viols = useTypedSelector((state) => state.viol.viols)
  const isLoading = useTypedSelector((state) => state.viol.loading)
  const dispatch = useDispatch()
  const startDate = useTypedSelector((state) => state.dates.startDate)
  const endDate = useTypedSelector((state) => state.dates.endDate)
  const violsExp: IExpObg = {
    columns: [],
    rows: [],
  }

  useEffect(() => {
    dispatch(getAccessViols(startDate, endDate))
    dispatch(getAccessViolsByEmp(startDate, endDate))
    props.setExportJSON(violsExp)
  }, [startDate, endDate])

  const columns: GridColDef[] = [
    {
      field: "empName",
      headerName: "ФИО сотрудника",
      flex: 1.2,
      type: "string",
    },
    { field: "empDep", headerName: "Отдел", flex: 1, type: "string" },
    {
      field: "room",
      headerName: "Помещение",
      flex: 1,
      disableColumnMenu: true,
      type: "string",
    },
    {
      field: "timeViol",
      headerName: "Время нарушения",
      flex: 1,
      disableColumnMenu: true,
      type: "dateTime",
    },
  ]

  columns.map((col) => {
    violsExp.columns.push(col.headerName)
  })

  interface Viol {
    id: number
    empName: string
    empDep: string
    room: string
    timeViol: string
  }

  const rows: Viol[] = []
  viols.map((viol: any) =>{
    rows.push({
      id: viol.move_id,
      empName: `${viol.last_name} ${viol.first_name} ${viol.middle_name}`,
      empDep: viol.name_dep,
      room: viol.name_room,
      timeViol: viol.timestamp,
    })

    violsExp.rows.push([
      `${viol.last_name} ${viol.first_name} ${viol.middle_name} `,
      viol.name_dep,
      viol.name_room,
      viol.timestamp,,
    ])
  }
  )

  return (
    <div style={{ height: 320, width: "100%" }}>
      {isLoading ? (
        <Loader size={60} />
      ) : (
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowHeight={25}
          disableColumnSelector={true}
          disableColumnMenu={true}
          localeText={rusLocale}
          components={{
            Toolbar: CustomToolbar,
          }}
          hideFooterSelectedRowCount={true}
        />
      )}
    </div>
  )
}
