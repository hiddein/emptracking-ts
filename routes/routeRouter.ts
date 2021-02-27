import { Router } from "express"
import routeController from "../controllers/route.controller"
import authMiddleware from "../middleware/authMiddleware"
const router = Router()

router.post("/", authMiddleware, routeController.create)
router.get("/", authMiddleware, routeController.getAll)
router.get("/:id", authMiddleware, routeController.getOne)

export default router
