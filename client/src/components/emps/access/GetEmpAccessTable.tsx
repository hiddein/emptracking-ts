import { Button, makeStyles, Typography } from "@material-ui/core"
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
import { getAccess } from "../../../store/action-creators/emps"
import { Loader } from "../../Loader"
import AddIcon from '@material-ui/icons/Add';
import { NewAccessWindow } from "./NewAccessWindow"
import RemoveIcon from '@material-ui/icons/Remove';
import { DepriveAccessWindow } from "./DepriveAccessWindow"

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
  noEmpContainer: {
    height: "285px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "25px",
  },
  addButton: {
    color: green[300]
  },
  depriveButton: {
    color: red[300]
  },
}))

const CustomToolbar = (props: any) => {
  const classes = useStyles()

  return (
    <GridToolbarContainer className={classes.toolBarContainer}>
      <Typography variant="h6">Доступ в помещения</Typography>
      <div className={classes.toolBarItem}>

      <div className={classes.toolBarOption}>
        <Button className={classes.addButton} onClick={() => props.setAddWindowOpen(true)}><AddIcon />{'  '}доступ</Button>
        <NewAccessWindow selectedEmp={props.idEmp} windowOpen={props.addWindowOpen} setWindowOpen={props.setAddWindowOpen} />
        </div>
        <div className={classes.toolBarOption}>
        <Button className={classes.depriveButton} onClick={() => props.setDepriveAddWindowOpen(true)}><RemoveIcon />{'  '}доступ</Button>
        <DepriveAccessWindow selectedEmp={props.idEmp} windowOpen={props.depriveWindowOpen} setWindowOpen={props.setDepriveAddWindowOpen} />
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

interface propsAccessChart {
  idEmp: string
}

export const GetEmpAccessTable: React.FC<propsAccessChart> = (props: propsAccessChart) => {
  const [addWindowOpen, setAddWindowOpen] = React.useState(false)
  const [depriveWindowOpen, setDepriveAddWindowOpen] = React.useState(false)
  const classes = useStyles()
  const access = useTypedSelector((state) => state.emp.access)
  const isLoading = useTypedSelector((state) => state.emp.accessLoading)
  const accessFiltered = access.filter((item) => item.id_emp == props.idEmp)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAccess())
   }, [addWindowOpen,depriveWindowOpen])


  const columns: GridColDef[] = [
    { field: "roomName", headerName: "Название помещения", flex: 1, type: "string", },
    { field: "roomAbout", headerName: "Описание помещения", flex: 1, type: "string" },
  ]
  interface Access {
    id: number
    roomName: string
    roomAbout: string
    

  }
  const rows: Access[] = []
  accessFiltered.map((item:any, index:any) => rows.push({id: index, roomName: item.name_room, roomAbout:item.about_room }))
 

  return (
    <div style={{ height: 340, width: "100%" }}>
       {props.idEmp == "" ? (
          <div className={classes.noEmpContainer}>
            <Typography variant="h4">Выберите сотрудника</Typography>
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
            idEmp: props.idEmp,
            addWindowOpen,
            setAddWindowOpen,
            depriveWindowOpen,
            setDepriveAddWindowOpen
          }
        }}
        hideFooterSelectedRowCount={true}
      />)}
    </div>
  )
}
