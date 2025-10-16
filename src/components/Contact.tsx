"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ success: boolean; message: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubmitStatus({
        success: true,
        message: "Thank you for your message! I'll get back to you soon."
      });
      
      setFormData({
        name: "",
        email: "",
        message: ""
      });
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: "Oops! Something went wrong. Please try again later."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="w-full py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-lg text-[var(--sec)] mb-2 shiny-sec">Let's talk</h2>
          <h3 className="text-4xl md:text-5xl font-medium text-[var(--white)] mb-6">
            Contact
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-[var(--white-icon)]">
              <p className="mb-4">
                Have a question or a project in mind? Feel free to reach out.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span>Email:</span>
                  <a href="mailto:shubhamm18.work@gmail.com" className="text-[var(--white)] hover:text-[var(--sec)] transition-colors">
                    shubhamm18.work@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <span>Phone:</span>
                  <span className="text-[var(--white)]">+91 8743025203</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>Location:</span>
                  <span className="text-[var(--white)]">India</span>
                </div>
                <div className="flex items-center gap-4 mt-4">
                  <a 
                    href="https://github.com/shubhammgits" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[var(--white-icon)] hover:text-[var(--white)] transition duration-300 ease-in-out border border-1 border-[var(--white-icon-tr)] p-3 rounded-xl bg-[#1414149c] hover:bg-[var(--white-icon-tr)]"
                    aria-label="GitHub"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="size-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/shhshubham/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[var(--white-icon)] hover:text-[var(--white)] transition duration-300 ease-in-out border border-1 border-[var(--white-icon-tr)] p-3 rounded-xl bg-[#1414149c] hover:bg-[var(--white-icon-tr)]"
                    aria-label="LinkedIn"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="size-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <div>
              <form
                id="contact-form"
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 contact-form"
              >
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  required
                  className="px-4 py-2 bg-[#1414149c] text-[var(--white)] border border-[var(--white-icon-tr)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--sec)]"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  required
                  className="px-4 py-2 bg-[#1414149c] text-[var(--white)] border border-[var(--white-icon-tr)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--sec)]"
                />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Message"
                  rows={6}
                  required
                  className="px-4 py-2 bg-[#1414149c] text-[var(--white)] border border-[var(--white-icon-tr)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--sec)] resize-none"
                ></textarea>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-4 py-2 bg-[var(--white-icon-tr)] text-[var(--white)] rounded-lg opacity-60 transition-opacity border border-[var(--white-icon-tr)] hover:opacity-100 hover:bg-[var(--white-icon-tr)] ${isSubmitting ? 'cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? "Sending..." : "Submit"}
                </button>
              </form>
              {submitStatus && (
                <motion.div
                  id="form-message"
                  className={`justify-center items-center mt-4 text-lg ${submitStatus.success ? 'text-green-400' : 'text-red-400'}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {submitStatus.success ? '✅ Thank you for your message!' : '❌ Error sending message. Please try again.'}
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}