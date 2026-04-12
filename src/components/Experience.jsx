import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import html       from "../assets/html.png";
import css        from "../assets/css.png";
import javascript from "../assets/javascript.png";
import reactImage from "../assets/react.png";
import python     from "../assets/python.png";
import node       from "../assets/node.png";
import github     from "../assets/github.png";
import tailwind   from "../assets/tailwind.png";
import supabase   from "../assets/supabase.svg";
import express    from "../assets/express.svg";
import postman    from "../assets/postman.svg";
import fastapi    from "../assets/fastapi.svg";
import postgresql from "../assets/postgresql.svg";
import firebase   from "../assets/firebase.svg";
import nextjs     from "../assets/nextjs.svg";

gsap.registerPlugin(ScrollTrigger);

const techs = [
  { id: 1,  src: html,       title: "HTML",       shadow: "hover:shadow-orange-500/60" },
  { id: 2,  src: css,        title: "CSS",         shadow: "hover:shadow-blue-500/60" },
  { id: 3,  src: javascript, title: "JavaScript",  shadow: "hover:shadow-yellow-400/60" },
  { id: 4,  src: reactImage, title: "React",       shadow: "hover:shadow-blue-400/60" },
  { id: 5,  src: python,     title: "Python",      shadow: "hover:shadow-yellow-300/60" },
  { id: 6,  src: tailwind,   title: "Tailwind",    shadow: "hover:shadow-sky-400/60" },
  { id: 7,  src: node,       title: "Node.js",     shadow: "hover:shadow-green-500/60" },
  { id: 8,  src: github,     title: "GitHub",      shadow: "hover:shadow-gray-400/60" },
  { id: 9,  src: supabase,   title: "Supabase",    shadow: "hover:shadow-emerald-400/60" },
  { id: 10, src: express,    title: "Express",     shadow: "hover:shadow-gray-400/60" },
  { id: 11, src: postman,    title: "Postman",     shadow: "hover:shadow-orange-400/60" },
  { id: 12, src: fastapi,    title: "FastAPI",     shadow: "hover:shadow-teal-400/60" },
  { id: 13, src: postgresql, title: "PostgreSQL",  shadow: "hover:shadow-blue-400/60" },
  { id: 14, src: firebase,   title: "Firebase",    shadow: "hover:shadow-amber-400/60" },
  { id: 15, src: nextjs,     title: "Next.js",     shadow: "hover:shadow-slate-300/60" },
];

const Experience = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Heading ────────────────────────────────────────────
      gsap.from(".exp-heading", {
        y: 40, opacity: 0, duration: 0.85, ease: "power3.out",
        scrollTrigger: {
          trigger: ".exp-heading",
          start: "top 82%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(".exp-line-deco", {
        scaleX: 0, duration: 0.8, ease: "power3.inOut", delay: 0.2,
        scrollTrigger: {
          trigger: ".exp-heading",
          start: "top 82%",
          toggleActions: "play none none none",
        },
      });

      // ── Cards: scrub-driven stagger ────────────────────────
      // Scroll controls which cards are visible — each row appears
      // progressively as the user scrolls through the section.
      // `.exp-wrap` = outer wrapper targeted by GSAP
      // `.motion-card` = inner Framer Motion div for hover (no conflict)
      gsap.from(".exp-wrap", {
        scale:   0.78,
        opacity: 0,
        y:       30,
        stagger: { amount: 1.0, from: "start" },
        ease:    "power2.out",
        scrollTrigger: {
          trigger: ".exp-grid",
          start:   "top 80%",
          end:     "bottom 40%",
          scrub:   0.8,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} name="experience" className="w-full py-24 text-white">
      <div className="max-w-screen-lg mx-auto p-4 flex flex-col w-full">

        {/* Heading */}
        <div className="exp-heading">
          <span className="text-4xl font-bold text-white">Experience</span>
          <div
            className="exp-line-deco mt-2 h-[3px] w-24 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
            style={{ transformOrigin: "left center" }}
          />
          <p className="mt-4 text-slate-400">These are the technologies I've worked with</p>
        </div>

        <div className="relative mt-10">
          <div className="exp-grid grid grid-cols-2 sm:grid-cols-3 gap-5 text-center">
            {techs.map(({ id, src, title, shadow }) => (
              <div key={id} className="exp-wrap">
                {/* Outer div: GSAP entrance target
                    Inner motion.div: Framer Motion hover — different elements, no conflict */}
                <motion.div
                  className={`motion-card bg-white/5 border border-white/10 shadow-md ${shadow} py-5 rounded-xl transition-shadow duration-300 cursor-default`}
                  whileHover={{
                    scale: 1.1,
                    y: -7,
                    transition: { type: "spring", stiffness: 320, damping: 18 },
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img
                    src={src}
                    alt={title}
                    loading="lazy"
                    decoding="async"
                    className="w-16 mx-auto"
                  />
                  <p className="mt-3 text-sm text-slate-200 font-medium">{title}</p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;
