import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import './src/config/db'
import session from 'express-session'
import passport from './src/passport'
import authRoutes from './src/routes/googleAuth'
import cors from 'cors'

const app = express()
const port = 3000

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

app.use('/auth', authRoutes)

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})