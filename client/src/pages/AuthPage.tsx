import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core"
import { blue } from "@material-ui/core/colors"
import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { login as loginAction } from "../store/action-creators/user"

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    minHeight: "600px",
    padding: "20px",
    height: '100vh'
  },
  title: {
    color: blue[800],
    fontSize: 25,
    marginBottom: 25,
  },
  button: {
    background: "linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)",
    width: "100%",
  },
  content: {
    minWidth: "200px",
  },
  card: {
    borderRadius: 10,
  },
  item: {
    width: "100%",
  },
  padding: {
    padding: 25,
  },
}))

export const AuthPage: React.FC = () => {
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")
  const classes = useStyles()
  const dispatch = useDispatch()
  return (
    <Grid
      container
      alignItems="center"
      justify="center"
      className={classes.root}
    >
      <Grid item xs={4} className={classes.content}>
        <Card className={classes.card}>
          <CardContent className={classes.padding}>
            <Typography className={classes.title} color="primary" gutterBottom>
              Авторизация
            </Typography>

            <Grid
              container
              spacing={4}
              alignItems="flex-start"
              direction="column"
            >
              <Grid item className={classes.item}>
                <TextField
                  id="input-with-icon-grid"
                  label="Логин"
                  fullWidth={true}
                  value={login}
                  onChange={(event)=>{ setLogin(event.target.value)}}
                />
              </Grid>
              <Grid item className={classes.item}>
                <TextField
                  id="standard-password-input"
                  label="Пароль"
                  type="password"
                  autoComplete="current-password"
                  fullWidth={true}
                  value={password}
                  onChange={(event)=>{ setPassword(event.target.value)}}
                />
              </Grid>
            </Grid>
          </CardContent>
          <CardActions className={classes.padding}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              className={classes.button}
              onClick={() =>{dispatch(loginAction(login,password))}}
            >
              Войти в систему
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  )
}
