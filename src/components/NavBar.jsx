import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import NavLinks from "./NavLinks";
import { motion, AnimatePresence } from "framer-motion";

const NavBar = () => {
  const [nav, setNav] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { id: 1, link: "home" },
    { id: 2, link: "about" },
    { id: 3, link: "portfolio" },
    { id: 4, link: "experience" },
    { id: 5, link: "contact" },
  ];

  return (
    <motion.div
      className={`fixed top-0 left-0 z-50 flex justify-between items-center w-full h-20 px-4 text-white transition-all duration-500 ${
        scrolled
          ? "bg-slate-950/90 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/30"
          : "bg-transparent border-b border-transparent"
      }`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <h1 className="text-5xl font-signature ml-2">Ksvreddy</h1>
      </motion.div>

      {/* Desktop links */}
      <motion.ul
        className="hidden md:flex"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.08, delayChildren: 0.5 } },
        }}
      >
        {links.map(({ id, link }) => (
          <motion.div
            key={id}
            variants={{
              hidden: { opacity: 0, y: -10 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
            }}
          >
            <NavLinks
              link={link}
              className="px-4 cursor-pointer capitalize font-medium text-slate-300 hover:text-white duration-200 relative group"
            />
          </motion.div>
        ))}
      </motion.ul>

      {/* Mobile hamburger */}
      <motion.div
        onClick={() => setNav(!nav)}
        className="cursor-pointer pr-4 md:hidden z-10 text-slate-200"
        whileTap={{ scale: 0.85 }}
        data-hover="true"
      >
        <AnimatePresence mode="wait">
          {nav ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <FaTimes size={28} />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <FaBars size={28} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {nav && (
          <motion.ul
            className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-slate-950/97 backdrop-blur-lg text-slate-200"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {links.map(({ id, link }, i) => (
              <motion.div
                key={id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.06 }}
              >
                <NavLinks
                  link={link}
                  className="px-4 cursor-pointer capitalize py-6 text-4xl font-bold hover:text-cyan-400 duration-200"
                  onClick={() => setNav(false)}
                />
              </motion.div>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default NavBar;
