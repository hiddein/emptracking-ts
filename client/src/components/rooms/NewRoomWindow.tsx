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
import { addRoom  } from "../../store/action-creators/rooms"
import {
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  Snackbar,
  Theme,
} from "@material-ui/core"


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
  setOpenSnack: Function
}

export const NewRoomWindow: React.FC<NewEmpInterface> = (
  props: NewEmpInterface
) => {
  const classes = useStyles()
  const [nameRoom, setNameRoom] = React.useState("")
  const [aboutRoom, setAboutRoom] = React.useState("")
  const deps = useTypedSelector((state) => state.emp.deps)

  const dispatch = useDispatch()


  const handleClose = () => {
    props.setWindowOpen(false)
  }

 
  const onAddHandle = () => {
    const formData = new FormData()
    formData.append('name_room', nameRoom)
    formData.append('about_room', aboutRoom)
    dispatch(addRoom(formData))
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
          <DialogContentText>
            Пожалуйста, заполните данные 
          </DialogContentText>
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
