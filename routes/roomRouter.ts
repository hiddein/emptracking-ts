import { Router } from "express"
import roomController from "../controllers/room.controller"
import authMiddleware from "../middleware/authMiddleware"
const router = Router()

router.post("/", authMiddleware, roomController.create)
router.get("/", authMiddleware, roomController.getAll)
router.get("/:id", authMiddleware, roomController.getOne)
router.get("/start/:id", authMiddleware, roomController.getStart)
export default router
