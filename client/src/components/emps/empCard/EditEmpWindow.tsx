import React, { useEffect, useState } from "react"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import { useDispatch } from "react-redux"
import { useTypedSelector } from "../../../hooks/useTypedSelector"
import { addEmp, editEmp, getDeps} from "../../../store/action-creators/emps"
import {
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  Theme,
} from "@material-ui/core"
import { isEmpty } from "lodash"

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
  selectedEmp: any
}
export const EditEmpWindow: React.FC<NewEmpInterface> = (
  props: NewEmpInterface
) => {
  const classes = useStyles()
  const [selectedDep, setSelectedDep] = React.useState("")
  const [idEmp, setIdEmp] = React.useState("")
  const [lastName, setLastName] = React.useState("")
  const [firstName, setFirstName] = React.useState("")
  const [middleName, setMiddleName] = React.useState("")
  const [dbEmp, setDbEmp] = React.useState("")
  const [photoEmp, setPhotoEmp] = React.useState<any>({});
  const [email, setEmail] = React.useState("")
  const [tel, setTel] = React.useState("")
  const [startDayTime, setStartDayTime] = React.useState("")
  const [endDayTime, setEndDayTime] = React.useState("")
  const [lunchTime, setLunchTime] = React.useState("")
  const [teaTime, setTeaTime] = React.useState("")
  const deps = useTypedSelector((state) => state.emp.deps)

  const dispatch = useDispatch()

  useEffect(() => {
    setIdEmp(props.selectedEmp[0].id_emp)
    setSelectedDep(props.selectedEmp[0].id_dep)
    setLastName(props.selectedEmp[0].id_emp)
    setLastName(props.selectedEmp[0].last_name)
    setFirstName(props.selectedEmp[0].first_name)
    setMiddleName(props.selectedEmp[0].middle_name)
    setDbEmp(props.selectedEmp[0].db_emp.split('.').reverse().join('-'))
    setEmail(props.selectedEmp[0].email_emp)
    setTel(props.selectedEmp[0].tel_emp)
    setStartDayTime(props.selectedEmp[0].start_time)
    setEndDayTime(props.selectedEmp[0].end_time)
    setLunchTime(props.selectedEmp[0].lunch_time)
    setTeaTime(props.selectedEmp[0].tea_time)
  }, [props.selectedEmp])

  useEffect(() => {
    dispatch(getDeps())
  }, [])

  const handleClose = () => {
    props.setWindowOpen(false)
  }

  const zero = () => {}

  const onAddHandle = () => {
    const formData = new FormData()
    formData.append('first_name', firstName)
    formData.append('middle_name', middleName)
    formData.append('last_name', lastName)
    formData.append('id_dep', selectedDep)
    formData.append('db_emp', dbEmp)
    formData.append('photo_emp', photoEmp)
    formData.append('email_emp', email)
    formData.append('tel_emp', tel)
    formData.append('startTime', startDayTime)
    formData.append('endTime', endDayTime)
    formData.append('lunchTime', lunchTime)
    formData.append('teaTime', teaTime)
    dispatch(editEmp(formData,idEmp,photoEmp))
  }


  return (
    <div>
      <Dialog
        open={props.windowOpen}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Редактировать информацию о сотруднике
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Пожалуйста, заполните данные о сотруднике
          </DialogContentText>
          <div className={classes.headContainer}>
            <TextField
              className={classes.mainItem}
              margin="dense"
              id="last_name"
              label="Фамилия"
              type="text"
              value={lastName}
                onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                  setLastName(event.target.value as string)
                }}
            />
            <TextField
              className={classes.mainItem}
              margin="dense"
              id="first_name"
              label="Имя"
              type="text"
              value={firstName}
                onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                  setFirstName(event.target.value as string)
                }}
            />
            <TextField
              className={classes.mainItem}
              margin="dense"
              id="middle_name"
              label="Отчество (при наличии)"
              type="text"
              value={middleName}
                onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                  setMiddleName(event.target.value as string)
                }}
            />

            <FormControl className={classes.mainItem} margin="dense">
              <InputLabel htmlFor="dep-select">Отдел</InputLabel>
              <Select
                labelId="dep-select"
                id="dep-select"
                value={selectedDep}
                onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                    setSelectedDep(event.target.value as string)
                }}
              >
                {deps.map((dep: any, index: number) => (
                  <MenuItem value={dep.id_dep} key={dep.id_dep}>
                    {dep.name_dep}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className={classes.headContainer}>
          <TextField
          className={classes.mainItem}
            margin="dense"
            type="date"
            id="db_emp"
            label="Дата рождения"
            variant='outlined'
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            value={dbEmp}
                onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                  setDbEmp(event.target.value as string)
                }}
          />
         
          <TextField
              className={classes.mainItem}
              margin="dense"
              id="photo_emp"
              label="Фото сотрудника"
              type="file"
              variant='outlined'
              InputLabelProps={{
                shrink: true,
              }}
                onChange={(event: any) => {
                  setPhotoEmp(event.target.files[0])

                }}
            />
          
            <TextField
              className={classes.mainItem}
              margin="dense"
              id="email"
              label="E-mail"
              type="email"
              value={email}
                onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                  setEmail(event.target.value as string)
                }}
            />
            <TextField
              className={classes.mainItem}
              margin="dense"
              id="tel_emp"
              label="Номер телефона"
              type="tel"
              value={tel}
              onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                setTel(event.target.value as string)
              }}
            />
            
            <TextField
              className={classes.mainItem}
              margin="dense"
              id="start_time"
              label="Начало рабочего дня"
              type="time"
              defaultValue="08:00"
              InputLabelProps={{
                shrink: true,
              }}
              value={startDayTime}
              onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                setStartDayTime(event.target.value as string)
              }}
            />
            <TextField
              className={classes.mainItem}
              margin="dense"
              id="end_time"
              label="Конец рабочего дня"
              type="time"
              defaultValue="18:00"
              InputLabelProps={{
                shrink: true,
              }}
              value={endDayTime}
              onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                setEndDayTime(event.target.value as string)
              }}
            />
            <TextField
              className={classes.mainItem}
              margin="dense"
              id="lunch_time"
              label="Время на обед (hh:mm)"
              type="time"
              defaultValue="00:30"
              InputLabelProps={{
                shrink: true,
              }}
              value={lunchTime}
              onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                setLunchTime(event.target.value as string)
              }}
            />
            <TextField
              className={classes.mainItem}
              margin="dense"
              id="tea_time"
              label="Свободное время (hh:mm)"
              type="time"
              defaultValue="00:15"
              InputLabelProps={{
                shrink: true,
              }}
              value={teaTime}
              onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                setTeaTime(event.target.value as string)
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
