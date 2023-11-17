import React from "react";

const mystyrle={
padding:'10px',
}

const About = () => {
  return (
    <div
      name="about"
      className="w-full h-scren bg-gradient-to-b from-gray-800 to-black text-white"
    >
      <div className="max-w-screen-lg p-4 mx-auto flex flex-col justify-center w-full h-full">
        <div className="pb-8">
          <p style={{mystyrle}} className="text-4xl font-bold inline border-b-4 border-gray-500">
            About
          </p>
        </div>
        <p className="text-xl mt-20">
        Hello! I'm Kovvuri Surya Venkata Reddy, a passionate and dedicated student currently pursuing a Bachelor's degree in Technology at Kakinada Institute of Engineering and Technology. My journey in the world of technology has equipped me with a diverse set of skills and a relentless drive for learning.
        </p>

        <br />

        <p className="text-xl">
        <b className="border-b-2 border-gray-500">Education</b><br/>
        &emsp;Bachelor of Technology (B.Tech)<br/>
        &emsp;&emsp;&#x2022; Kakinada Institute of Engineering and Technology<br/>
        &emsp;Intermediate Education<br/>
        &emsp;&emsp;&#x2022; Sri Chaitanya Junior College<br/>
        &emsp;School Education<br/>
        &emsp;&emsp;&#x2022; Dr. KKR's Gowtham Concept School<br/><br/>
        <b className="border-b-2 border-gray-500">Skills</b><br/>
        &emsp;Programming Languages: Python, C, SQL<br/>
        &emsp;Web Development: HTML, CSS, JavaScript<br/>
        &emsp;Full Stack: MERN Stack (MongoDB, Express.js, React.js, Node.js)<br/><br/>
        <b className="border-b-2 border-gray-500">Passions and Interests</b><br/>
        &emsp;I am particularly enthusiastic about full-stack development. The ability to seamlessly navigate both the front-end and back-end aspects of a project allows me to bring a holistic perspective to my work. Crafting intuitive user interfaces that captivate users while ensuring the underlying systems are robust and efficient is where my true passion lies.
        </p>
      </div>
    </div>
  );
};

export default About;