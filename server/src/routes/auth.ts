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
  (req, res) => {
    const user = req.user as IUser

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    )

    res.redirect(`${process.env.CLIENT_URL}/dashboard?token=${token}`)
  }
)

export default router