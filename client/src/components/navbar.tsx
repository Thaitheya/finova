import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  onPrivacy?: () => void;
  onFeedback?: () => void;
  onHelp?: () => void;
}

const Navbar = ({ onPrivacy, onFeedback, onHelp }: NavbarProps) => {
  const navigate = useNavigate();

  return (
    <nav className="flex items-center justify-between px-10 py-4 bg-[#1E1E1E] sticky top-0 z-50">
      <img src="./src/assets/finova.png" alt="Logo" className="w-24 h-auto" />
      <div className="flex items-center gap-6 text-white/70 text-sm">
        <button
          onClick={onPrivacy}
          className="hover:text-white transition-colors bg-transparent border-none cursor-pointer text-white/70 text-sm"
        >
          Privacy
        </button>
        <button
          onClick={onFeedback}
          className="hover:text-white transition-colors bg-transparent border-none cursor-pointer text-white/70 text-sm"
        >
          Feedbacks
        </button>
        <button
          onClick={onHelp}
          className="hover:text-white transition-colors bg-transparent border-none cursor-pointer text-white/70 text-sm"
        >
          Help
        </button>
        <a
          href="https://github.com/Thaitheya/finova"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition-colors"
        >
          Github
        </a>
        <Button
          variant="outline"
          className="bg-transparent border-gray-600 text-white hover:bg-white/10 w-24"
          onClick={() => navigate("/login")}
        >
          Login
        </Button>
        <Button
          className="bg-[#1d9e75] hover:bg-[#0f6e56] text-white w-24"
          onClick={() => navigate("/login")}
        >
          Sign up
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
