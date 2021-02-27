import { Router } from "express"
import userRouter from "./userRouter"
import logsRouter from "./logsRouter"
import empsRouter from "./empsRouter"

const router = Router()

router.use("/user", userRouter)
router.use("/logs", logsRouter)
router.use('/emps',empsRouter)
//router.use('/desp',)


export default router
