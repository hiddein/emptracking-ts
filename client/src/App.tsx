import React, { useEffect } from "react"
import { Navbar } from "./components/Navbar"
import { Footer } from "./components/Footer"
import { createMuiTheme, makeStyles, ThemeProvider } from "@material-ui/core/styles"
import { blue } from "@material-ui/core/colors"
import { useRoutes } from "./routes"
import {BrowserRouter as Router} from 'react-router-dom'
import { useTypedSelector } from "./hooks/useTypedSelector"
import { useDispatch } from "react-redux"
import { autologin } from "./store/actions/user"
import { ruRU } from '@material-ui/core/locale';

const useStyles = makeStyles(() => ({
  root: {
    background: blue[50],
    position: 'relative',
    minHeight: "100vh"
  },
}))
const App: React.FC = () => {
  const theme = createMuiTheme({
    palette: {
     
    },
    
  },ruRU);
  const isAuth = useTypedSelector(state => state.user.isAuth)
  const dispatch = useDispatch()
  const userRole = useTypedSelector(state => state.user.userRole)
  const routes = useRoutes(isAuth,userRole=='admin'? true: false)
  const classes = useStyles()

  useEffect(() => {
    dispatch(autologin())
  }, [])

  return (
    <ThemeProvider theme={theme}>
    <Router>
    <div className={classes.root}>
      <Navbar />
      {routes}
      <Footer />
    </div>
    </Router>
    </ThemeProvider>
  )
}

export default App
