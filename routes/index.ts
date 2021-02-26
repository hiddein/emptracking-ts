import { Router } from "express"
import userRouter from "./userRouter"
import logsRouter from "./logsRouter"

const router = Router()

router.use("/user", userRouter)
router.use("/logs", logsRouter)
//router.use('/premises',)
//router.use('/employees',)

export default router
