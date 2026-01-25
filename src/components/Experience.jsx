import React from "react";

import html from "../assets/html.png";
import css from "../assets/css.png";
import javascript from "../assets/javascript.png";
import reactImage from "../assets/react.png";
import python from "../assets/python.png";
import node from "../assets/node.png";
import github from "../assets/github.png";
import tailwind from "../assets/tailwind.png";
import supabase from "../assets/supabase.svg";
import express from "../assets/express.svg";
import postman from "../assets/postman.svg";
import fastapi from "../assets/fastapi.svg";
import postgresql from "../assets/postgresql.svg";
import firebase from "../assets/firebase.svg";
import nextjs from "../assets/nextjs.svg";

const Experience = () => {
  const techs = [
    {
      id: 1,
      src: html,
      title: "HTML",
      style: "shadow-orange-500",
    },
    {
      id: 2,
      src: css,
      title: "CSS",
      style: "shadow-blue-500",
    },
    {
      id: 3,
      src: javascript,
      title: "JavaScript",
      style: "shadow-yellow-500",
    },
    {
      id: 4,
      src: reactImage,
      title: "React",
      style: "shadow-blue-600",
    },
    {
      id: 5,
      src: python,
      title: "Python",
      style: "shadow-yellow-400",
    },
    {
      id: 6,
      src: tailwind,
      title: "Tailwind",
      style: "shadow-sky-400",
    },
    {
      id: 7,
      src: node,
      title: "Nodejs",
      style: "shadow-green-500",
    },
    {
      id: 8,
      src: github,
      title: "GitHub",
      style: "shadow-gray-400",
    },
    {
      id: 9,
      src: supabase,
      title: "Supabase",
      style: "shadow-green-400",
    },
    {
      id: 10,
      src: express,
      title: "Express",
      style: "shadow-gray-500",
    },
    {
      id: 11,
      src: postman,
      title: "Postman",
      style: "shadow-orange-500",
    },
    {
      id: 12,
      src: fastapi,
      title: "FastAPI",
      style: "shadow-teal-500",
    },
    {
      id: 13,
      src: postgresql,
      title: "PostgreSQL",
      style: "shadow-blue-500",
    },
    {
      id: 14,
      src: firebase,
      title: "Firebase",
      style: "shadow-yellow-500",
    },
    {
      id: 15,
      src: nextjs,
      title: "Next.js",
      style: "shadow-gray-300",
    },
  ];

  return (
    <div
      name="experience"
      className="w-full py-24 text-white"
    >
      <div className="max-w-screen-lg mx-auto p-4 flex flex-col w-full text-white">
        <div>
          <p className="text-4xl font-bold border-b-4 border-slate-500/60 p-2 inline">
            Experience
          </p>
          <p className="py-6 text-slate-300">These are the technologies I've worked with</p>
        </div>

        <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-8 text-center py-8  px-12 sm:px-0">
          {techs.map(({ id, src, title, style }) => (
            <div
              key={id}
              className={`bg-white/5 border border-white/10 shadow-md hover:scale-105 duration-500 py-4 rounded-lg ${style}`}
            >
              <img
                src={src}
                alt={title}
                loading="lazy"
                decoding="async"
                className="w-20 mx-auto"
              />
              <p className="mt-4 text-slate-100">{title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;