import { makeStyles, Typography } from "@material-ui/core"
import React, { useState } from "react"
import { rusLocale } from "../../rusLocale/ruslocale"
import { blue } from "@material-ui/core/colors"

const useStyles = makeStyles(() => ({
  toolBarContainer: {
    display: "flex",
    justifyContent: "space-between",
    margin: "6px",
  },
  footerContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  toolBarItem: {
    display: "flex",
  },
  footerEmp: {
    marginLeft: 10,
    backgroundColor: blue[200],
  },
  toolBarOption: {
    paddingRight: "10px",
  },
}))


export const RoomCard: React.FC = () => {

  
  return (
    <div style={{ height: 310, width: "100%" }}>
     <Typography variant="h6">Карточка помещения</Typography>
    </div>
  )
}
