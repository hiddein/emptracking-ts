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
router.get("/", authMiddleware, logsController.getAll)
router.get("/delete",authMiddleware,logsController.deleteAll)
router.get("/getMoves",authMiddleware,logsController.getAllMoves)
router.get("/getMovesInRange",authMiddleware,logsController.getMovesInRange)
router.get("/getMovesInRangeById",authMiddleware,logsController.getMovesInRangeById)

export default router
