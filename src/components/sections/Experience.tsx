import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const experiences = [
  {
    role: 'Founder & Lead Engineer',
    company: 'Vytara AI — AI Wellness Platform · Alpharetta, GA',
    period: 'June 2024 – Present',
    current: true,
    bullets: [
      'Built AI wellness application using React, Java Spring Boot, Python, and LLMs, unifying tasks, analytics, and ML-powered features serving 200+ users globally.',
      'Engineered a context-aware 24/7 AI wellness assistant with personalized user state across sessions delivering real-time health guidance, habit coaching, and adaptive recommendations at scale.',
      'Developed smart nutrition tracking module using Python and ML models to analyze dietary patterns, predict nutritional gaps, and surface personalized meal recommendations.',
      'Designed scalable distributed services with React frontend and Java Spring Boot backend with Python-based ML pipelines, owning API lifecycle from design to production with focus on API governance.',
    ],
  },
  {
    role: 'Software Engineering Intern',
    company: 'Cliff Tech Inc',
    period: 'Sep 2024 – Present',
    current: true,
    bullets: [
      'Worked within agile scrum-based engineering team, leveraging React, TypeScript, Java Spring Boot, and Python to build scalable distributed services and AI-powered features.',
      'Advocated and maintained API governance through collaboration, automation and outreach — demonstrating excellent communication skills and strong developer experience focus.',
      'Identified improvements to existing critical shared services, integrating LLM and ML capabilities with Python to accelerate AI-driven product development across the organization.',
    ],
  },
  {
    role: 'Software Development Engineer',
    company: 'Cipher Schools · Delhi, India',
    period: 'May 2022 – June 2024',
    current: false,
    bullets: [
      'Developed full-stack web application using React and Java Spring Boot serving 10K+ users, integrating Python-based ML models with strong understanding of API design and integration patterns.',
      'Collaborated across teams taking a pragmatic approach to software delivery while maintaining strong sense of ownership and accountability.',
      'Designed and implemented RESTful APIs and microservices architecture, improving system modularity and reducing API response latency by 35% through optimized query design and caching strategies.',
    ],
  },
];

export default function Experience() {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });

  return (
    <section id="experience" className="experience-section">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="section-label">02 / Experience</p>
          <h2 className="section-title">
            Work <span className="gradient-text">Experience</span>
          </h2>
        </motion.div>

        <div className="timeline">
          {experiences.map((exp, i) => (
            <ExperienceItem key={exp.company} exp={exp} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceItem({
  exp,
  index,
  inView,
}: {
  exp: (typeof experiences)[0];
  index: number;
  inView: boolean;
}) {
  return (
    <motion.div
      className="timeline-item"
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: 0.2 + index * 0.15, duration: 0.6 }}
    >
      <div className={`timeline-dot${exp.current ? ' active' : ''}`} />
      <div className="exp-card">
        <div className="exp-header">
          <span className="exp-role">{exp.role}</span>
          <span className={`exp-period${exp.current ? ' current' : ''}`}>
            {exp.current && <span style={{ marginRight: 6, color: 'inherit' }}>●</span>}
            {exp.period}
          </span>
        </div>
        <p className="exp-company">{exp.company}</p>
        <ul className="exp-bullets">
          {exp.bullets.map((b, j) => (
            <li key={j}>{b}</li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
