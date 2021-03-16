import { Router } from "express"
import { check } from "express-validator"
import empsController from "../controllers/emps.controller"
import authMiddleware from "../middleware/authMiddleware"
const router = Router()

router.post(
  "/",
  authMiddleware,
  [
    check("first_name", "Нет имени").notEmpty(),
    check("last_name", "Нет фамилии").notEmpty(),
    check("id_dep", "Нет отдела").notEmpty(),
  ],
  empsController.create
)
router.get("/", authMiddleware, empsController.getAll)
router.get("/:id", authMiddleware, empsController.getOne)
router.get("/schedule/:id", authMiddleware, empsController.getSchedule)

export default router
