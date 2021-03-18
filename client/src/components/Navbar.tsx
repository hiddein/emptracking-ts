import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"
import { blue, deepPurple } from "@material-ui/core/colors"
import logo from '../img/logo.svg';
import Link from '@material-ui/core/Link';


const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      flexGrow: 1,
      position: 'absolute',
      top: 0
    },
    menuButton: {
      marginRight: theme.spacing(1.25),
      padding : 0
    },
    title: {
      flexGrow: 1,
      color: blue[50],
    },
    nav: {
        backgroundColor : blue[600],
    },
    img: {
        height:50,
        padding:'0'
    }
  }));

export const Navbar: React.FC = () => {
    const classes = useStyles();

    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.nav}>
          <Toolbar>
            <Link className={classes.menuButton} href="#" color="inherit" >
             <img src={logo} className={classes.img}></img>
            </Link>
            <Link variant="h6" className={classes.title} underline='none' href='#'>
              EmpTracking
            </Link>
            
          </Toolbar>
        </AppBar>
      </div>
    );
}
