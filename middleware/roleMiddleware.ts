import jwt from 'jsonwebtoken'
import {Request,Response} from 'express' 
import dotenv from 'dotenv'
dotenv.config()


export default (rolesUser:string[]) =>{
    return function (req:any,res:any,next: Function):any {
        
    if(req.method === 'OPTIONS'){
        next()
    }
    try{
        
        const token = req.headers.authorization?.split(' ')[1]
        if (!token){
            return res.status(403).json({message:"Пользователь не авторизован"})
        }
        const decodedData= jwt.verify(token , process.env.TOKEN_SECRET || 'fakeSecret')
        const {role} :any = decodedData
        let hasrole:boolean = false
        rolesUser.forEach(roleU=>{
            if(roleU.includes(role)){
                hasrole = true
            }
        })
         if(!hasrole){
           return res.status(403).json({message: "У вас нет доступа"})
        }
        next()

    }
    catch (e){
        console.log(e)
        return res.status(403).json({message:"Пользователь не авторизован"})
    }
    }
}