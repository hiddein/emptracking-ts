import { Router } from "express"
import { check } from "express-validator"
import depsController from "../controllers/deps.controller"
import authMiddleware from "../middleware/authMiddleware"
const router = Router()

router.post("/", authMiddleware, depsController.create)
router.get("/", authMiddleware, depsController.getAll)
router.get("/:id", authMiddleware, depsController.getOne)

export default router
