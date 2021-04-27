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
import { rusLocale } from "../../rusLocale/ruslocale"
import { useTypedSelector } from "../../hooks/useTypedSelector"
import { Loader } from "../Loader"
import { useDispatch } from "react-redux"
import { getAllMoves, getMovesInRange } from "../../store/action-creators/moves"


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
      <Typography variant="h6">Перемещения сотрудников предприятия</Typography>
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
  setMovesExp: Function
}

interface IExpObg {
  columns: any[]
  rows: any[]
}

export const MovementsTable: React.FC<propsTable> = (props: propsTable) => {
  const moves = useTypedSelector((state) => state.move.moves)
  const isLoading = useTypedSelector((state) => state.move.loading)
  const dispatch = useDispatch()
  const startDate = useTypedSelector(state => state.dates.startDate)
  const endDate = useTypedSelector(state => state.dates.endDate)
  const movesExp:IExpObg = {
    columns: [],
    rows:[]
  }

  useEffect(() => {
    dispatch(getMovesInRange(startDate, endDate))
   }, [startDate, endDate])

   useEffect(() => {
    props.setMovesExp(movesExp)
   }, [startDate, endDate,props.empId])


  const columns: GridColDef[] = [
    { field: "fioEmp", headerName: "ФИО сотрудника", flex: 1, type: "string" },
    { field: "room", headerName: "Помещение", flex: 0.7, type: "string" },
    {
      field: "enterTime",
      headerName: "Время входа",
      flex: 1,
      type: "dateTime",
    },
    {
      field: "exitTime",
      headerName: "Время выхода",
      flex: 1,
      type: "dateTime",
    },
  ]

  columns.map((col) => {
    movesExp.columns.push(col.headerName)
  })

  interface Move {
    id: number
    fioEmp: string
    room: string
    enterTime: string
    exitTime: string
  }

  const rows: Move[] = []

  let movesFiltered: Move[] = moves


  if (props.empId !== "") {
    movesFiltered = moves.filter((move) => move.id_emp == props.empId)
  } 
  movesFiltered.map((move: any) => {
    rows.push({
      id: move.move_id,
      fioEmp: `${move.last_name} ${move.first_name} ${move.middle_name} `,
      room: move.name_room,
      enterTime: move.time_enter,
      exitTime: move.time_leave,
    })

    movesExp.rows.push([
      `${move.last_name} ${move.first_name} ${move.middle_name} `,
      move.name_room,
      move.time_enter,
      move.time_leave,
    ])
  }
  )


  return (
    <div style={{ height: props.empId != "" ? 655 : 699, width: "100%" }}>
      {isLoading ? (
        <Loader size={60} />
      ) : (
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={props.empId != "" ? 17 : 18}
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
