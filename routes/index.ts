import { Router } from "express"
import userRouter from "./userRouter"
import logsRouter from "./logsRouter"
import empsRouter from "./empsRouter"
import depsRouter from "./depsRouter"
import accessRouter from "./accessRouter"
import roomRouter from "./roomRouter"
import routeRouter from "./routeRouter"
import violRouter from "./violRouter"

const router = Router()

router.use("/user", userRouter)
router.use("/logs", logsRouter)
router.use("/emps", empsRouter)
router.use("/deps", depsRouter)
router.use("/access", accessRouter)
router.use("/room", roomRouter)
router.use("/route", routeRouter)
router.use("/viol", violRouter)

export default router
