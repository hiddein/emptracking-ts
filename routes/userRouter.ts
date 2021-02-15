import {Router} from 'express'
import userController from '../controllers/user.controller'
const router = Router()
import {check} from 'express-validator'
import authMiddleware from '../middleware/authMiddleware'
import roleMiddleware from '../middleware/roleMiddleware'

router.post('/registration',[
    check('login','Логин не может быть пустым').notEmpty(),
    check('password','Пароль должен быть больше 4 и меньше 12 символов').isLength({min:4,max:12}),
    check('role','Введите верную роль').isIn(['admin', 'user']),
    roleMiddleware(['admin']),
],userController.registration)
router.post('/login',userController.login)
router.get('/auth',authMiddleware,userController.check)



export default router