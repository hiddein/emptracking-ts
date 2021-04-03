import { Router } from "express"
import violController from "../controllers/viol.controller"
import authMiddleware from "../middleware/authMiddleware"

const router = Router()

router.get("/access",authMiddleware,violController.getAccessViols)
router.get("/lateness",authMiddleware,violController.getLateness)

export default router
