import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import CAP from "../assets/portfolio/CAP.png";
import sttf from "../assets/portfolio/sttf.png";
import Loading from "../assets/portfolio/Loading.jpg";
import VHG from "../assets/portfolio/VHG.png";
import yolo from "../assets/portfolio/YOLOv8.png";

const Portfolio = () => {
  const portfolios = [
    {
      id: 1,
      title: "Virtual Mouse (Hand Gesture Control)",
      src: VHG,
      links: {
        linkedin:
          "https://www.linkedin.com/posts/ksvreddy_gesturecontrol-computervision-pyautogui-activity-7256166147031511041-0bNZ?utm_source=share&utm_medium=member_desktop&rcm=ACoAAD4QENoB_CaQoKZxPlKluqON3YrA8LwUoyE",
        github:
          "https://github.com/kovvurisuryavenkatareddy/virtual-mouse-using-hand-gesture",
      },
    },
    {
      id: 2,
      title: "YOLO Real Time Object Detection (YOLOv8)",
      src: yolo,
      links: {
        linkedin:
          "",
        github:
          "https://github.com/kovvurisuryavenkatareddy/YOLO-Real-Time-Object-Detection.git",
      },
    },
    {
      id: 3,
      title: "Short-Term Traffic Flow Prediction",
      src: sttf,
      links: {
        github:"https://github.com/kovvurisuryavenkatareddy/Short-Term-Traffic-Flow-Prediction.git"
      },
    },
    {
      id: 4,
      title: "Company Admin Portal",
      src: CAP,
      links: {
        github:"https://github.com/kovvurisuryavenkatareddy/company-admin-portal.git"
      },
    },
    {
      id: 5,
      title: "Project 5",
      src: Loading,
      links: {
        github:""
      },
    },
    {
      id: 6,
      title: "Project 6",
      src: Loading,
      links: {
        github:""
      },
    }
  
  ];

  return (
    <div
      name="portfolio"
      className="w-full py-24 text-white"
    >
      <div className="max-w-screen-lg p-4 mx-auto flex flex-col w-full">
        <div className="pb-8">
          <p className="text-4xl font-bold inline border-b-4 border-slate-500/60">
            Portfolio
          </p>
          <p className="py-6 text-slate-300">Check out some of my work right here</p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 px-12 sm:px-0">
          {portfolios.map(({ id, title, src, links }) => (
            <div
              key={id}
              className="rounded-lg overflow-hidden bg-white/5 border border-white/10 shadow-md shadow-black/40 hover:bg-white/10 transition-colors"
            >
              <img
                src={src}
                alt={title}
                className="duration-200 hover:scale-105"
              />

              <div className="p-4 flex items-center justify-between gap-3">
                <p className="text-slate-100 font-semibold leading-snug">{title}</p>

                <div className="flex items-center gap-3 shrink-0">
                  {links?.linkedin && (
                    <a
                      href={links.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`LinkedIn video for ${title}`}
                      className="text-slate-300 hover:text-white transition-colors"
                    >
                      <FaLinkedin size={22} />
                    </a>
                  )}
                  {links?.github && (
                    <a
                      href={links.github}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`GitHub repository for ${title}`}
                      className="text-slate-300 hover:text-white transition-colors"
                    >
                      <FaGithub size={22} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;