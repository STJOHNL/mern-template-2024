import express from 'express'
import dotenv from 'dotenv'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import connectDB from './config/database.js'
import sgMail from '@sendgrid/mail'
import fileUpload from 'express-fileupload'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

// Configure dotenv
dotenv.config({ path: './config/.env' })

const port = process.env.PORT || 3000

// Routes imports
import error from './middleware/error.js'
import mainRoutes from './routes/main.js'
import authRoutes from './routes/auth.js'
import userRoutes from './routes/user.js'
import postRoutes from './routes/post.js'

// Connect to MongoDB
connectDB()

const app = express()

// Middleware
app.use(express.json({ extended: true }))
app.use(express.urlencoded({ extended: true }))

// Log
app.use(logger('dev'))

// Cookie Parser
app.use(cookieParser())

// CORS
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
)

// Sendgrid connection
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

// File handling
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

app.use(
  fileUpload({
    limits: { fileSize: 3 * 1024 * 1024 }, // 3MB limit
  })
)
app.use('/uploads', express.static(__dirname + '/uploads'))

// Routes
app.use('/api', mainRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/post', postRoutes)

// Error Routes
app.use(error.notFound)
app.use(error.errorHandler)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
