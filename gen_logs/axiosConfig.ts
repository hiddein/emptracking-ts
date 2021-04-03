import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

const $authHost = axios.create ({
    baseURL : process.env.API_URL_FOR_GEN
})

 const authInterceptor = (config:any) =>{
     config.headers.authorization = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiLQlNC10L3QuNGBINCd0LjQutC-0LvQsNC10LIiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2MTc0NjAyNzMsImV4cCI6MTYxNzU0NjY3M30.3edzdj6wOe27uGCdCiLd8pI160Cib3wBrL8RWXj3JWE'
     return config
 }
 $authHost.interceptors.request.use(authInterceptor)

 export default $authHost