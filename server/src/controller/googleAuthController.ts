import express from 'express'
import passport from 'passport'
import jwt from 'jsonwebtoken'
import { IUser } from '../types/user'
const router = express.Router()

router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}))

router.get('/google/callback',
  passport.authenticate('google', { session: false }),
  async (req, res) => {
    const user = req.user as IUser

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: '15m' }
    )

    const refreshToken = jwt.sign(
      { id: user.id },
      process.env.JWT_REFRESH_SECRET!,
      { expiresIn: '7d' }
    )

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 15 * 60 * 1000
    })

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000
    })

    res.redirect(`${process.env.CLIENT_URL}/dashboard`)
  }
)
router.post('/logout', (req, res) => {
   res.clearCookie('token')
   res.json({ message: 'Logged out successfully' })
})  
export default router