import {Router} from 'express'
const router = Router()
import userRouter from './userRouter'


router.use('/user', userRouter)
//router.use('/premises',)
//router.use('/employees',)
//router.use('/logs',)

export default router