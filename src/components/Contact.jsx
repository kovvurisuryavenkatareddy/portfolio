import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useMagneticButton from "../hooks/useMagneticButton";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef  = useRef(null);
  const magnetRef   = useMagneticButton(0.28);
  const nameRef     = useRef(null);
  const emailRef    = useRef(null);
  const messageRef  = useRef(null);
  const [errors, setErrors] = useState({});

  const validate = ({ name, email, message }) => {
    const next = {};
    if (!name.trim()) next.name = "Please enter your name.";
    if (!email.trim()) {
      next.email = "Please enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      next.email = "Please enter a valid email address.";
    }
    if (!message.trim()) next.message = "Please enter your message.";
    return next;
  };

  const handleSubmit = (e) => {
    const form = e.currentTarget;
    const data = new FormData(form);
    const values = {
      name:    String(data.get("name")    ?? ""),
      email:   String(data.get("email")   ?? ""),
      message: String(data.get("message") ?? ""),
    };
    const next = validate(values);
    setErrors(next);
    if (Object.keys(next).length > 0) {
      e.preventDefault();
      if (next.name)    nameRef.current?.focus();
      else if (next.email)   emailRef.current?.focus();
      else                   messageRef.current?.focus();
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Heading + line ──────────────────────────────────────
      gsap.from(".contact-heading", {
        y: 40,
        opacity: 0,
        duration: 0.85,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".contact-heading",
          start: "top 82%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(".contact-line", {
        scaleX: 0,
        duration: 0.8,
        ease: "power3.inOut",
        delay: 0.2,
        scrollTrigger: {
          trigger: ".contact-heading",
          start: "top 82%",
          toggleActions: "play none none none",
        },
      });

      // ── Form fields stagger up ──────────────────────────────
      gsap.from(".contact-field", {
        y: 45,
        opacity: 0,
        stagger: 0.12,
        duration: 0.75,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".contact-form",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const inputClass =
    "w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/40 transition-all duration-200";

  return (
    <div ref={sectionRef} name="contact" className="w-full py-24 p-4 text-white">
      <div className="flex flex-col p-4 max-w-screen-lg mx-auto">

        {/* Heading */}
        <div className="contact-heading pb-8">
          <span className="text-4xl font-bold text-white">Contact</span>
          <div
            className="contact-line mt-2 h-[3px] w-20 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
            style={{ transformOrigin: "left center" }}
          />
          <p className="mt-4 text-slate-400">Submit the form below to get in touch with me</p>
        </div>

        {/* Form */}
        <div className="flex justify-center items-center">
          <form
            className="contact-form flex flex-col w-full md:w-1/2 gap-1"
            action="https://getform.io/f/b2ec1b0f-780e-4c43-8c47-1f0699c68ee8"
            method="POST"
            onSubmit={handleSubmit}
          >
            {/* Name */}
            <div className="contact-field">
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                ref={nameRef}
                required
                className={inputClass}
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-400">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div className="contact-field mt-3">
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                ref={emailRef}
                required
                className={inputClass}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-400">{errors.email}</p>
              )}
            </div>

            {/* Message */}
            <div className="contact-field mt-3">
              <textarea
                name="message"
                placeholder="Enter your message"
                rows="10"
                ref={messageRef}
                required
                className={inputClass}
              />
              {errors.message && (
                <p className="mt-1 text-xs text-red-400">{errors.message}</p>
              )}
            </div>

            {/* Submit — magnetic button */}
            <div className="contact-field mt-6 flex justify-center">
              <div ref={magnetRef} className="inline-block">
                <button
                  type="submit"
                  className="relative text-white px-8 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 font-semibold overflow-hidden group"
                  data-hover="true"
                >
                  {/* Shimmer sweep on hover */}
                  <span
                    className="absolute inset-0 w-full h-full translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                    aria-hidden="true"
                  />
                  <span className="relative">Let's Talk</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
