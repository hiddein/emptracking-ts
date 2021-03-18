import {Request,Response} from 'express' 
import { QueryResult} from 'pg'
import {pool} from '../db'
import bcrypt from 'bcryptjs'
import {validationResult} from 'express-validator'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()



const generateAccessToken = (id:number,email:string,role:string):string =>{
    const payload = {
        id,
        email,
        role
    }
    return jwt.sign(payload,process.env.TOKEN_SECRET || 'fakeSecret',{expiresIn:'24h'})
}
class UserController {
    async registration(req:Request,res:Response):Promise<Response>{
        try{
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({message:'Ошибка при регистрации', errors})
            }
            const {login, password, role} = await req.body
            const candidate = await pool.query('SELECT * FROM client WHERE login=$1 ',[login])
            if(candidate.rows.length){
                return res.status(400).json({message:'Пользователь с таким логином уже существует'})
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            const response: QueryResult = await pool.query('INSERT into client (login,password,role) VALUES ($1,$2,$3)',[login,hashPassword,role])
            return res.status(200).json({
                message: "Пользователь успешно зарегистрирован",
                body:{
                    user:{
                        login,hashPassword,role
                    }
                }
            })
          } 
          catch (e){
              console.log(e)
              return res.status(500).json('Ошибка сервера')
          }
    }

    async login(req:Request,res:Response):Promise<Response>{
        try{
            const {login, password,role} = await req.body
            const user: QueryResult = await pool.query('SELECT * FROM client WHERE login=$1 ',[login])
            if(!user.rows.length){
                return res.status(400).json({message:`Пользователь с логином ${login} не найден`})
            }
            const validPassword = bcrypt.compareSync(password,user.rows[0].password)
            if(!validPassword){
                return res.status(400).json({message:'Введен неверный пароль'})
            }

            const token = generateAccessToken(user.rows[0].client_id,user.rows[0].login,user.rows[0].role)
            return res.status(200).json({token, userLogin:user.rows[0].login, UserRole: user.rows[0].role})
          } 
          catch (e){
              console.log(e)
              return res.status(500).json('Ошибка сервера')
          }
       
       
    }

    async check(req:any,res:Response):Promise<Response>{

        const token = generateAccessToken(req.body.id,req.body.login,req.body.role)
              return res.json({token})

       
       
    }
 

}
export  default new UserController()