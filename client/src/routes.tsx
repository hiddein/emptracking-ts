import React from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import { MainPanelPage } from "./pages/MainPanelPage"
import { MovementPage } from "./pages/MovementPage"
import { EmployeePage } from "./pages/EmployeePage"
import { RoomInfoPage } from "./pages/RoomInfoPage"
import { AccessViolationPage } from "./pages/AccessViolationPage"
import { HoursViolationPage } from "./pages/HoursViolationPage"
import { MovesStatPage } from "./pages/MovesStatPage"
import { AuthPage } from "./pages/AuthPage"
import { GiveAccessPage } from "./pages/GiveAccessPage"

export const useRoutes = (isAuthenticated: boolean, isAdmin: boolean) => {
    if (isAuthenticated && isAdmin) {
        return (
          <Switch>
            <Route path="/dashboard" exact>
              <MainPanelPage />
            </Route>
            <Route path="/movements" exact>
              <MovementPage />
            </Route>
            <Route path="/emps" exact>
              <EmployeePage />
            </Route>
            <Route path="/rooms" exact>
              <RoomInfoPage />
            </Route>
            <Route path="/violation/access" exact>
              <AccessViolationPage />
            </Route>
            <Route path="/violation/workhours" exact>
              <HoursViolationPage />
            </Route>
            <Route path="/movements/stat" exact>
              <MovesStatPage />
            </Route>
            <Route path="/giveaccess" exact>
              <GiveAccessPage />
            </Route>
            <Redirect to="/dashboard" />
          </Switch>
        )
      }
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/dashboard" exact>
          <MainPanelPage />
        </Route>
        <Route path="/movements" exact>
          <MovementPage />
        </Route>
        <Route path="/emps" exact>
          <EmployeePage />
        </Route>
        <Route path="/rooms" exact>
          <RoomInfoPage />
        </Route>
        <Route path="/violation/access" exact>
          <AccessViolationPage />
        </Route>
        <Route path="/violation/workhours" exact>
          <HoursViolationPage />
        </Route>
        <Route path="/movements/stat" exact>
          <MovesStatPage />
        </Route>
        <Redirect to="/dashboard" />
      </Switch>
    )
  }
  return (
    <Switch>
      <Route path="/" exact>
        <AuthPage />
      </Route>
      <Redirect to="/" />
    </Switch>
  )
}
