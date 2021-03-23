import { CircularProgress, makeStyles } from "@material-ui/core"
import { blue } from "@material-ui/core/colors"

import React from "react"


const useStyles = makeStyles(() => ({
  center: {
    display: 'flex',
    alignItems: 'center',
    height: '100vh',
    justifyContent: 'center'

  },
  loader: {
    display: 'inline-block',
    position: 'relative',
    color: blue[500]

  },
}))

interface propsLoader {
    size: number,
}


export const Loader: React.FC<propsLoader> = (props:propsLoader) => {
  const classes = useStyles()

  return (
    <div className={classes.center}>
      <div className={classes.loader}>
      <CircularProgress size={props.size} className={classes.loader} />
      </div>
    </div>
  )
}
