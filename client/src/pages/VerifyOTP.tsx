import { useState, useEffect, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { verifyOTP, sendOTP } from '@/services/auth.service'
import { setTokens } from '@/lib/token'

const VerifyOTP = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [timer, setTimer] = useState(300)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const email = searchParams.get('email') || ''

  // Timer countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 0) { clearInterval(interval); return 0 }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const formatTimer = () => {
    const m = Math.floor(timer / 60)
    const s = timer % 60
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return // numbers only
    const newOtp = [...otp]
    newOtp[index] = value.slice(-1)
    setOtp(newOtp)
    // Auto focus next
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    const pasted = e.clipboardData.getData('text').slice(0, 6).split('')
    const newOtp = [...otp]
    pasted.forEach((char, i) => { if (/\d/.test(char)) newOtp[i] = char })
    setOtp(newOtp)
    inputRefs.current[Math.min(pasted.length, 5)]?.focus()
  }

  const handleVerify = async () => {
    const otpValue = otp.join('')
    if (otpValue.length < 6) {
      setError('Please enter all 6 digits')
      return
    }
    setLoading(true)
    setError('')
    try {
      const otpToken = sessionStorage.getItem('otpToken') || ''
      const data = await verifyOTP(otpToken, otpValue)
      setTokens(data.token, data.refreshToken)
      sessionStorage.removeItem('otpToken')
      navigate('/dashboard')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    try {
      const data = await sendOTP(email)
      sessionStorage.setItem('otpToken', data.otpToken)
      setTimer(300)
      setOtp(['', '', '', '', '', ''])
      setError('')
      inputRefs.current[0]?.focus()
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <div className="flex h-screen">

      {/* Left Sidebar */}
      <div className="flex flex-col justify-between bg-[#13102F] w-[420px] min-w-[420px] h-screen px-10 py-10 relative overflow-hidden">
        <div className="absolute top-[-80px] left-[-80px] w-[300px] h-[300px] rounded-full bg-teal-500 opacity-10" />
        <div className="absolute bottom-[-60px] right-[-60px] w-[240px] h-[240px] rounded-full bg-blue-500 opacity-10" />

        <div className="w-[120px] z-10">
          <img src="./src/assets/finova.png" alt="Logo" className="w-full object-contain" />
        </div>

        <div className="z-10">
          <h1 className="text-white text-4xl font-serif leading-tight mb-4">
            Your money, <br />
            <em className="text-[#1d9e75] font-serif italic">finally</em> making <br />
            sense.
          </h1>
          <p className="text-white/50 text-sm leading-relaxed">
            Track expenses, analyze stocks, and get AI-powered insights — all in one place.
          </p>
        </div>

        <div className="flex gap-8 z-10">
          <div>
            <p className="text-white text-xl font-semibold">₹0</p>
            <p className="text-white/40 text-xs uppercase tracking-widest">Cost</p>
          </div>
          <div>
            <p className="text-white text-xl font-semibold">AI</p>
            <p className="text-white/40 text-xs uppercase tracking-widest">Insights</p>
          </div>
          <div>
            <p className="text-white text-xl font-semibold">100%</p>
            <p className="text-white/40 text-xs uppercase tracking-widest">Private</p>
          </div>
        </div>
      </div>

      {/* Right OTP Form */}
      <div className="flex-1 bg-[#1E1E1E] flex items-center justify-center">
        <div className="w-full max-w-md px-8">

          {/* Back button */}
          <button
            onClick={() => navigate('/login')}
            className="text-white/40 text-sm mb-8 flex items-center gap-2 hover:text-white/70 transition-colors bg-transparent border-none cursor-pointer"
          >
            ← Back to login
          </button>

          <h2 className="text-white text-2xl font-bold mb-2">
            Check your email
          </h2>
          <p className="text-gray-400 text-sm mb-6">
            We sent a 6-digit code to{' '}
            <span className="text-[#1d9e75]">{email}</span>
          </p>

          {/* Sent badge */}
          <div className="flex items-center gap-2 px-4 py-3 bg-[#1d9e75]/10 border border-[#1d9e75]/25 rounded-lg mb-6">
            <div className="w-2 h-2 rounded-full bg-[#1d9e75]" />
            <span className="text-[#1d9e75] text-xs">OTP sent successfully</span>
          </div>

          {/* OTP inputs */}
          <div className="flex gap-2 mb-6" onPaste={handlePaste}>
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => { inputRefs.current[index] = el }}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className={`w-12 h-14 text-center text-2xl font-semibold rounded-lg outline-none transition-all
                  bg-white/5 text-white
                  ${digit
                    ? 'border border-[#1d9e75]/50'
                    : 'border border-white/15'
                  }
                  focus:border-[#1d9e75] focus:bg-[#1d9e75]/08`
                }
              />
            ))}
          </div>

          {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

          <Button
            className="w-full bg-[#1d9e75] hover:bg-[#0f6e56] text-white mb-4"
            onClick={handleVerify}
            disabled={loading || otp.join('').length < 6}
          >
            {loading ? 'Verifying...' : 'Verify & Sign In'}
          </Button>

          <div className="flex justify-between items-center">
            <button
              onClick={handleResend}
              disabled={timer > 0}
              className="text-[#1d9e75] text-xs bg-transparent border-none cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Resend OTP
            </button>
            <span className="text-white/30 text-xs">
              {timer > 0 ? `Expires in ${formatTimer()}` : 'OTP expired'}
            </span>
          </div>

        </div>
      </div>

    </div>
  )
}

export default VerifyOTP