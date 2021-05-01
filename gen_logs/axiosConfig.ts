import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

const $authHost = axios.create ({
    baseURL : process.env.API_URL_FOR_GEN
})

 const authInterceptor = (config:any) =>{
     config.headers.authorization = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiLQlNC10L3QuNGBINCd0LjQutC-0LvQsNC10LIiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2MTk3ODIyMTEsImV4cCI6MTYxOTg2ODYxMX0.w_blRI6aotCiBktY8q-8vRHgueztNFUuLlPKHK-3edc'
     return config
 }
 $authHost.interceptors.request.use(authInterceptor)

 export default $authHost