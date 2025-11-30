"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ProfileCard from "@/components/ProfileCard";

export default function Hero() {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const cards = [
    {
      title: "Data Science & Machine Learning",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6 text-[var(--sec)] opacity-70"
        >
          <path d="M21 3C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H21ZM20 11H4V19H20V11ZM20 5H4V9H20V5ZM11 6V8H9V6H11ZM7 6V8H5V6H7Z"></path>
        </svg>
      ),
      points: [
        "Predictive modeling and analytic",
        "Deep learning and neural networks",
        "Data visualization and insight"
      ]
    },
    {
      title: "Web Development",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6 text-[var(--sec)] opacity-70"
        >
          <path d="M7 4V20H17V4H7ZM6 2H18C18.5523 2 19 2.44772 19 3V21C19 21.5523 18.5523 22 18 22H6C5.44772 22 5 21.5523 5 21V3C5 2.44772 5.44772 2 6 2ZM12 17C12.5523 17 13 17.4477 13 18C13 18.5523 12.5523 19 12 19C11.4477 19 11 18.5523 11 18C11 17.4477 11.4477 17 12 17Z"></path>
        </svg>
      ),
      points: [
        "Full stack web applications",
        "ML model deployment and integratio",
        "Responsive UI/UX design"
      ]
    },
    {
      title: "Research & Innovation",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6 text-[var(--sec)] opacity-70"
        >
          <path d="M5.7646 7.99998L5.46944 7.26944C5.26255 6.75737 5.50995 6.17454 6.02202 5.96765L15.2939 2.22158C15.8059 2.01469 16.3888 2.26209 16.5956 2.77416L22.2147 16.6819C22.4216 17.194 22.1742 17.7768 21.6622 17.9837L12.3903 21.7298C11.8783 21.9367 11.2954 21.6893 11.0885 21.1772L11.0002 20.9586V21H7.00021C6.44792 21 6.00021 20.5523 6.00021 20V19.7303L2.65056 18.377C2.13849 18.1701 1.89109 17.5873 2.09798 17.0752L5.7646 7.99998ZM8.00021 19H10.2089L8.00021 13.5333V19ZM6.00021 12.7558L4.32696 16.8972L6.00021 17.6084V12.7558ZM7.69842 7.44741L12.5683 19.5008L19.9858 16.5039L15.1159 4.45055L7.69842 7.44741ZM10.6766 9.47974C10.1645 9.68663 9.5817 9.43924 9.37481 8.92717C9.16792 8.4151 9.41532 7.83227 9.92739 7.62538C10.4395 7.41849 11.0223 7.66588 11.2292 8.17795C11.4361 8.69002 11.1887 9.27286 10.6766 9.47974Z"></path>
        </svg>
      ),
      points: [
        "AI algorithm development",
        "Computer vision applications",
        "NLP and text analysis"
      ]
    }
  ];

  const skillsData = [
    { name: "C", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" },
    { name: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
    { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { name: "NumPy", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg" },
    { name: "Pandas", icon: "https://cdn.simpleicons.org/pandas/150458" },
    { name: "TensorFlow", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
    { name: "OpenCV", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg" },
    { name: "PyTorch", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg" },
    { name: "Flask", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" },
    { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
    { name: "Tailwind CSS", icon: "https://skillicons.dev/icons?i=tailwind" },
    { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    { name: "Express", icon: "https://skillicons.dev/icons?i=express" },
    { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
    { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
    { name: "FastAPI", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" },
    { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
    { name: "Vercel", icon: "https://skillicons.dev/icons?i=vercel" },
    { name: "Heroku", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/heroku/heroku-original.svg" },
    { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
    { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
    { name: "Jupyter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg" },
  ];

  return (
    <section className="text-[var(--white)] mt-12 md:mt-0" id="home">
      <div className="max-w-5xl mx-auto space-y-8 md:py-36 pb-14">
        <div className="text-left space-y-4">
          <p className="text-md md:text-lg text-[var(--white-icon)] shiny-sec">
            Hi, I'm Shubham
          </p>
          <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-8 md:gap-4">
            <h1 className="text-[var(--white)] text-5xl md:text-6xl font-medium text-pretty leading-none">
              AIML Engineer
            </h1>
            <p className="text-md md:text-2xl text-[var(--white-icon)]">
              Hey, I am Shubham and I am a Computer Science student specializing in Full Stack development and AIML.
              I love experimenting with new technologies, optimizing code, and turning ideas into functional, problem solving and user friendly projects.
            </p>
          </div>
          
          {/* Profile Card Section */}
          <div className="flex flex-col lg:flex-row items-start gap-8 mt-8">
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-4">What I Do</h2>
              <div className="space-y-4">
                {cards.map((card, index) => (
                  <motion.div
                    key={index}
                    className="bg-[#1414149c] rounded-2xl p-6 border border-[var(--white-icon-tr)] cursor-pointer hover:border-[var(--sec)] transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    onMouseEnter={() => setHoveredCard(index)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <div className="flex items-center mb-4">
                      {card.icon}
                      <h3 className="text-lg font-semibold ml-2">{card.title}</h3>
                    </div>
                    <ul className={`space-y-2 overflow-hidden transition-all duration-300 ${hoveredCard === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                      {card.points.map((point, pointIndex) => (
                        <li key={pointIndex} className="text-[var(--white-icon)] text-sm flex items-start">
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--sec)] mt-1.5 mr-2 flex-shrink-0"></span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Profile Card - Simplified version */}
            <div className="w-full lg:w-64">
              <ProfileCard 
                name="Shubham"
                avatarUrl="/me.png"
                linkedinUrl="https://www.linkedin.com/in/shhhubham/"
              />
            </div>
          </div>
          
          <div className="relative flex overflow-hidden py-4 mt-8">
            <div className="flex animate-marquee-slower whitespace-nowrap">
              {skillsData.map((skill, index) => (
                <div 
                  key={index} 
                  className="flex items-center mx-12 group"
                >
                  <img 
                    src={skill.icon} 
                    alt={skill.name} 
                    className="w-6 h-6 opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" 
                  />
                  <span className="ml-3 text-[var(--white-icon)] opacity-60 group-hover:opacity-100 group-hover:text-[var(--sec)] transition-all duration-300 text-sm">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="flex animate-marquee-slower whitespace-nowrap" aria-hidden="true">
              {skillsData.map((skill, index) => (
                <div 
                  key={`duplicate-${index}`} 
                  className="flex items-center mx-12 group"
                >
                  <img 
                    src={skill.icon} 
                    alt={skill.name} 
                    className="w-6 h-6 opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" 
                  />
                  <span className="ml-3 text-[var(--white-icon)] opacity-60 group-hover:opacity-100 group-hover:text-[var(--sec)] transition-all duration-300 text-sm">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <style jsx>{`
            @keyframes marquee-slower {
              0% { transform: translateX(0%); }
              100% { transform: translateX(-100%); }
            }
            .animate-marquee-slower {
              animation: marquee-slower 60s linear infinite;
              display: flex;
            }
          `}</style>
          
          <div className="flex justify-start gap-2 pt-3 md:pt-6">
            <a
              target="_blank"
              href="https://github.com/shubhammgits"
              aria-label="GitHub"
              className="text-[var(--white-icon)] hover:text-white transition duration-300 ease-in-out border border-1 border-[var(--white-icon-tr)] p-3 rounded-xl bg-[#1414149c] hover:bg-[var(--white-icon-tr)]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-8"
              >
                <path d="M12.001 2C6.47598 2 2.00098 6.475 2.00098 12C2.00098 16.425 4.86348 20.1625 8.83848 21.4875C9.33848 21.575 9.52598 21.275 9.52598 21.0125C9.52598 20.775 9.51348 19.9875 9.51348 19.15C7.00098 19.6125 6.35098 18.5375 6.15098 17.975C6.03848 17.6875 5.55098 16.8 5.12598 16.5625C4.77598 16.375 4.27598 15.9125 5.11348 15.9C5.90098 15.8875 6.46348 16.625 6.65098 16.925C7.55098 18.4375 8.98848 18.0125 9.56348 17.75C9.65098 17.1 9.91348 16.6625 10.201 16.4125C7.97598 16.1625 5.65098 15.3 5.65098 11.475C5.65098 10.3875 6.03848 9.4875 6.67598 8.7875C6.57598 8.5375 6.22598 7.5125 6.77598 6.1375C6.77598 6.1375 7.61348 5.875 9.52598 7.1625C10.326 6.9375 11.176 6.825 12.026 6.825C12.876 6.825 13.726 6.9375 14.526 7.1625C16.4385 5.8625 17.276 6.1375 17.276 6.1375C17.826 7.5125 17.476 8.5375 17.376 8.7875C18.0135 9.4875 18.401 10.375 18.401 11.475C18.401 15.3125 16.0635 16.1625 13.8385 16.4125C14.201 16.725 14.5135 17.325 14.5135 18.2625C14.5135 19.6 14.501 20.675 14.501 21.0125C14.501 21.275 14.6885 21.5875 15.1885 21.4875C19.259 20.1133 21.9999 16.2963 22.001 12C22.001 6.475 17.526 2 12.001 2Z"></path>
              </svg>
            </a>
            <a
              target="_blank"
              href="https://www.linkedin.com/in/shhhubham/"
              aria-label="LinkedIn"
              className="text-[var(--white-icon)] hover:text-white transition duration-300 ease-in-out border border-1 border-[var(--white-icon-tr)] p-3 rounded-xl bg-[#1414149c] hover:bg-[var(--white-icon-tr)]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-8"
              >
                <path d="M18.3362 18.339H15.6707V14.1622C15.6707 13.1662 15.6505 11.8845 14.2817 11.8845C12.892 11.8845 12.6797 12.9683 12.6797 14.0887V18.339H10.0142V9.75H12.5747V10.9207H12.6092C12.967 10.2457 13.837 9.53325 15.1367 9.53325C17.8375 9.53325 18.337 11.3108 18.337 13.6245V18.339H18.3362ZM7.00373 8.57475C6.14573 8.57475 5.45648 7.88025 5.45648 7.026C5.45648 6.1725 6.14648 5.47875 7.00373 5.47875C7.85873 5.47875 8.55173 6.1725 8.55173 7.026C8.55173 7.88025 7.85798 8.57475 7.00373 8.57475ZM8.34023 18.339H5.66723V9.75H8.34023V18.339ZM19.6697 3H4.32923C3.59498 3 3.00098 3.5805 3.00098 4.29675V19.7033C3.00098 20.4202 3.59498 21 4.32923 21H19.6675C20.401 21 21.001 20.4202 21.001 19.7033V4.29675C21.001 3.5805 20.401 3 19.6675 3H19.6697Z"></path>
              </svg>
            </a>
            <a
              target="_blank"
              href="mailto:shubhamm18.work@gmail.com"
              aria-label="Email"
              className="text-[var(--white-icon)] hover:text-white transition duration-300 ease-in-out border border-1 border-[var(--white-icon-tr)] p-3 rounded-xl bg-[#1414149c] hover:bg-[var(--white-icon-tr)]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-8"
              >
                <path d="M1.5 8.67715V19C1.5 20.1046 2.39543 21 3.5 21H20.5C21.6046 21 22.5 20.1046 22.5 19V8.67715L12 14.3636L1.5 8.67715ZM21.5 7.09387L12 12.2318L2.5 7.09387L12 2L21.5 7.09387Z"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}