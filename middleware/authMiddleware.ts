import jwt from 'jsonwebtoken'
import {Request,Response} from 'express' 
import dotenv from 'dotenv'
dotenv.config()

export default function (req:any,res:Response,next: Function){
 
    if(req.method === 'OPTIONS'){
        next()
    }
    try{
        
        const token = req.headers.authorization?.split(' ')[1]
        
        if (!token){
            return res.status(403).json({message:"Пользователь не авторизован"})
        }

        const decodedData = jwt.verify(token , process.env.TOKEN_SECRET || 'fakeSecret')
        req.user = decodedData
        next()

    }
    catch (e){
        console.log(e)
        return res.status(403).json({message:"Пользователь не авторизован"})
    }
}