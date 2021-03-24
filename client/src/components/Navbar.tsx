import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import { blue } from "@material-ui/core/colors"
import logo from "../img/logo.svg"
import Link from "@material-ui/core/Link"
import { useTypedSelector } from "../hooks/useTypedSelector"
import { Link as RouterLink } from "react-router-dom"
import {
  Button,
  Container,
  Fade,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core"
import { AccountCircle } from "@material-ui/icons"
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle"
import { useDispatch } from "react-redux"
import { logout } from "../store/reducers/userReducer"

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    flexGrow: 0,
    position: "absolute",
    top: 0,
  },
  menuButton: {
    marginRight: theme.spacing(1.25),
    padding: 0,
  },
  title: {
    cursor: "default",
    flexGrow: 0,
    color: blue[50],
    textDecoration: "none",
  },
  link: {
    textDecoration: "none",
  },
  nav: {
    backgroundColor: blue[600],
  },
  img: {
    height: 50,
    padding: "0",
  },
  menuItem: {
    color: blue[50],
    padding: " 15px 20px",
    fontSize: "15px",
    letterSpacing: 1,
    whiteSpace: "nowrap",
  },
  menuContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  userContainer: {
    display: "flex",

    marginRight: "0px",
    paddingRight: "0px",
    justifyContent: "flex-end",
    maxWidth: "250px",
  },
  userTitle: {
    cursor: "default",
    flexGrow: 0,
    fontSize: "16px",
    textAlign: "right",
    verticalAlign: "middle",
    marginTop: 8,
    lineHeight: 1.4,
  },
  subUserTitle: {
    fontSize: '14px',
    color: blue[50],
    fontWeight: 600,
    letterSpacing: 0.5

  },
}))

export const Navbar: React.FC = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const isAuth = useTypedSelector((state) => state.user.isAuth)
  const userRole = useTypedSelector((state) => state.user.userRole)
  const userLogin = useTypedSelector((state) => state.user.userLogin)
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  )
  const userOpen = Boolean(anchorElUser)
  const [anchorElViol, setAnchorElViol] = React.useState<null | HTMLElement>(
    null
  )
  const ViolOpen = Boolean(anchorElViol)
  const [anchorElRoom, setAnchorElRoom] = React.useState<null | HTMLElement>(
    null
  )
  const RoomOpen = Boolean(anchorElRoom)

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElViol(event.currentTarget)
  }

  const handleClickRoom = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElRoom(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorElViol(null)
    setAnchorElUser(null)
    setAnchorElRoom(null)
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.nav}>
        <Toolbar>
          <Link component={RouterLink} to="/dashboard" className={classes.menuButton} color="inherit">
              <img src={logo} className={classes.img}></img>

          </Link>

          <Typography variant="h5" className={classes.title}>
            EmpTracking
          </Typography>
          {isAuth && (
            <React.Fragment>
              <Container className={classes.menuContainer}>
                <Button
                  component={RouterLink}
                  to="/dashboard"
                  className={classes.menuItem}
                >
                  Главная панель
                </Button>
                <Button
                  component={RouterLink}
                  to="/movements"
                  className={classes.menuItem}
                >
                  Перемещения
                </Button>
                <Button
                  className={classes.menuItem}
                  aria-controls="fade-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  Нарушения
                </Button>
                <Menu
                  id="fade-menu"
                  anchorEl={anchorElViol}
                  keepMounted
                  open={ViolOpen}
                  onClose={handleClose}
                  TransitionComponent={Fade}
                >
                  <MenuItem
                    component={RouterLink}
                    to="/violation/access"
                    onClick={handleClose}
                  >
                    Нарушения прав доступа
                  </MenuItem>
                  <MenuItem
                    component={RouterLink}
                    to="/violation/workhours"
                    onClick={handleClose}
                  >
                    Нарушения рабочего времени
                  </MenuItem>
                </Menu>
                <Button
                  component={RouterLink}
                  to="/emps"
                  className={classes.menuItem}
                >
                  Сотрудники
                </Button>
                <Button
                  className={classes.menuItem}
                  aria-controls="fade-menu"
                  aria-haspopup="true"
                  onClick={handleClickRoom}
                >
                  Помещения
                </Button>
                <Menu
                  id="fade-menu"
                  anchorEl={anchorElRoom}
                  keepMounted
                  open={RoomOpen}
                  onClose={handleClose}
                  TransitionComponent={Fade}
                >
                  <MenuItem
                    component={RouterLink}
                    to="/rooms"
                    onClick={handleClose}
                  >
                    Помещения предприятия
                  </MenuItem>
                  <MenuItem
                    component={RouterLink}
                    to="/rooms/stat"
                    onClick={handleClose}
                  >
                    Статистика посещений
                  </MenuItem>
                </Menu>
              </Container>
              <Container className={classes.userContainer}>
                <Typography variant="h6" className={classes.userTitle}>
                  {userLogin}
                  <br></br>
                  
                  <Typography  className={classes.subUserTitle}>
                  {userRole == "admin" ? "Администратор" : "Пользователь"}
                  </Typography>
                </Typography>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                  size="medium"
                >
                  {userRole == "admin" ? (
                    <SupervisedUserCircleIcon fontSize="large" />
                  ) : (
                    <AccountCircle fontSize="large" />
                  )}
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={userOpen}
                  onClose={handleClose}
                >
                  {userRole == "admin" && (
                    <MenuItem
                      component={RouterLink}
                      to="/giveaccess"
                      onClick={handleClose}
                    >
                      Новый пользователь
                    </MenuItem>
                  )}
                  <MenuItem onClick={(e) =>{
                    handleClose()
                    dispatch(logout())
                  }}>Выйти из системы</MenuItem>
                </Menu>
              </Container>
            </React.Fragment>
          )}
        </Toolbar>
      </AppBar>
    </div>
  )
}
