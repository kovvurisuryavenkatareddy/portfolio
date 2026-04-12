import React, { useRef, useEffect } from "react";
import { FaGithub, FaLinkedin, FaExternalLinkAlt } from "react-icons/fa";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CAP    from "../assets/portfolio/CAP.png";
import sttf   from "../assets/portfolio/sttf.png";
import Loading from "../assets/portfolio/Loading.jpg";
import VHG    from "../assets/portfolio/VHG.png";
import yolo   from "../assets/portfolio/YOLOv8.png";

gsap.registerPlugin(ScrollTrigger);

// ─── 3-D Tilt Card (Framer Motion) ───────────────────────────
const TiltCard = ({ children }) => {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 200, damping: 20 });
  const y = useSpring(rawY, { stiffness: 200, damping: 20 });
  const rotateX = useTransform(y, [-60, 60], [8, -8]);
  const rotateY = useTransform(x, [-60, 60], [-8, 8]);

  return (
    <motion.div
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        rawX.set(e.clientX - r.left - r.width  / 2);
        rawY.set(e.clientY - r.top  - r.height / 2);
      }}
      onMouseLeave={() => { rawX.set(0); rawY.set(0); }}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.div>
  );
};

// ─── Data ─────────────────────────────────────────────────────
const portfolios = [
  {
    id: 1,
    title: "Virtual Mouse (Hand Gesture Control)",
    src: VHG,
    tag: "Computer Vision",
    links: {
      linkedin: "https://www.linkedin.com/posts/ksvreddy_gesturecontrol-computervision-pyautogui-activity-7256166147031511041-0bNZ?utm_source=share&utm_medium=member_desktop&rcm=ACoAAD4QENoB_CaQoKZxPlKluqON3YrA8LwUoyE",
      github:   "https://github.com/kovvurisuryavenkatareddy/virtual-mouse-using-hand-gesture",
    },
  },
  {
    id: 2,
    title: "YOLO Real Time Object Detection",
    src: yolo,
    tag: "Deep Learning",
    links: { github: "https://github.com/kovvurisuryavenkatareddy/YOLO-Real-Time-Object-Detection.git" },
  },
  {
    id: 3,
    title: "Short-Term Traffic Flow Prediction",
    src: sttf,
    tag: "Research",
    links: { github: "https://github.com/kovvurisuryavenkatareddy/Short-Term-Traffic-Flow-Prediction.git" },
  },
  {
    id: 4,
    title: "Company Admin Portal",
    src: CAP,
    tag: "Full Stack",
    links: { github: "https://github.com/kovvurisuryavenkatareddy/company-admin-portal.git" },
  },
  { id: 5, title: "Project 5", src: Loading, tag: "Coming Soon", links: {} },
  { id: 6, title: "Project 6", src: Loading, tag: "Coming Soon", links: {} },
];

// Framer Motion hover variants (parent-driven)
const cardHover   = { rest: {}, hover: {} };
const overlayVars = {
  rest:  { opacity: 0, y: 10 },
  hover: { opacity: 1, y: 0, transition: { duration: 0.28 } },
};
const imgVars = {
  rest:  { scale: 1 },
  hover: { scale: 1.08, transition: { duration: 0.4 } },
};

// ─── Portfolio ────────────────────────────────────────────────
const Portfolio = () => {
  const sectionRef = useRef(null);
  const trackRef   = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track   = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      // ── Heading: trigger-once ─────────────────────────────
      gsap.from(".port-heading", {
        y: 40, opacity: 0, duration: 0.85, ease: "power3.out",
        scrollTrigger: {
          trigger: ".port-heading",
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(".port-line", {
        scaleX: 0, duration: 0.8, ease: "power3.inOut", delay: 0.2,
        scrollTrigger: {
          trigger: ".port-heading",
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      // ── HORIZONTAL SCROLL with pin ────────────────────────
      // The pinContainer is pinned to the viewport while the track
      // slides horizontally — card browsing controlled by vertical scroll.
      const totalX = track.scrollWidth - section.clientWidth;

      gsap.to(track, {
        x:    -totalX,
        ease: "none",
        scrollTrigger: {
          trigger:           ".port-pin-container",
          start:             "top top",
          end:               () => `+=${totalX}`,
          pin:               true,
          scrub:             1,
          invalidateOnRefresh: true,
          anticipatePin:     1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} name="portfolio" className="w-full text-white">

      {/* Heading — above the pin zone, scrolls normally */}
      <div className="max-w-screen-lg mx-auto px-4 pt-24 pb-10">
        <div className="port-heading">
          <span className="text-4xl font-bold text-white">Portfolio</span>
          <div
            className="port-line mt-2 h-[3px] w-20 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
            style={{ transformOrigin: "left center" }}
          />
        </div>
      </div>

      {/* ── Pin container ─────────────────────────────────────
          Height = 100vh so it fills the viewport when pinned.
          overflow-hidden clips the track that extends beyond viewport.  */}
      <div className="port-pin-container h-screen overflow-hidden flex items-center">
        {/* ── Horizontal track ─────────────────────────────────
            will-change: transform tells the browser to promote to its own GPU layer.
            The track is wider than the viewport; GSAP drives its x position.      */}
        <div
          ref={trackRef}
          className="flex items-end gap-8 px-16 will-change-transform"
          style={{ width: "max-content" }}
        >
          {portfolios.map(({ id, title, src, tag, links }, index) => (
            <div
              key={id}
              // Alternating vertical offset creates foreground/background depth
              style={{
                flexShrink: 0,
                width:  "clamp(280px, 32vw, 400px)",
                marginBottom: index % 2 === 0 ? "0px" : "80px",
              }}
            >
              <TiltCard>
                <motion.div
                  className="rounded-xl overflow-hidden bg-white/5 border border-white/10 shadow-xl shadow-black/50"
                  variants={cardHover}
                  initial="rest"
                  whileHover="hover"
                >
                  {/* Image + hover overlay */}
                  <div className="relative overflow-hidden">
                    <motion.img
                      src={src}
                      alt={title}
                      loading="lazy"
                      decoding="async"
                      className="w-full object-cover"
                      variants={imgVars}
                    />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-900/55 to-transparent flex items-end p-4 gap-3"
                      variants={overlayVars}
                    >
                      {links?.linkedin && (
                        <a href={links.linkedin} target="_blank" rel="noreferrer"
                           className="text-white/75 hover:text-cyan-400 transition-colors" data-hover="true">
                          <FaLinkedin size={20} />
                        </a>
                      )}
                      {links?.github && (
                        <a href={links.github} target="_blank" rel="noreferrer"
                           className="text-white/75 hover:text-cyan-400 transition-colors" data-hover="true">
                          <FaGithub size={20} />
                        </a>
                      )}
                      {(links?.github || links?.linkedin) && (
                        <a href={links.github || links.linkedin} target="_blank" rel="noreferrer"
                           className="ml-auto text-white/75 hover:text-cyan-400 transition-colors" data-hover="true">
                          <FaExternalLinkAlt size={15} />
                        </a>
                      )}
                    </motion.div>
                  </div>

                  {/* Card footer */}
                  <div className="p-4">
                    <span className="text-[10px] tracking-widest uppercase text-cyan-400/70 font-medium">
                      {tag}
                    </span>
                    <p className="mt-1 text-slate-100 font-semibold leading-snug text-sm">{title}</p>
                  </div>
                </motion.div>
              </TiltCard>
            </div>
          ))}
        </div>
      </div>

      {/* Spacer so the section ends cleanly after the pin releases */}
      <div className="h-24" />
    </div>
  );
};

export default Portfolio;
