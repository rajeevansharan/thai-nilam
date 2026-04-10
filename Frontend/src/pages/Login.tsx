import React, { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { loginUser, registerUser } from "../services/authService";
import type { User } from "../types";

interface LoginProps {
  onLogin?: (userData: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const location = useLocation();
  const [isRegister, setIsRegister] = useState(() => location.state?.mode === 'register');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (location.state?.mode) {
      setIsRegister(location.state.mode === 'register');
    }
  }, [location.state]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      let data;
      if (isRegister) {
        data = await registerUser(name, email, password);
      } else {
        data = await loginUser(email, password);
      }
      onLogin?.(data);
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosError = err as { response: { data: { error?: string } } };
        setError(axiosError.response?.data?.error || (isRegister ? "Registration failed" : "Login failed"));
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(isRegister ? "Registration failed" : "Login failed");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsRegister(!isRegister);
    setError("");
    setEmail("");
    setName("");
    setPassword("");
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] as any }
    }
  };

  return (
    <div className="min-h-screen bg-[#1e293b] relative flex flex-col lg:flex-row items-center justify-center font-sans overflow-y-auto lg:overflow-hidden px-6 sm:px-12 lg:px-24 py-12 lg:py-0 gap-10 lg:gap-16">
      {/* Decorative Background Lighting */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute top-[-5%] right-[-5%] w-[60%] h-[60%] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none"
      />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.2 }}
        className="absolute bottom-[-5%] left-[-5%] w-[50%] h-[50%] bg-[#d4a017]/5 rounded-full blur-[100px] pointer-events-none"
      />

      {/* Left Branding Content */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="lg:w-1/2 w-full text-center lg:text-left relative z-10 space-y-4 md:space-y-6"
      >
        <div className="inline-block px-4 py-1.5 bg-white/5 rounded-full border border-white/10 backdrop-blur-md mb-2">
          <span className="text-[9px] md:text-[10px] uppercase font-bold tracking-[0.3em] md:tracking-[0.4em] text-[#d4a017]">
            Welcome To
          </span>
        </div>
        <h1 className="text-white text-5xl sm:text-6xl md:text-8xl font-serif font-bold tracking-tight leading-[1.1]">
          Thai Nilam <br/>
          <span className="text-[#d4a017] drop-shadow-[0_0_15px_rgba(212,160,23,0.3)]">Digital</span>
        </h1>
        <div className="h-1 w-16 md:w-20 bg-gradient-to-r from-[#d4a017] to-transparent rounded-full mb-4 md:mb-6 mx-auto lg:mx-0"></div>
        <p className="text-slate-400 text-base md:text-xl font-light max-w-lg leading-relaxed mx-auto lg:mx-0">
          The ultimate platform for premium Tamil literature, curated stories, 
          and professional perspectives. Experience modern digital publishing 
          like never before.
        </p>
      </motion.div>

      {/* Right Content - Form Card */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={{ delay: 0.2 }}
        className="lg:w-1/2 w-full flex justify-center lg:justify-end z-10"
      >
        <motion.div 
          layout
          className="bg-white rounded-[2rem] md:rounded-[2.5rem] shadow-[0_35px_80px_rgba(0,0,0,0.3)] border border-white/10 p-6 sm:p-10 max-w-md w-full relative overflow-hidden"
        >
          {/* Subtle Accent Line */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#d4a017] to-transparent"></div>

          <motion.div layout className="mb-6 text-center">
            <div className="inline-block px-3 py-1 bg-[#1e293b]/5 rounded-full mb-3">
              <span className="text-[9px] md:text-[10px] uppercase font-bold tracking-[0.2em] md:tracking-[0.3em] text-[#1e293b]">
                Thai Nilam Digital
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-serif font-semibold text-gray-900 mb-1">
              {isRegister ? "Join Thai Nilam" : "Welcome back"}
            </h2>
            <p className="text-gray-500 text-[10px] md:text-xs shadow-sm inline-block px-2 py-0.5 rounded-md bg-gray-50/50">
              {isRegister ? "Create a new account" : "Sign in to your account"}
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            {error && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="mb-5 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-medium"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <AnimatePresence initial={false}>
              {isRegister && (
                <motion.div 
                  initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                  animate={{ opacity: 1, height: "auto", marginBottom: 16 }}
                  exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                  className="space-y-1.5 overflow-hidden"
                >
                  <label htmlFor="fullName" className="text-[10px] uppercase font-bold tracking-widest text-gray-400 ml-1 cursor-pointer">
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    placeholder="Your Name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-gray-50/70 border border-gray-100/50 focus:border-[#d4a017]/30 focus:bg-white rounded-xl px-5 py-3.5 text-sm transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#d4a017]/5"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-1.5">
              <label htmlFor="email" className="text-[10px] uppercase font-bold tracking-widest text-gray-400 ml-1 cursor-pointer">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@email.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-50/70 border border-gray-100/50 focus:border-[#d4a017]/30 focus:bg-white rounded-xl px-5 py-3.5 text-sm transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#d4a017]/5"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="password" className="text-[10px] uppercase font-bold tracking-widest text-gray-400 ml-1 cursor-pointer">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-50/70 border border-gray-100/50 focus:border-[#d4a017]/30 focus:bg-white rounded-xl px-5 py-3.5 text-sm transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#d4a017]/5"
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

            <motion.div layout className="pt-3">
              <motion.button
                layout
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full bg-[#1e293b] text-white font-bold py-4 rounded-xl shadow-xl shadow-slate-900/20 hover:bg-slate-800 transition-all disabled:opacity-70"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <motion.span 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                    />
                    {isRegister ? "Creating..." : "Accessing..."}
                  </span>
                ) : (
                  isRegister ? "Create Account" : "Login Now"
                )}
              </motion.button>
            </motion.div>
          </form>

          <motion.div layout className="mt-6 pt-5 border-t border-gray-50 text-center">
            <p className="text-xs text-gray-400 font-medium tracking-wide">
              {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
              <span 
                onClick={toggleMode}
                className="text-[#d4a017] cursor-pointer hover:underline underline-offset-4 font-bold ml-1"
              >
                {isRegister ? "Login here" : "Create Account"}
              </span>
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
