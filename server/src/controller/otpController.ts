import express from 'express'
import jwt from 'jsonwebtoken'
import { 
  generateOTP, 
  createOTPToken, 
  verifyToken,
  sendOTPEmail
} from '../service/otpService'

const router = express.Router()

router.post('/send-otp', async (req, res) => {
  const { email } = req.body

  if (!email) {
    res.status(400).json({ message: 'Email is required' })
    return
  }

  try {
    const otp = generateOTP()
    const otpToken = createOTPToken(email, otp)
    await sendOTPEmail(email, otp)
    res.json({ otpToken })
  } catch (error) {
    console.error('OTP Error:', error)
    res.status(500).json({ message: 'Error sending OTP', error })
  }
})

router.post('/verify-otp', async (req, res) => {
  const { otpToken, otp } = req.body

  if (!otpToken || !otp) {
    res.status(400).json({ message: 'OTP token and OTP are required' })
    return
  }

  try {
    const email = verifyToken(otpToken, otp)

    if (!email) {
      res.status(400).json({ message: 'Invalid or expired OTP' })
      return
    }

    const token = jwt.sign(
      { email },
      process.env.JWT_SECRET!,
      { expiresIn: '15m' }
    )

    const refreshToken = jwt.sign(
      { email },
      process.env.JWT_REFRESH_SECRET!,
      { expiresIn: '7d' }
    )

    res.json({ token, refreshToken })
  } catch (error) {
    console.error('Verify OTP error:', error)
    res.status(500).json({ 
      message: 'Error verifying OTP', 
      error: error instanceof Error ? error.message : error
    })
  }
})

export default router