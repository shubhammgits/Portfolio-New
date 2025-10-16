"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="py-20 border-t border-[#ffffff10]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--white)] mb-4">About Me</h2>
          <p className="text-xl text-[var(--white-icon)] max-w-3xl mx-auto">
            Get to know me better
          </p>
        </motion.div>
        
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="bg-[#1414149c] rounded-2xl p-6 md:p-8 border border-[var(--white-icon-tr)]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-[var(--white-icon)] mb-4">
                I am Shubham, a B.Tech CSE student with a passion for data science, AI, and machine learning. 
                With a strong foundation in Python programming, data preprocessing, visualization, and model building, 
                I'm dedicated to creating innovative solutions that leverage the power of data.
              </p>
              
              <p className="text-[var(--white-icon)] mb-4">
                My expertise extends to various Data Science tools including Pandas, NumPy, and TensorFlow, 
                along with integrating ML models with web applications using the MERN Stack. 
                I'm constantly exploring new technologies and methodologies to stay at the forefront of this rapidly evolving field.
              </p>
              
              <p className="text-[var(--white-icon)] mb-4">
                Currently, I'm diving deep into AI & advanced Data Science concepts while actively seeking a Data Science Internship 
                where I can collaborate, innovate, and contribute to impactful projects. 
                My recent work includes a diabetes prediction system, fake news detector ML model, 
                and various image classification projects that showcase my practical application of theoretical knowledge.
              </p>
              
              <div className="mt-8 p-6 bg-[#1414149c] rounded-xl border border-[var(--white-icon-tr)]">
                <h3 className="text-xl font-bold text-[var(--white)] mb-3">What I'm Looking For</h3>
                <p className="text-[var(--white-icon)]">
                  I'm actively seeking opportunities for a Data Science Internship where I can apply my skills, 
                  learn from experienced professionals, and contribute to meaningful projects. 
                  If you have an opportunity that aligns with my interests and skills, I'd love to connect!
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}