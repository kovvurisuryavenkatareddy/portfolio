/**
 * Pinned Hero → About handoff: one viewport of scrubbed scroll moves Hero up
 * and brings About from below, while the Three.js scene stays mounted in App.
 */
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Home from "./Home";
import About from "./About";

gsap.registerPlugin(ScrollTrigger);

const HeroAboutStage = ({ sceneScrollRef }) => {
  const stageRef = useRef(null);
  const heroLayerRef = useRef(null);
  const aboutLayerRef = useRef(null);

  useGSAP(
    () => {
      const heroEl = heroLayerRef.current;
      const aboutEl = aboutLayerRef.current;
      const stageEl = stageRef.current;
      if (!heroEl || !aboutEl || !stageEl) return;

      gsap.set(heroEl, { yPercent: 0 });
      gsap.set(aboutEl, { yPercent: 100 });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: stageEl,
          start: "top top",
          end: "+=100%",
          scrub: true,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (sceneScrollRef?.current) {
              sceneScrollRef.current.transition = self.progress;
            }
          },
        },
      });

      tl.to(heroEl, { yPercent: -100 }, 0).to(aboutEl, { yPercent: 0 }, 0);
    },
    { scope: stageRef, dependencies: [] }
  );

  return (
    <div
      ref={stageRef}
      className="relative h-screen w-full overflow-hidden"
    >
      <div
        ref={heroLayerRef}
        className="absolute inset-0 z-10 flex min-h-full w-full will-change-transform"
      >
        <Home />
      </div>
      <div
        ref={aboutLayerRef}
        className="absolute inset-0 z-20 min-h-full w-full will-change-transform overflow-y-auto overflow-x-hidden pointer-events-auto"
      >
        <About />
      </div>
    </div>
  );
};

export default HeroAboutStage;
