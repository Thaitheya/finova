import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(process.cwd(), '.env') })

import express from 'express'
import './src/config/db'
import session from 'express-session'
import passport from './src/passport'
import googleAuth from './src/controller/googleAuthController'
import cors from 'cors'
import otpRoutes from './src/controller/otpController';
import helmet from 'helmet'
const app = express()
const port = 3000

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      connectSrc: ["'self'", "http://localhost:5173", "http://localhost:3000"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
    }
  }
}))
app.use(express.json())
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}))

app.use(session({
  secret: process.env.JWT_SECRET!,
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

app.use('/auth', googleAuth)
app.use('/auth', otpRoutes)

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})