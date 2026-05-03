import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { sendOTP, googleLogin } from "@/services/auth.service";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { MailIcon } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();

  const handleSendOTP = async () => {
    if (!email) return;
    setLoading(true);
    setError("");
    try {
      const data = await sendOTP(email);
      sessionStorage.setItem("otpToken", data.otpToken);
      navigate(`/verify-otp?email=${email}`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Sidebar */}
      <div className="flex flex-col justify-between bg-[#13102F] w-[420px] min-w-[420px] h-screen px-10 py-10 relative overflow-hidden">
        <div className="absolute top-[-80px] left-[-80px] w-[300px] h-[300px] rounded-full bg-teal-500 opacity-10" />
        <div className="absolute bottom-[-60px] right-[-60px] w-[240px] h-[240px] rounded-full bg-blue-500 opacity-10" />
        <div className="w-[120px] z-10">
          <img
            src="./src/assets/finova.png"
            alt="Logo"
            className="w-full object-contain"
          />
        </div>
        <div className="z-10">
          <h1 className="text-white text-4xl font-serif leading-tight mb-4">
            Your money, <br />
            <em className="text-[#1d9e75] font-serif italic">
              finally
            </em> making <br />
            sense.
          </h1>
          <p className="text-white/50 text-sm leading-relaxed">
            Track expenses, analyze stocks, and get AI-powered insights — all in
            one place.
          </p>
        </div>
        <div className="flex gap-8 z-10">
          <div>
            <p className="text-white text-xl font-semibold">₹0</p>
            <p className="text-white/40 text-xs uppercase tracking-widest">
              Cost
            </p>
          </div>
          <div>
            <p className="text-white text-xl font-semibold">AI</p>
            <p className="text-white/40 text-xs uppercase tracking-widest">
              Insights
            </p>
          </div>
          <div>
            <p className="text-white text-xl font-semibold">100%</p>
            <p className="text-white/40 text-xs uppercase tracking-widest">
              Private
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 bg-[#1E1E1E] flex items-center justify-center">
        <div className="w-full max-w-md px-8">
          <h2 className="text-white text-2xl font-bold text-center mb-8">
            Welcome Back
          </h2>

          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-3 bg-transparent border-gray-600 text-white hover:bg-white/10 mb-6"
            onClick={googleLogin}
          >
            <img
              src="./src/assets/google.png"
              alt="Google"
              className="w-5 h-5 object-contain"
            />
            Continue with Google
          </Button>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-gray-700" />
            <span className="text-gray-400 text-sm">or sign in with email</span>
            <div className="flex-1 h-px bg-gray-700" />
          </div>

          <div className="flex flex-col gap-4">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent border-gray-600 text-white placeholder:text-gray-500"
            />
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <Button
              className="w-full bg-[#1d9e75] hover:bg-[#0f6e56] text-white"
              onClick={handleSendOTP}
              disabled={loading}
            >
              {loading ? "Sending..." : "Send OTP"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
