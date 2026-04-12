import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// About section.
// SIGNATURE EFFECT: section scales up (0.92 → 1) as it enters the viewport,
// creating a cinematic "zoom into the next scene" feel that continues from
// the hero's zoom-out exit.
//
// Paragraphs are scrub-driven: the user's scroll position controls which
// paragraph is visible, turning reading into an active scroll experience.

const paragraphs = [
  {
    key: "intro",
    html: `Hello! I'm <strong>Kovvuri Surya Venkata Reddy</strong>, a motivated Full Stack Developer with a strong foundation in Python, JavaScript, HTML, CSS, and the MERN stack. I enjoy building clean, scalable web applications that solve real business problems and deliver a great user experience.`,
  },
  {
    key: "evanke",
    html: `I'm currently working at <strong>Evanke</strong> as a Full Stack Developer. Previously at <strong>MyAccess Private Limited</strong> (Mar 2025 – Oct 2025) I built an enterprise management platform using React, Tailwind CSS, Node.js, and Supabase with multi-tier role-based access control — including HR workflows, face-recognition attendance, and GPS location validation.`,
  },
  {
    key: "iiit",
    html: `As a Deep Learning Research Intern at <strong>IIIT Hyderabad</strong> I worked on short-term traffic flow prediction using LSTM, Bi-LSTM, CNN-LSTM, TCN, and Grid LSTM — building data pipelines, preprocessing workflows, and evaluation experiments for time-series forecasting.`,
  },
  {
    key: "closing",
    html: `I'm driven by continuous learning and collaboration, and I'm always excited to take on challenging projects that create measurable impact.`,
  },
];

const About = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Signature: section zooms into view (continuous with hero exit) ──
      gsap.fromTo(
        sectionRef.current,
        { scale: 0.92, transformOrigin: "50% 0%" },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start:   "top bottom",   // when section enters viewport bottom
            end:     "top 30%",      // fully scaled by 30% from top
            scrub:   1.5,
          },
        }
      );

      // ── Heading: trigger-once slide from left ────────────────
      gsap.from(".about-heading", {
        x: -55,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-heading",
          start:   "top 82%",
          toggleActions: "play none none none",
        },
      });

      // Gradient underline draws left → right
      gsap.from(".about-line", {
        scaleX: 0,
        duration: 0.85,
        ease: "power3.inOut",
        delay: 0.25,
        scrollTrigger: {
          trigger: ".about-heading",
          start:   "top 82%",
          toggleActions: "play none none none",
        },
      });

      // ── Paragraphs: SCRUB — scroll position drives visibility ──
      // Each paragraph is separated in the scrub timeline so the user
      // actively scrolls to reveal each one (storytelling through scroll).
      gsap.from(".about-para", {
        y:       55,
        opacity: 0,
        stagger: 0.6,  // 0.6 = each para takes 60% of the scroll distance apart
        ease:    "power2.out",
        scrollTrigger: {
          trigger: ".about-paras",
          start:   "top 75%",
          end:     "bottom 20%",
          scrub:   1.2,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} name="about" className="w-full py-24 text-white">
      <div className="max-w-screen-lg p-4 mx-auto flex flex-col w-full">

        <div className="pb-8">
          <span className="about-heading text-4xl font-bold text-white inline-block">
            About
          </span>
          <div
            className="about-line mt-2 h-[3px] w-16 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
            style={{ transformOrigin: "left center" }}
          />
        </div>

        <div className="about-paras mt-4 space-y-8">
          {paragraphs.map(({ key, html }) => (
            <p
              key={key}
              className="about-para text-lg md:text-xl leading-relaxed text-slate-300"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
