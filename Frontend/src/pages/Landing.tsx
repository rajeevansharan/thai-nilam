import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import logo from "@/assets/logoV2.png";

const Landing = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] as any }
    }
  };

  return (
    <div className="min-h-screen bg-navy-gradient overflow-x-hidden">
      {/* Hero */}
      <section className="relative">
        <div className="bg-navy-gradient min-h-screen">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="container mx-auto px-6 py-24 md:py-24 flex flex-col items-center text-center"
          >
            <motion.div variants={itemVariants}>
              <div className="relative inline-block group">
                <div className="absolute inset-0 bg-accent/20 blur-3xl rounded-full scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <motion.img
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  src={logo}
                  alt="Thai Nilam Logo"
                  className="h-32 sm:h-48 md:h-72 w-auto object-contain mx-auto drop-shadow-[0_0_30px_rgba(212,160,23,0.2)]"
                />
              </div>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="mx-auto mt-8 md:mt-12 mb-8 md:mb-12 flex items-center gap-4 md:gap-8"
            >
              <div className="h-px w-12 sm:w-24 bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
              <motion.div 
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="h-2 w-2 md:h-3 md:w-3 rotate-45 bg-accent shadow-[0_0_15px_rgba(212,160,23,0.6)]" 
              />
              <div className="h-px w-12 sm:w-24 bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
            </motion.div>

            {/* Vision */}
            <motion.div variants={itemVariants} className="mt-2 mb-8 px-4">
               <p className="font-serif italic text-2xl md:text-3xl text-white font-semibold leading-tight max-w-4xl mx-auto drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                 <span className="text-accent text-4xl md:text-5xl align-top leading-none mr-1 md:mr-2">"</span>
                 பாதையைத் தேடாதே அதை உருவாக்கு...!
                 <span className="text-accent text-4xl md:text-5xl align-bottom leading-none ml-1 md:ml-2">"</span>
               </p>
               <div className="h-1 w-24 md:h-1.5 md:w-32 bg-gradient-to-r from-transparent via-accent/50 to-transparent rounded-full mx-auto mt-6 md:mt-8 shadow-[0_0_20px_rgba(212,160,23,0.3)]" />
            </motion.div>

            {/* Login & Register Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 mb-12 w-full px-6">
                <Link to="/login" state={{ mode: 'login' }} className="w-full sm:w-auto">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full sm:min-w-[180px] px-8 py-3.5 rounded-full border border-white/30 text-white font-semibold hover:bg-white/10 transition-all backdrop-blur-md text-sm md:text-base"
                  >
                    Member Login
                  </motion.button>
                </Link>
              <Link to="/login" state={{ mode: 'register' }} className="w-full sm:w-auto">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:min-w-[180px] px-8 py-3.5 bg-accent text-accent-foreground hover:bg-accent/90 rounded-full font-bold transition-all shadow-xl shadow-accent/40 text-sm md:text-base"
                >
                  Register Now
                </motion.button>
              </Link>
            </motion.div>

            {/* Professional Contact Bar */}
            <motion.div variants={itemVariants} className="mt-2 w-full max-w-7xl px-4 md:px-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 py-6 md:py-8 px-4 md:px-6 bg-white/5 backdrop-blur-md rounded-2xl md:rounded-3xl border border-white/10 shadow-2xl">
                {[
                  { icon: Mail, value: "thaainilampublications@gmail.com" },
                  { icon: Phone, value: "0779042490" },
                  { icon: MapPin, value: "No.38,Kachcheri Nallur Road,Jaffna" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-start md:justify-center gap-4 group">
                    <div className="p-2.5 md:p-3 rounded-full bg-accent/10 group-hover:bg-accent/20 transition-all duration-300 transform group-hover:scale-110">
                      <item.icon className="h-4 w-4 md:h-5 md:w-5 text-accent shadow-[0_0_10px_rgba(212,160,23,0.3)]" />
                    </div>
                    <span className="text-[11px] sm:text-sm md:text-base text-white/80 font-medium group-hover:text-white transition-colors duration-300 break-all md:break-normal text-left">{item.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Empty space to allow footer to be at bottom */}
      <div className="flex-grow" />

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border bg-background">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Thai Nilam" className="h-8 w-auto" />
            <span className="font-serif text-lg font-bold text-foreground">தாய் நிலம்</span>
          </div>
          
          <div className="flex space-x-6">
            <Link to="/privacy-policy" state={{ fromLanding: true }} className="text-[10px] md:text-sm text-muted-foreground hover:text-accent transition-colors font-bold uppercase tracking-widest">Privacy Policy</Link>
            <Link to="/terms-conditions" state={{ fromLanding: true }} className="text-[10px] md:text-sm text-muted-foreground hover:text-accent transition-colors font-bold uppercase tracking-widest">Terms of Service</Link>
          </div>

          <p className="text-[10px] md:text-sm text-muted-foreground text-center">© 2026 Thai Nilam பதிப்பகம். All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
