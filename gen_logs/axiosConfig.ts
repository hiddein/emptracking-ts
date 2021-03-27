import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

const $authHost = axios.create ({
    baseURL : process.env.API_URL_FOR_GEN
})

 const authInterceptor = (config:any) =>{
     config.headers.authorization = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiLQlNC10L3QuNGBINCd0LjQutC-0LvQsNC10LIiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2MTY3ODAzNDgsImV4cCI6MTYxNjg2Njc0OH0.tey523gi9rwl_Ko-dlsMEO8O_zBtgNZfl6flW2em3wY'
     return config
 }
 $authHost.interceptors.request.use(authInterceptor)

 export default $authHost