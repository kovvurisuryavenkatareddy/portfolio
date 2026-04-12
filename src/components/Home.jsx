import React, { useRef, useLayoutEffect, useEffect } from "react";
import { HiArrowNarrowRight, HiChevronDown } from "react-icons/hi";
import HeroImage from "../assets/heroImage.png";
import { Link } from "react-scroll";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";

const HEADING_WORDS  = ["I'm", "a", "Full", "Stack", "Developer"];
const PRELOADER_MS   = 2300;

const Home = () => {
  const heroRef = useRef(null);
  const { scrollY } = useScroll();

  // Framer Motion parallax on text + image
  const imageY            = useTransform(scrollY, [0, 700], [0, -80]);
  const textY             = useTransform(scrollY, [0, 700], [0, -30]);
  const indicatorOpacity  = useTransform(scrollY, [0, 200], [1, 0]);

  // ── Hide elements before first paint ─────────────────────────
  useLayoutEffect(() => {
    const words = heroRef.current?.querySelectorAll(".hw");
    const desc  = heroRef.current?.querySelector(".hdesc");
    const cta   = heroRef.current?.querySelector(".hcta");
    const img   = heroRef.current?.querySelector(".himg");

    if (words?.length) gsap.set(words, { y: 65, opacity: 0 });
    if (desc)          gsap.set(desc,  { y: 28, opacity: 0 });
    if (cta)           gsap.set(cta,   { y: 28, opacity: 0 });
    if (img)           gsap.set(img,   { scale: 0.88, opacity: 0 });
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Entry timeline (fires after preloader) ─────────────
      const tl = gsap.timeline({ delay: PRELOADER_MS / 1000 + 0.15 });

      tl.to(".hw",   { y: 0, opacity: 1, stagger: 0.09, duration: 0.95, ease: "power3.out" })
        .to(".hdesc", { y: 0, opacity: 1, duration: 0.75, ease: "power2.out" }, "-=0.5")
        .to(".hcta",  { y: 0, opacity: 1, duration: 0.65, ease: "back.out(1.7)" }, "-=0.4")
        .to(".himg",  { scale: 1, opacity: 1, duration: 1.1, ease: "power3.out" }, "-=0.75");
      // Full-hero vertical handoff is driven by HeroAboutStage (ScrollTrigger pin + scrub).
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={heroRef}
      name="home"
      className="relative flex h-full min-h-screen w-full flex-col overflow-hidden pb-24 pt-52 sm:pt-56 md:pb-20 md:pt-44 lg:pt-40"
    >
      {/* hero-content — centered on small screens; row layout from md */}
      <div className="hero-content relative z-10 mx-auto flex max-w-screen-lg flex-col items-center justify-center gap-10 px-5 pt-20 text-center sm:pt-24 md:flex-row md:items-center md:justify-start md:pt-24 md:text-left lg:pt-20">

        {/* Text — Framer Motion parallax */}
        <motion.div
          className="flex w-full max-w-xl flex-col justify-center md:max-w-none md:translate-y-14"
          style={{ y: textY }}
        >
          <h2 className="mb-1 flex flex-wrap justify-center gap-x-[0.28em] gap-y-0.5 text-3xl font-bold text-white sm:text-4xl md:justify-start md:text-5xl xl:text-6xl">
            {HEADING_WORDS.map((word, i) => (
              <span key={i} className="hw inline-block">{word}</span>
            ))}
          </h2>

          <p className="hdesc mx-auto max-w-sm py-3 text-sm leading-relaxed text-slate-300 sm:max-w-md sm:text-[0.9375rem] sm:py-4 md:mx-0 md:text-base">
            Full Stack Developer with hands-on experience building responsive web
            applications and scalable APIs. I work with React, Tailwind CSS,
            Node.js/Express, and modern databases like Supabase and Firebase.
          </p>

          <div className="hcta flex justify-center md:justify-start">
            <Link
              to="portfolio"
              smooth
              duration={500}
              className="group relative my-2 flex w-fit cursor-pointer select-none items-center overflow-hidden rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 px-5 py-2.5 text-sm text-white md:px-6 md:py-3 md:text-base"
              data-hover="true"
            >
              <span
                className="absolute inset-0 w-full h-full translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                aria-hidden="true"
              />
              <span className="relative font-medium">Portfolio</span>
              <span className="relative ml-1 group-hover:rotate-90 duration-300">
                <HiArrowNarrowRight />
              </span>
            </Link>
          </div>
        </motion.div>

        {/* Image — Framer Motion parallax + float loop */}
        <motion.div
          className="flex w-full shrink-0 justify-center md:w-auto md:translate-y-14"
          style={{ y: imageY }}
        >
          <motion.div
            className="himg mx-auto w-full max-w-[11rem] sm:max-w-[13rem] md:max-w-[15rem] lg:max-w-[17rem] xl:max-w-xs"
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <img
              src={HeroImage}
              alt="my profile"
              loading="eager"
              decoding="async"
              className="mx-auto w-full rounded-2xl drop-shadow-[0_20px_48px_rgba(6,182,212,0.16)]"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="pointer-events-none absolute bottom-24 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 text-slate-500 select-none md:bottom-8"
        style={{ opacity: indicatorOpacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: PRELOADER_MS / 1000 + 1.2, duration: 0.8 }}
      >
        <span className="text-[10px] tracking-[0.32em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <HiChevronDown size={18} />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home;
