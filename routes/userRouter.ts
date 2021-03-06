import {Router} from 'express'
import userController from '../controllers/user.controller'
import {check} from 'express-validator'
import authMiddleware from '../middleware/authMiddleware'
import roleMiddleware from '../middleware/roleMiddleware'

const router = Router()
router.post('/registration',[
    check('login','Логин не может быть пустым').notEmpty(),
    check('password','Пароль должен быть больше 0 и меньше 12 символов').isLength({min:1,max:12}),
    check('role','Введите верную роль').isIn(['admin', 'user']),
    roleMiddleware(['admin']),
],userController.registration)
router.post('/login',userController.login)
router.get('/auth',authMiddleware,userController.auth)



export default router