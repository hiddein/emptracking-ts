import { Button, makeStyles, Snackbar, Typography } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import {
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridFilterToolbarButton,
  GridToolbarExport,
} from "@material-ui/data-grid"
import { rusLocale } from "../../../rusLocale/ruslocale"
import { blue, green, red } from "@material-ui/core/colors"
import { useTypedSelector } from "../../../hooks/useTypedSelector"
import { useDispatch } from "react-redux"
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert"
import { getAccess } from "../../../store/action-creators/emps"
import { Loader } from "../../Loader"
import AddIcon from "@material-ui/icons/Add"
import RemoveIcon from "@material-ui/icons/Remove"
import { NewAccessRoomWindow } from "./NewAccessRoomWindow"
import { DepriveAccessRoomWindow } from "./DepriveAccessRoomWindow"

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
  addButton: {
    color: green[300],
  },
  depriveButton: {
    color: red[300],
  },
}))

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

const CustomToolbar = (props: any) => {
  const classes = useStyles()

  return (
    <GridToolbarContainer className={classes.toolBarContainer}>
      <Typography variant="h6">Сотрудники c доступом</Typography>
      <div className={classes.toolBarItem}>
        <div className={classes.toolBarOption}>
          <Button
            className={classes.addButton}
            onClick={() => props.setAddWindowOpen(true)}
          >
            <AddIcon />
            {"  "}доступ
          </Button>
          <NewAccessRoomWindow
            selectedRoom={props.nameRoom}
            windowOpen={props.addWindowOpen}
            setWindowOpen={props.setAddWindowOpen}
            setOpenSnack={props.setOpenSnack}
          />
        </div>
        <div className={classes.toolBarOption}>
          <Button
            className={classes.depriveButton}
            onClick={() => props.setDepriveAddWindowOpen(true)}
          >
            <RemoveIcon />
            {"  "}доступ
          </Button>
          <DepriveAccessRoomWindow
            selectedRoom={props.nameRoom}
            windowOpen={props.depriveWindowOpen}
            setWindowOpen={props.setDepriveAddWindowOpen}
            setOpenSnack={props.setOpenSnack}
          />
        </div>
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
  setExportJSON: Function
}

interface IExpObg {
  selectedRoom: string
  columns: any[]
  rows: any[]
}

export const EmpsWithAccessTable: React.FC<propsAccessTable> = (
  props: propsAccessTable
) => {
  const classes = useStyles()
  const [openSnack, setOpenSnack] = React.useState(false)
  const [addWindowOpen, setAddWindowOpen] = React.useState(false)
  const [depriveWindowOpen, setDepriveAddWindowOpen] = React.useState(false)
  const access = useTypedSelector((state) => state.emp.access)
  const isLoading = useTypedSelector((state) => state.emp.accessLoading)
  const accessFiltered = access.filter(
    (item) => item.name_room == props.nameRoom
  )
  const dispatch = useDispatch()
  const accessExp: IExpObg = {
    selectedRoom: props.nameRoom,
    columns: [],
    rows: [],
  }

  useEffect(() => {
    dispatch(getAccess())
  }, [addWindowOpen, depriveWindowOpen])

  useEffect(() => {
    props.setExportJSON(accessExp)
  }, [props.nameRoom])

  const handleCloseSnack = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return
    }
    setOpenSnack(false)
  }

  const columns: GridColDef[] = [
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
  ]

  columns.map((col) => {
    accessExp.columns.push(col.headerName)
  })
  interface Access {
    id: number
    empName: string
    empDep: string
    dobEmp: string
    telEmp: string
  }

  const rows: Access[] = []
  accessFiltered.map((item: any, index: any) => {
    rows.push({
      id: index,
      empName: `${item.last_name} ${item.first_name} ${item.middle_name}`,
      empDep: item.name_dep,
      dobEmp: item.db_emp,
      telEmp: item.tel_emp,
    })

    accessExp.rows.push([
      `${item.last_name} ${item.first_name} ${item.middle_name}`,
      item.name_dep,
      item.db_emp,
      item.tel_emp,
    ])
  }
  )

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
          componentsProps={{
            toolbar: {
              nameRoom: props.nameRoom,
              addWindowOpen,
              setAddWindowOpen,
              depriveWindowOpen,
              setDepriveAddWindowOpen,
              setOpenSnack,
            },
          }}
          hideFooterSelectedRowCount={true}
        />
      )}
      <Snackbar
        open={openSnack}
        autoHideDuration={6000}
        onClose={handleCloseSnack}
      >
        <Alert onClose={handleCloseSnack} severity="success">
          Обновление произошло успешно
        </Alert>
      </Snackbar>
    </div>
  )
}
