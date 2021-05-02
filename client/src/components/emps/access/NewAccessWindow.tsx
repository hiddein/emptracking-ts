import React, { useEffect } from "react"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import { useDispatch } from "react-redux"
import { useTypedSelector } from "../../../hooks/useTypedSelector"
import { getDeps } from "../../../store/action-creators/emps"
import { FormControl, InputLabel, makeStyles, MenuItem, Select, Theme } from "@material-ui/core"
import { addAccess } from "../../../store/action-creators/rooms"

interface NewEmpInterface {
  windowOpen: boolean
  setWindowOpen: Function
  selectedEmp: string
  setOpenSnack: Function
}

export const NewAccessWindow: React.FC<NewEmpInterface> = (
  props: NewEmpInterface
) => {
  const [selectedRoom, setSelectedRoom] = React.useState("")
  const emps = useTypedSelector((state) => state.emp.emps)
  const rooms = useTypedSelector((state) => state.room.rooms)
  const emp = emps.filter((item) => item.id_emp == props.selectedEmp)[0]
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getDeps())
  }, [])

  const handleClose = () => {
    props.setWindowOpen(false)
  }

  const onAddHandle = () => {
    const formData = new FormData()
    formData.append("id_emp", props.selectedEmp)
    formData.append("id_room", selectedRoom)
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
            Выберите помещение для предоставления доступа
          </DialogContentText>
          <TextField
            disabled={true}
            fullWidth
            margin="dense"
            id="last_name"
            label="ФИО сотрудника"
            type="text"
            value={`${emp.last_name} ${emp.first_name} ${emp.middle_name} `}
          />

          <FormControl fullWidth margin="dense">
            <InputLabel htmlFor="dep-select">Помещение</InputLabel>
            <Select
              labelId="dep-select"
              id="dep-select"
              value={selectedRoom}
              onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                console.log(event)
                setSelectedRoom(event.target.value as string)
              }}
            >
              {rooms.map((room: any) => (
                <MenuItem value={room.id_room} key={room.id_room}>
                  {room.name_room}
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
