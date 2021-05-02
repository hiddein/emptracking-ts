import React, { useEffect } from "react"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogTitle from "@material-ui/core/DialogTitle"
import { makeStyles, Theme } from "@material-ui/core"
import { red, blue } from "@material-ui/core/colors"
import { deleteEmp } from "../../../store/action-creators/emps"
import { useDispatch } from "react-redux"

const useStyles = makeStyles((theme: Theme) => ({
  mainItemButton: {
    backgroundColor: red[300],
    color: blue[900],
  },
}))

interface DeleteEmpInterface {
  windowOpen: boolean
  setWindowOpen: Function
  setMainWindowOpen: Function
  selectedEmp: any
  setOpenSnack: Function
}
export const AgreeDeleteWindow: React.FC<DeleteEmpInterface> = (
  props: DeleteEmpInterface
) => {
  const classes = useStyles()
  const [idEmp, setIdEmp] = React.useState("")
  const dispatch = useDispatch()

  useEffect(() => {
    setIdEmp(props.selectedEmp[0].id_emp)
  }, [props.selectedEmp])

  const handleCloseAccept = () => {
    dispatch(deleteEmp(idEmp))
    props.setMainWindowOpen(false)
    props.setWindowOpen(false)
    props.setOpenSnack(true)
  }

  return (
    <div>
      <Dialog
        open={props.windowOpen}
        onClose={() => props.setWindowOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Подтвердите удаление сотрудника
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => props.setWindowOpen(false)} color="primary">
            Отмена
          </Button>
          <Button
            onClick={handleCloseAccept}
            className={classes.mainItemButton}
            autoFocus
          >
            Удалить сотрудника
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
