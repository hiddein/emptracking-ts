import { Router } from "express"
import accessController from "../controllers/access.controller"
import authMiddleware from "../middleware/authMiddleware"
const router = Router()

router.post("/", authMiddleware, accessController.create)
router.get("/", authMiddleware, accessController.getAll)

export default router
