import { Button, Card, CardActions, CardContent, Grid, InputAdornment, makeStyles, TextField, Typography } from "@material-ui/core"
import AccountCircle from '@material-ui/icons/AccountCircle';
import React from "react"

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    minHeight: "100vh",
    padding: "20px",
  },
  title:{
    fontSize: 25,
    alignSelf: 'center',
  },
  pos: {
    marginBottom: 12,
  },
}))

export const AuthPage: React.FC = () => {
  const classes = useStyles()
  return (
    <Grid
      container
      alignItems="center"
      justify="center"
      className={classes.root}
    >
      <Grid item xs={4}>
        <Card >
        <CardContent>
        <Typography className={classes.title} color='primary' gutterBottom>
          Авторизация в системе
        </Typography>

        <TextField
        id="input-with-icon-textfield"
        label="Логин"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
      />
      <br></br>
      <TextField
          id="standard-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
        />
      </CardContent>
      <CardActions>
        <Button size="large">Войти</Button>
      </CardActions>
        </Card>
      </Grid>
    </Grid>
  )
}
