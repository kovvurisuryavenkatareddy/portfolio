import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { motion } from "framer-motion";

const SOCIAL_LINKS = [
  {
    id: 1,
    Icon: FaLinkedin,
    label: "LinkedIn",
    href: "https://linkedin.com/in/surya-venkata-reddy-kovvuri-736861250",
    style: "rounded-tr-md",
  },
  {
    id: 2,
    Icon: FaGithub,
    label: "GitHub",
    href: "https://github.com/kovvurisuryavenkatareddy",
  },
  {
    id: 3,
    Icon: HiOutlineMail,
    label: "Mail",
    href: "mailto:suryavenkatareddy90@gmail.com",
  },
  {
    id: 4,
    Icon: BsFillPersonLinesFill,
    label: "Resume",
    href: "/RESUME1.pdf",
    download: true,
    style: "rounded-br-md",
  },
];

const SocialLinks = () => {
  return (
    <>
      {/* Desktop: fixed vertical rail (lg+) */}
      <div className="hidden flex-col top-[35%] left-0 fixed lg:flex z-40">
        <ul>
          {SOCIAL_LINKS.map((link, i) => {
            const { Icon, label, href, download, style } = link;
            return (
              <motion.li
                key={link.id}
                initial={{ x: -160, opacity: 0 }}
                animate={{ x: -100, opacity: 1 }}
                whileHover={{ x: -10 }}
                transition={{
                  default: { duration: 0.5, delay: 0.8 + i * 0.1, ease: "easeOut" },
                  x: { type: "spring", stiffness: 300, damping: 25 },
                }}
                className={
                  "flex justify-between items-center w-40 h-14 px-4 rounded-md bg-slate-800/80 backdrop-blur-md border border-white/10" +
                  " " +
                  (style || "")
                }
              >
                <a
                  href={href}
                  className="flex justify-between items-center w-full text-white"
                  download={download}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noreferrer" : undefined}
                >
                  {label} <Icon size={30} aria-hidden />
                </a>
              </motion.li>
            );
          })}
        </ul>
      </div>

      {/* Mobile & tablet: bottom dock — tap targets, safe area, stays above content */}
      <nav
        className="lg:hidden fixed bottom-0 inset-x-0 z-40 border-t border-white/10 bg-slate-950/92 backdrop-blur-md pb-[max(0.65rem,env(safe-area-inset-bottom))] pt-2 shadow-[0_-8px_32px_rgba(0,0,0,0.35)]"
        aria-label="Social links"
      >
        <ul className="mx-auto flex max-w-lg items-center justify-center gap-2 px-3 sm:gap-3 md:gap-4">
          {SOCIAL_LINKS.map((link, i) => {
            const { Icon, label, href, download } = link;
            return (
              <motion.li
                key={link.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.06, duration: 0.35, ease: "easeOut" }}
                className="flex-1 min-w-0 max-w-[4.5rem] sm:max-w-none sm:flex-initial"
              >
                <a
                  href={href}
                  download={download}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noreferrer" : undefined}
                  aria-label={label}
                  className="flex h-12 w-full flex-col items-center justify-center gap-0.5 rounded-xl border border-white/10 bg-slate-800/70 px-1 py-1.5 text-slate-200 transition-colors active:bg-slate-700/90 sm:h-14 sm:flex-row sm:gap-2 sm:px-3 md:px-4"
                >
                  <Icon className="shrink-0 text-cyan-400/95" size={22} aria-hidden />
                  <span className="max-w-full truncate text-[9px] font-medium uppercase tracking-wide text-slate-400 sm:text-[10px] md:text-xs">
                    {label}
                  </span>
                </a>
              </motion.li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};

export default SocialLinks;
