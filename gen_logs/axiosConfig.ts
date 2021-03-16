import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

const $authHost = axios.create ({
    baseURL : process.env.API_URL_FOR_GEN
})

 const authInterceptor = (config:any) =>{
     config.headers.authorization = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTYxNTg4NjU4MSwiZXhwIjoxNjE1OTcyOTgxfQ.DA1hCuPe4kWXsMHWmuTwcTdjeFolHbKVzloWdoyBDDw'
     return config
 }
 $authHost.interceptors.request.use(authInterceptor)

 export default $authHost