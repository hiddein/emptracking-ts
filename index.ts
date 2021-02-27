    import express from 'express'
    import fileupload from 'express-fileupload'
    import cors from 'cors'
    import indexRoutes from './routes/index'
    import dotenv from 'dotenv'

    dotenv.config()
    const PORT = process.env.PORT || 5000
    const app = express()
    app.use(cors())
    app.use(express.json())
    app.use(fileupload({}))
    app.use('/api',indexRoutes)

    const start = async () => {
        try {
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
        } catch(e) {
    console.log(e)
        }
    }

    start()
