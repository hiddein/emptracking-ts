import { Router } from "express"
import logsController from "../controllers/logs.controller"
import { check } from "express-validator"
import authMiddleware from "../middleware/authMiddleware"
const router = Router()

router.post(
  "/",
  [
    check("emp", "Нет информации о сотруднике").notEmpty(),
    check("route", "Нет информации о пути").notEmpty(),
    check("time", "Нет информации о времени прохождения").notEmpty(),
  ],
  logsController.create
)

export default router
