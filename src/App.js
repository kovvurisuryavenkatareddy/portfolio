import { useState, useEffect, useRef, lazy, Suspense } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Contact from "./components/Contact";
import Experience from "./components/Experience";
import HeroAboutStage from "./components/HeroAboutStage";
import NavBar from "./components/NavBar";
import Portfolio from "./components/Portfolio";
import SocialLinks from "./components/SocialLinks";
import Preloader from "./components/Preloader";
import CustomCursor from "./components/CustomCursor";

// Register GSAP plugins once at module level
gsap.registerPlugin(ScrollTrigger);

const HeroCanvas = lazy(() => import("./components/HeroCanvas"));

function App() {
  const [loading, setLoading] = useState(true);
  const sceneScrollRef = useRef({ transition: 0, scrollY: 0 });

  useEffect(() => {
    const onScroll = () => {
      sceneScrollRef.current.scrollY = window.scrollY;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2300);
    return () => clearTimeout(t);
  }, []);

  // Refresh ScrollTrigger after preloader exits so positions are correct
  useEffect(() => {
    if (!loading) {
      const t = setTimeout(() => ScrollTrigger.refresh(), 400);
      return () => clearTimeout(t);
    }
  }, [loading]);

  return (
    <>
      <CustomCursor />
      <Preloader isLoading={loading} />
      <Suspense fallback={null}>
        <div
          className="pointer-events-none fixed inset-0 z-[-1] h-full w-full"
          aria-hidden
        >
          <HeroCanvas sceneScrollRef={sceneScrollRef} />
        </div>
      </Suspense>
      <div className="relative z-0 pb-24 lg:pb-0">
        <NavBar />
        <SocialLinks />
        <HeroAboutStage sceneScrollRef={sceneScrollRef} />
        <Portfolio />
        <Experience />
        <Contact />
      </div>
    </>
  );
}

export default App;
