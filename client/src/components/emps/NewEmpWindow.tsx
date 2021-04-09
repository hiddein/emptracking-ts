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
import { getDeps } from "../../store/action-creators/emps"
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core"

interface NewEmpInterface {
  windowOpen: boolean
  setWindowOpen: Function
}

export const NewEmpWindow: React.FC<NewEmpInterface> = ( props: NewEmpInterface ) => {
  const [age, setAge] = React.useState('');
  const deps = useTypedSelector((state) => state.emp.deps)
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAge(event.target.value as string);
  };
  
  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(getDeps())
   }, [])

  const handleClose = () => {
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
          Добавить нового сотрудника
        </DialogTitle>
        <DialogContent>
           
          <DialogContentText>
            Пожалуйста, заполните данные о сотруднике
          </DialogContentText>
          <TextField
            margin="dense"
            id="last_name"
            label="Фамилия"
            type="email"
            fullWidth
          />
          <TextField
            margin="dense"
            id="first_name"
            label="Имя"
            type="email"
            fullWidth
          />
          <TextField
            margin="dense"
            id="middle_name"
            label="Отчество (при наличии)"
            type="email"
            fullWidth
          />
          
          <FormControl fullWidth>
          <InputLabel  htmlFor="dep-select">Отдел</InputLabel>
        <Select
        fullWidth
        label="Дата рождения"
         margin="dense"
          labelId="dep-select"
          id="dep-select"
          value={age}
          onChange={handleChange}
        >
          {deps.map((dep:any, index:number) => <MenuItem value={dep.name_dep} key={dep.id_dep}>{dep.name_dep}</MenuItem>)}
        </Select>
        </FormControl>
          <TextField
            margin="dense"
            id="middle_name"
            label="Дата рождения"
            type="email"
            fullWidth
          />
          <TextField
            margin="dense"
            id="middle_name"
            label="E-mail"
            type="email"
            fullWidth
          />
          <TextField
            margin="dense"
            id="middle_name"
            label="Номер телефона"
            type="email"
            fullWidth
          />
          <TextField
            margin="dense"
            id="middle_name"
            label="Начало рабочего дня"
            type="email"
            fullWidth
          />
          <TextField
            margin="dense"
            id="middle_name"
            label="Конец рабочего дня"
            type="email"
            fullWidth
          />
          <TextField
            margin="dense"
            id="middle_name"
            label="Время на обед"
            type="email"
            fullWidth
          />
          <TextField
            margin="dense"
            id="middle_name"
            label="Свободное время"
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
      
    </div>
  )
}
