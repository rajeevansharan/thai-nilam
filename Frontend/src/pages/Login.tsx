import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { loginUser } from "../services/authService";

interface LoginProps {
  onLogin?: (userData: any) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const data = await loginUser(email, password);
      onLogin?.(data);
    } catch (err: any) {
      setError(err.response?.data?.error || err.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1e293b] relative flex flex-col lg:flex-row items-center justify-center font-sans overflow-hidden px-8 lg:px-24 py-12 gap-16">
      {/* Decorative Background Lighting */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#d4a017]/5 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Left Branding Content */}
      <div className="lg:w-1/2 w-full text-left relative z-10 space-y-6 animate-fade-up">
        <div className="inline-block px-4 py-1.5 bg-white/5 rounded-full border border-white/10 backdrop-blur-md mb-2">
          <span className="text-[10px] uppercase font-bold tracking-[0.4em] text-[#d4a017]">
            Welcome To
          </span>
        </div>
        <h1 className="text-white text-6xl md:text-8xl font-serif font-bold tracking-tight leading-[1.1]">
          Thai Nilam <br/>
          <span className="text-[#d4a017] drop-shadow-[0_0_15px_rgba(212,160,23,0.3)]">Digital</span>
        </h1>
        <div className="h-1 w-20 bg-gradient-to-r from-[#d4a017] to-transparent rounded-full mb-6"></div>
        <p className="text-slate-400 text-lg md:text-xl font-light max-w-lg leading-relaxed">
          The ultimate platform for premium Tamil literature, curated stories, 
          and professional perspectives. Experience modern digital publishing 
          like never before.
        </p>
      </div>

      {/* Right Content - Form Card */}
      <div className="lg:w-1/2 w-full flex justify-center lg:justify-end animate-fade-up" style={{ animationDelay: "0.2s" }}>
        <div className="bg-white rounded-[2.5rem] shadow-[0_35px_80px_rgba(0,0,0,0.3)] border border-white/10 p-8 md:p-10 max-w-md w-full relative overflow-hidden">
          {/* Subtle Accent Line */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#d4a017] to-transparent"></div>

          <div className="mb-6 text-center">
            <div className="inline-block px-3 py-1 bg-[#1e293b]/5 rounded-full mb-3">
              <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-[#1e293b]">
                Thai Nilam Digital
              </span>
            </div>
            <h2 className="text-2xl font-serif font-semibold text-gray-900 mb-1">
              Welcome back
            </h2>
            <p className="text-gray-500 text-xs shadow-sm inline-block px-2 py-0.5 rounded-md bg-gray-50/50">
              Sign in to your account
            </p>
          </div>

          {error && (
            <div className="mb-5 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-medium animate-shake">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400 ml-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@email.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-50/70 border border-transparent focus:border-gray-200 focus:bg-white rounded-xl px-5 py-3.5 text-sm transition-all focus:outline-none focus:ring-4 focus:ring-gray-100/30"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400 ml-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-50/70 border border-transparent focus:border-gray-200 focus:bg-white rounded-xl px-5 py-3.5 text-sm transition-all focus:outline-none focus:ring-4 focus:ring-gray-100/30"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-900 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="pt-3">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#1e293b] text-white font-bold py-4 rounded-xl shadow-xl shadow-slate-900/20 hover:bg-slate-800 transition-all transform hover:-translate-y-1 active:scale-[0.98] disabled:opacity-70 disabled:hover:translate-y-0"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    Accessing...
                  </span>
                ) : (
                  "Login Now"
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 pt-5 border-t border-gray-50 text-center">
            <p className="text-xs text-gray-400 font-medium tracking-wide">
              Don't have an account?{" "}
              <span className="text-[#d4a017] cursor-pointer hover:underline underline-offset-4 font-bold ml-1">
                Create Account
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
