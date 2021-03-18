import React from "react"
import { Navbar } from "./components/Navbar"
import { Footer } from "./components/Footer"
import { makeStyles } from "@material-ui/core/styles"
import { blue } from "@material-ui/core/colors"
import { useRoutes } from "./routes"
import {BrowserRouter as Router} from 'react-router-dom'

const useStyles = makeStyles(() => ({
  root: {
    background: blue[50],
  },
}))

const App: React.FC = () => {
  const routes = useRoutes(false,false)
  const classes = useStyles()
  return (
    <Router>
    <div className={classes.root}>
      <Navbar />
      {routes}
      {/*<Footer />*/}
    </div>
    </Router>
  )
}

export default App
