import React from "react";
import { HiArrowNarrowRight } from "react-icons/hi";
import HeroImage from "../assets/heroImage.png";
import { Link } from "react-scroll";

const Home = () => {
  return (
    <div
      name="home"
      className="w-full min-h-screen pt-24 pb-20"
    >
      <div className="max-w-screen-lg mx-auto flex flex-col md:flex-row items-center justify-start px-4 pt-10 gap-10">
        <div className="flex flex-col justify-center md:translate-y-14">
          <h2 className="text-4xl sm:text-7xl font-bold text-white">
            I'm a Full Stack Developer
          </h2>
          <p className="text-slate-300 py-4 max-w-md leading-relaxed">
            Full Stack Developer with hands-on experience building responsive web applications and scalable APIs.
            I work with React, Tailwind CSS, Node.js/Express, and modern databases like Supabase and Firebase.
          </p>
          <div>
            <Link
              to="portfolio"
              smooth
              duration={500}
              className="group text-white w-fit px-6 py-3 my-2 flex items-center rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 cursor-pointer"
            >
              Portfolio
              <span className="group-hover:rotate-90 duration-300">
                <HiArrowNarrowRight className="ml-1" />
              </span>
            </Link>
          </div>
        </div>
        <div className="md:translate-y-14">
          <img 
            src={HeroImage}
            alt="my profile"
            className="rounded-2xl mx-auto w-2/3 md:w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;