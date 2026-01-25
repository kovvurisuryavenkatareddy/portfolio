import React from "react";

// About section: short intro + background highlights.

const About = () => {
  return (
    <div
      name="about"
      className="w-full py-24 text-white"
    >
      <div className="max-w-screen-lg p-4 mx-auto flex flex-col w-full">
        <div className="pb-8">
          <p className="text-4xl font-bold inline border-b-4 border-slate-500/60">
            About
          </p>
        </div>
        <div className="mt-10 space-y-8">
        <p className="text-lg md:text-xl leading-relaxed text-slate-200">
          Hello! I’m Kovvuri Surya Venkata Reddy, a motivated Full Stack Developer with a strong foundation
          in Python, JavaScript, HTML, CSS, and the MERN stack. I enjoy building clean, scalable web
          applications that solve real business problems and deliver a great user experience.
        </p>
        <p className="text-lg md:text-xl leading-relaxed text-slate-200">
          I’m currently working at <b>Evanke</b> as a Full Stack Developer. Previously, I worked at
          <b> MyAccess Private Limited</b> (Mar 2025 – Oct 2025), where I built an enterprise management
          platform using React, Tailwind CSS, Node.js, and Supabase with multi-tier role-based access
          control. I also delivered HR and hiring workflows (job creation, shareable job links, payroll,
          leave approvals, events) and implemented a face-recognition attendance system with GPS-based
          location validation.
        </p>
        <p className="text-lg md:text-xl leading-relaxed text-slate-200">
          As a Deep Learning Research Intern at <b>IIIT Hyderabad</b>, I worked on short-term traffic flow
          prediction using models like LSTM, Bi-LSTM, CNN-LSTM, TCN, and Grid LSTM—building data pipelines,
          preprocessing workflows, and evaluation experiments for time-series forecasting.
        </p>
        <p className="text-lg md:text-xl leading-relaxed text-slate-200">
          I’m driven by continuous learning and collaboration, and I’m always excited to take on
          challenging projects that create measurable impact.
        </p>
        </div>
      </div>
    </div>
  );
};

export default About;