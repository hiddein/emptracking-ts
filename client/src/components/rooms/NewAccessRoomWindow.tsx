import React, { useEffect, useState } from "react"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import { useDispatch } from "react-redux"
import { useTypedSelector } from "../../hooks/useTypedSelector"
import { addEmp, getDeps, getEmps } from "../../store/action-creators/emps"
import {
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  Theme,
} from "@material-ui/core"
import { addAccess } from "../../store/action-creators/rooms"

const useStyles = makeStyles((theme: Theme) => ({
  headContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: "5px",
  },
  mainItem: {
    width: "48%",
  },
}))

interface NewEmpInterface {
  windowOpen: boolean
  setWindowOpen: Function
  selectedRoom: string
  setOpenSnack: Function
}

export const NewAccessRoomWindow: React.FC<NewEmpInterface> = (
  props: NewEmpInterface
) => {
  const classes = useStyles()
  const [selectedEmp, setSelectedEmp] = React.useState("")
  const rooms = useTypedSelector((state) => state.room.rooms)
  const emps = useTypedSelector((state) => state.emp.emps)
  const room = rooms.filter((item) => item.name_room == props.selectedRoom)[0]
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getEmps())
  }, [])

  const handleClose = () => {
    props.setWindowOpen(false)
  }

  const onAddHandle = () => {
    const formData = new FormData()
    formData.append('id_emp', selectedEmp)
    formData.append('id_room', room.id_room)
    dispatch(addAccess(formData))
    props.setOpenSnack(true)
    props.setWindowOpen(false)
  }


  return (
    <div>
      <Dialog
        open={props.windowOpen}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Предоставить доступ в помещение
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Выберите сотрудника для предоставления доступа
          </DialogContentText>
            <TextField
            disabled={true}
            fullWidth
              margin="dense"
              id="nam_room"
              label="Название помещения"
              type="text"
              value={props.selectedRoom}
            />

            <FormControl fullWidth margin="dense">
              <InputLabel htmlFor="emp-select">Сотрудник</InputLabel>
              <Select
                labelId="emp-select"
                id="emp-select"
                value={selectedEmp}
                onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                setSelectedEmp(event.target.value as string)
                }}
              >
                {emps.map((emp: any) => (
                  <MenuItem value={emp.id_emp} key={emp.id_emp}>
                    {`${emp.last_name} ${emp.first_name} ${emp.middle_name}`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Отмена
          </Button>
          <Button onClick={onAddHandle} color="primary">
            Предоставить доступ
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
