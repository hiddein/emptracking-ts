import { Router } from "express"
import logsController from "../controllers/logs.controller"
import { check } from "express-validator"
import authMiddleware from "../middleware/authMiddleware"
const router = Router()

router.post("/", authMiddleware, logsController.create)
router.get("/", authMiddleware, logsController.getAll)

export default router
