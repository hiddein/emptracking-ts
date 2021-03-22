import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"

import { blue } from "@material-ui/core/colors"

import { BottomNavigation, Container } from "@material-ui/core"

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    position: 'absolute',
    bottom: 0,
    width: '100%',

  },
  title: {
    color: blue[50],
    alignSelf: "center",
    marginLeft: "auto",
    marginRight: "20px",
  },
  nav: {
    display: 'flex',
    backgroundColor: blue[600],
    height: 40,
    alignItems: 'flex-end'
  },
}))

export const Footer: React.FC = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div className={classes.nav}>
        <Typography variant="h6" color="inherit" className={classes.title}>
          2021 EmpTracking System
        </Typography>
      </div>
    </div>
  )
}
