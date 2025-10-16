"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const projects = [
  {
    id: 1,
    title: "Diabetes Prediction System",
    description: "A modern, responsive web application that predicts the likelihood of diabetes using machine learning algorithms. This tool analyzes medical parameters to provide instant predictions based on the Pima Indians Diabetes Database.",
    image: "/diabetes-prediction.jpg",
    githubUrl: "https://github.com/shubhammgits/Diabetes-Prediction",
    liveUrl: "https://diabetes-prediction-lzq4.onrender.com",
    status: "Deployed",
  },
  {
    id: 2,
    title: "AI Chatbot",
    description: "A conversational AI chatbot built using Python, Streamlit, and Google Gemini Pro API. This application provides a clean, responsive user interface for interacting with the Gemini model, maintaining a full conversation history for context aware responses.",
    image: "/ai-chatbot.jpg",
    githubUrl: "https://github.com/shubhammgits/Chatbot-gemini-pro-",
    liveUrl: "https://chatbot-gemini-pro.streamlit.app/",
    status: "Deployed",
  },
  {
    id: 3,
    title: "Plant Disease Recognition",
    description: "A sophisticated deep learning-powered web application that identifies plant diseases from leaf images and provides actionable treatment recommendations. Built with TensorFlow and Flask, this system achieves 97.11% accuracy in detecting 39 different plant diseases across multiple crop species.",
    image: "/plant-disease.jpg",
    githubUrl: "https://github.com/shubhammgits/Plant-Disease-Recognition",
    liveUrl: "https://plant-disease-recognition-hip3.onrender.com",
    status: "Deployed",
  },
  {
    id: 4,
    title: "Fake News Prediction",
    description: "A web app to detect whether a news article is Fake or Real using machine learning. The app leverages natural language processing and a trained classification model to provide instant predictions.",
    image: "/fake-news.jpg",
    githubUrl: "https://github.com/shubhammgits/Fake-News-Prediction-ML-",
    liveUrl: "https://fake-news-detector-vs.streamlit.app/",
    status: "Deployed",
  }
];

export default function Projects() {
  const [imageLoaded, setImageLoaded] = useState<{[key: number]: boolean}>({});

  const handleImageLoad = (id: number) => {
    setImageLoaded(prev => ({ ...prev, [id]: true }));
  };

  return (
    <section
      id="projects"
      className="py-12 border-t border-[#ffffff10] text-[var(--white)]"
    >
      <div className="max-w-5xl mx-auto">
        <h2 className="text-lg text-[var(--sec)] mb-2 shiny-sec">My work</h2>
        <h3 className="text-4xl md:text-5xl font-medium mb-8">Projects</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div 
              key={project.id} 
              className="group project-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 mb-4">
                  <div className="relative w-full h-48 md:h-72">
                    {!imageLoaded[project.id] && (
                      <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse flex items-center justify-center">
                        <svg className="w-10 h-10 text-gray-400" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512">
                          <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z"/>
                        </svg>
                      </div>
                    )}
                    <img
                      src={project.image}
                      alt={project.title}
                      className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${imageLoaded[project.id] ? 'opacity-100' : 'opacity-0'}`}
                      onLoad={() => handleImageLoad(project.id)}
                    />
                  </div>
                </div>
                <div className="flex items-center px-3">
                  <div className="flex-grow">
                    <h4 className="text-2xl font-semibold">{project.title}</h4>
                    <span className="py-1 text-sm text-[var(--white-icon)]">
                      {project.status}
                    </span>
                  </div>
                  <div className="flex gap-2 ml-auto">
                    <a
                      target="_blank"
                      href={project.githubUrl}
                      aria-label="GitHub"
                      className="size-14 flex justify-center items-center text-[var(--white-icon)] hover:text-white transition duration-300 ease-in-out border border-1 border-[var(--white-icon-tr)] p-3 rounded-xl bg-[#1414149c] hover:bg-[var(--white-icon-tr)]"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-7"
                      >
                        <path d="M24 12L18.3431 17.6569L16.9289 16.2426L21.1716 12L16.9289 7.75736L18.3431 6.34315L24 12ZM2.82843 12L7.07107 16.2426L5.65685 17.6569L0 12L5.65685 6.34315L7.07107 7.75736L2.82843 12ZM9.78845 21H7.66009L14.2116 3H16.3399L9.78845 21Z" />
                      </svg>
                    </a>
                    <a
                      target="_blank"
                      href={project.liveUrl}
                      aria-label="Preview"
                      className="size-14 flex justify-center items-center text-[var(--white-icon)] hover:text-white transition duration-300 ease-in-out border border-1 border-[var(--white-icon-tr)] p-3 rounded-xl bg-[#1414149c] hover:bg-[var(--white-icon-tr)]"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-7"
                      >
                        <path d="M16.0037 9.41421L7.39712 18.0208L5.98291 16.6066L14.5895 8H7.00373V6H18.0037V17H16.0037V9.41421Z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </a>
            </motion.div>
          ))}
        </div>
        <a
          target="_blank"
          href="https://github.com/shubhammgits"
          aria-label="GitHub"
          className="w-full flex items-center justify-center gap-2 mt-9 text-[var(--white-icon)] hover:text-white transition duration-300 ease-in-out border border-[var(--white-icon-tr)] p-3 rounded-full bg-[#1414149c] hover:bg-[var(--white-icon-tr)] hover:scale-105"
        >
          <span className="md:text-lg text-md">More projects on</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path
              d="M12.001 2C6.47598 2 2.00098 6.475 2.00098 12C2.00098 16.425 4.86348 20.1625 8.83848 21.4875C9.33848 21.575 9.52598 21.275 9.52598 21.0125C9.52598 20.775 9.51348 19.9875 9.51348 19.15C7.00098 19.6125 6.35098 18.5375 6.15098 17.975C6.03848 17.6875 5.55098 16.8 5.12598 16.5625C4.77598 16.375 4.27598 15.9125 5.11348 15.9C5.90098 15.8875 6.46348 16.625 6.65098 16.925C7.55098 18.4375 8.98848 18.0125 9.56348 17.75C9.65098 17.1 9.91348 16.6625 10.201 16.4125C7.97598 16.1625 5.65098 15.3 5.65098 11.475C5.65098 10.3875 6.03848 9.4875 6.67598 8.7875C6.57598 8.5375 6.22598 7.5125 6.77598 6.1375C6.77598 6.1375 7.61348 5.875 9.52598 7.1625C10.326 6.9375 11.176 6.825 12.026 6.825C12.876 6.825 13.726 6.9375 14.526 7.1625C16.4385 5.8625 17.276 6.1375 17.276 6.1375C17.826 7.5125 17.476 8.5375 17.376 8.7875C18.0135 9.4875 18.401 10.375 18.401 11.475C18.401 15.3125 16.0635 16.1625 13.8385 16.4125C14.201 16.725 14.5135 17.325 14.5135 18.2625C14.5135 19.6 14.501 20.675 14.501 21.0125C14.501 21.275 14.6885 21.5875 15.1885 21.4875C19.259 20.1133 21.9999 16.2963 22.001 12C22.001 6.475 17.526 2 12.001 2Z"
            ></path>
          </svg>
        </a>
      </div>
    </section>
  );
}