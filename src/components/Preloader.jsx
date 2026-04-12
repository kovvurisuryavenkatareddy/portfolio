import React from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Full-screen preloader that slides upward off the screen when dismissed.
 * Render inside <AnimatePresence> and conditionally mount it.
 */
const Preloader = ({ isLoading }) => (
  <AnimatePresence>
    {isLoading && (
      <motion.div
        key="preloader"
        className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-slate-950 overflow-hidden"
        exit={{
          y: "-100%",
          transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.1 },
        }}
      >
        {/* Animated background gradient */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[120px] opacity-20 bg-cyan-500"
            animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-[100px] opacity-15 bg-blue-600"
            animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
        </div>

        {/* Logo */}
        <motion.h1
          className="text-7xl sm:text-8xl font-signature text-white relative z-10"
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          Ksvreddy
        </motion.h1>

        {/* Tagline */}
        <motion.p
          className="mt-3 text-xs tracking-[0.35em] uppercase text-slate-400 relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          Full Stack Developer
        </motion.p>

        {/* Progress bar */}
        <div className="mt-10 w-56 h-[2px] bg-white/10 rounded-full overflow-hidden relative z-10">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
            initial={{ x: "-100%" }}
            animate={{ x: "0%" }}
            transition={{ duration: 1.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          />
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default Preloader;
