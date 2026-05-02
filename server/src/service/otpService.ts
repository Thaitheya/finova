import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'

export const generateOTP = () => {
  return (Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000).toString()
}

export const createOTPToken = (email: string, otp: string) => {
  return jwt.sign(
    { email, otp },
    process.env.JWT_SECRET!,
    { expiresIn: '5m' }
  )
}

export const verifyToken = (otpToken: string, enteredOTP: string) => {
  try {
    const decoded = jwt.verify(otpToken, process.env.JWT_SECRET!) as {
      email: string
      otp: string
    }
    return decoded.otp === enteredOTP ? decoded.email : null
  } catch {
    return null
  }
}

export const sendOTPEmail = async (email: string, otp: string) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  })

  await transporter.sendMail({
    from: `"Finova" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Your Finova Login OTP',
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 400px;">
        <h2 style="color: #4F46E5;">Finova Login</h2>
        <p>Your one-time password is:</p>
        <h1 style="color: #4F46E5; letter-spacing: 8px;">${otp}</h1>
        <p>Expires in <strong>5 minutes</strong>.</p>
        <p style="color: #999;">If you didn't request this, ignore this email.</p>
      </div>
    `
  })
}