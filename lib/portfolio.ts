export type PortfolioLink = {
  label: string;
  href: string;
};

export type PortfolioProject = {
  title: string;
  description: string;
  href: string;
  stack?: string[];
};

export const portfolio = {
  name: 'Shubham',
  location: 'New Delhi, India',
  headline: 'Full‑Stack + AI/ML • Building weirdly cool web experiences',
  bio: [
    "Hey, I’m Shubham — a Computer Science student who likes shipping things that feel a little like a game.",
    'I’m into Full‑Stack development and AI/ML, and I enjoy experimenting with new tech, optimizing code, and turning ideas into useful products.',
  ],
  socials: [
    { label: 'GitHub', href: 'https://github.com/shubhammgits' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/shhshubham/' },
    { label: 'X', href: 'https://x.com/shhshubhamm' },
  ] satisfies PortfolioLink[],
  projects: [
    {
      title: 'Fake News Prediction (ML)',
      description: 'A machine learning project exploring fake-news classification.',
      href: 'https://github.com/shubhammgits/Fake-News-Prediction-ML-',
      stack: ['ML', 'Python', 'Notebook'],
    },
    {
      title: 'Diabetes Prediction',
      description: 'A prediction-focused project experimenting with features + model evaluation.',
      href: 'https://github.com/shubhammgits/Diabetes-Prediction',
      stack: ['JavaScript', 'ML'],
    },
    {
      title: 'Chatbot (Gemini Pro)',
      description: 'A chatbot experiment powered by Gemini Pro workflows.',
      href: 'https://github.com/shubhammgits/Chatbot-gemini-pro-',
      stack: ['Python', 'GenAI'],
    },
    {
      title: 'Real‑Time Face Mask Detection',
      description: 'A real-time web app experiment for face mask detection.',
      href: 'https://github.com/shubhammgits/Real-Time-Face-Mask-Detection-WebApp',
      stack: ['JavaScript', 'DL'],
    },
  ] satisfies PortfolioProject[],

  // TODO: Replace with your preferred email (GitHub profile doesn’t expose one).
  contact: {
    primaryCtaLabel: 'Message me on LinkedIn',
    primaryCtaHref: 'https://www.linkedin.com/in/shhshubham/',
  },

  spotify: {
    playlistTitle: 'PlayIt',
    playlistId: '3reHqJToLNaswBhYsS0q1P',
  },
};
