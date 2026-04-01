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
    <div className="flex min-h-screen font-sans">
      {/* Left Contrast Section */}
      <div className="hidden lg:flex lg:w-3/5 bg-[#1e293b] flex-col items-center justify-center p-12 text-center relative overflow-hidden">
        {/* Abstract subtle pattern or gradient could go here */}
        <div className="relative z-10">
          <h1 className="text-white text-6xl md:text-8xl font-serif font-bold tracking-[0.1em] mb-6">
            Thai Nilam
          </h1>
          <div className="h-px w-24 bg-white/20 mx-auto mb-8"></div>
          <p className="text-slate-400 text-lg md:text-xl font-light max-w-md leading-relaxed">
            Your gateway to premium stories, ideas, and perspectives — delivered
            monthly.
          </p>
        </div>

        {/* Subtle background decoration */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-sky-500/5 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      {/* Right Form Section */}
      <div className="w-full lg:w-2/5 bg-white flex flex-col justify-center px-8 sm:px-16 lg:px-24 py-12">
        <div className="max-w-md w-full mx-auto">
          <div className="mb-10 text-left">
            <h2 className="text-3xl font-serif font-semibold text-gray-900 mb-2">
              Welcome back
            </h2>
            <p className="text-gray-500 text-sm">
              Sign in to access your purchased issues.
            </p>
          </div>

          {/* Demo Credentials Alert */}
          <div className="bg-amber-50/50 border border-amber-100 rounded-xl p-4 mb-8 text-left">
            <p className="text-[11px] uppercase font-bold tracking-widest text-amber-600 mb-2">
              Demo Credentials
            </p>
            <div className="space-y-1 text-sm font-medium text-gray-700">
              <p>
                Admin:{" "}
                <span className="text-gray-900">admin@thainilam.com</span> /{" "}
                <span className="text-gray-900">password123</span>
              </p>
              <p>
                User: <span className="text-gray-900">user@thainilam.com</span>{" "}
                / <span className="text-gray-900">password123</span>
              </p>
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6 text-left">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-50 border border-transparent focus:border-gray-100 focus:bg-white rounded-xl px-5 py-3.5 text-sm transition-all focus:outline-none focus:ring-4 focus:ring-gray-100/50"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-50 border border-transparent focus:border-gray-100 focus:bg-white rounded-xl px-5 py-3.5 text-sm transition-all focus:outline-none focus:ring-4 focus:ring-gray-100/50"
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

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#1e293b] text-white font-semibold py-4 rounded-xl shadow-lg shadow-slate-900/10 hover:bg-slate-800 transition-all transform hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-70 disabled:hover:translate-y-0"
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </button>
            </div>
          </form>

          <p className="mt-8 text-center text-sm text-gray-500 font-medium">
            Don't have an account?{" "}
            <span className="text-[#d4a017] cursor-pointer hover:underline underline-offset-4">
              Sign up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
