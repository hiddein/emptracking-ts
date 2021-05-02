import React from "react"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import { useDispatch } from "react-redux"
import { useTypedSelector } from "../../hooks/useTypedSelector"
import { addRoom } from "../../store/action-creators/rooms"
import { Chip, FormControl, Input, InputLabel, makeStyles, MenuItem, Select, Theme } from "@material-ui/core"

const useStyles = makeStyles((theme: Theme) => ({
  headContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: "5px",
  },

  formControl: {
    margin: theme.spacing(1),
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  multi: {
    maxWidth: "550px",
  },
}))

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

interface NewEmpInterface {
  windowOpen: boolean
  setWindowOpen: Function
  setOpenSnack: Function
}

export const NewRoomWindow: React.FC<NewEmpInterface> = (
  props: NewEmpInterface
) => {
  const classes = useStyles()
  const [nameRoom, setNameRoom] = React.useState("")
  const [aboutRoom, setAboutRoom] = React.useState("")
  const [commRooms, setCommRooms] = React.useState<any[]>([])
  const [depsOwnRoom, setDepsOwnRoom] = React.useState<any[]>([])

  const handleCommChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCommRooms(event.target.value as any[])
  }

  const handleOwnChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setDepsOwnRoom(event.target.value as any[])
  }

  const deps = useTypedSelector((state) => state.emp.deps)
  const rooms = useTypedSelector((state) => state.room.rooms)
  console.log(deps)

  const dispatch = useDispatch()

  const handleClose = () => {
    props.setWindowOpen(false)
  }

  const onAddHandle = () => {
    dispatch(addRoom(nameRoom, aboutRoom, commRooms, depsOwnRoom))
    props.setWindowOpen(false)
    props.setOpenSnack(true)
  }

  return (
    <div>
      <Dialog
        open={props.windowOpen}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Добавить новое помещение
        </DialogTitle>
        <DialogContent>
          <DialogContentText>Пожалуйста, заполните данные</DialogContentText>
          <div className={classes.headContainer}>
            <TextField
              required
              fullWidth
              margin="dense"
              id="name_room"
              label="Название"
              type="text"
              value={nameRoom}
              onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                setNameRoom(event.target.value as string)
              }}
            />
            <TextField
              required
              fullWidth
              margin="dense"
              id="about_room"
              label="Информация о помещении"
              type="text"
              value={aboutRoom}
              onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                setAboutRoom(event.target.value as string)
              }}
            />

            <FormControl fullWidth className={classes.multi}>
              <InputLabel id="mutiple-chip-label" margin="dense">
                Смежные помещения
              </InputLabel>
              <Select
                labelId="mutiple-chip-label"
                id="mutiple-chip"
                multiple
                value={commRooms}
                onChange={handleCommChange}
                input={<Input id="select-multiple-chip" />}
                renderValue={(selected) => (
                  <div className={classes.chips}>
                    {(selected as any[]).map((value) => (
                      <Chip
                        key={value.id_room}
                        label={value.name_room}
                        className={classes.chip}
                      />
                    ))}
                  </div>
                )}
                MenuProps={MenuProps}
              >
                {rooms.map((room) => (
                  <MenuItem key={room.id_room} value={room}>
                    {room.name_room}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth className={classes.multi}>
              <InputLabel id="mutiple-chip-label-own" margin="dense">
                Принадлежит отделам
              </InputLabel>
              <Select
                labelId="mutiple-chip-label-own"
                id="mutiple-chip-own"
                multiple
                value={depsOwnRoom}
                onChange={handleOwnChange}
                input={<Input id="select-multiple-chip-own" />}
                renderValue={(selected) => (
                  <div className={classes.chips}>
                    {(selected as any[]).map((value) => (
                      <Chip
                        key={value.id_dep}
                        label={value.name_dep}
                        className={classes.chip}
                      />
                    ))}
                  </div>
                )}
                MenuProps={MenuProps}
              >
                {deps.map((dep) => (
                  <MenuItem key={dep.id_dep} value={dep}>
                    {dep.name_dep}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Отмена
          </Button>
          <Button onClick={onAddHandle} color="primary">
            Добавить
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
