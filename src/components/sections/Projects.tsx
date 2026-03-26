import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const GITHUB = 'https://github.com/SairamVarma07';

const projects = [
  {
    number: '01',
    icon: '🧠',
    title: 'Vytara AI — Wellness Platform',
    href: GITHUB,
    desc: 'Full-stack AI wellness application with a context-aware 24/7 AI assistant. Features smart nutrition tracking, habit coaching, adaptive recommendations, and ML-powered analytics — serving 200+ global users.',
    tags: [
      { label: 'React', color: 'cyan' },
      { label: 'Java Spring Boot', color: 'default' },
      { label: 'Python', color: 'default' },
      { label: 'LLMs', color: 'purple' },
      { label: 'ML Pipelines', color: 'purple' },
      { label: 'PostgreSQL', color: 'default' },
    ],
    stat: '200+ Global Users',
    accentColor: 'var(--primary)',
  },
  {
    number: '02',
    icon: '⚡',
    title: 'SNN Drowsiness Detection System',
    href: GITHUB,
    desc: 'Designed and evaluated a Convolutional Spiking Neural Network architecture for real-time drowsiness detection via facial cues — achieving 97.94% accuracy with 61% energy reduction vs CNN baseline. Published at IEEE ICNC 2026.',
    tags: [
      { label: 'PyTorch', color: 'cyan' },
      { label: 'SpikingJelly', color: 'cyan' },
      { label: 'Computer Vision', color: 'purple' },
      { label: 'SNN', color: 'default' },
      { label: 'Neuromorphic AI', color: 'default' },
    ],
    stat: '97.94% Accuracy · 61% Energy Reduction',
    accentColor: 'var(--secondary)',
  },
  {
    number: '03',
    icon: '🌐',
    title: 'EdTech Full-Stack Platform',
    href: GITHUB,
    desc: 'Built a production-grade full-stack web application using React and Java Spring Boot serving 10K+ users. Integrated Python-based ML models for personalized learning recommendations, demonstrating deep understanding of API design and distributed systems.',
    tags: [
      { label: 'React', color: 'cyan' },
      { label: 'Spring Boot', color: 'default' },
      { label: 'Python ML', color: 'purple' },
      { label: 'REST APIs', color: 'default' },
      { label: 'PostgreSQL', color: 'default' },
    ],
    stat: '10K+ Users',
    accentColor: 'var(--accent)',
  },
];

export default function Projects() {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });

  return (
    <section id="projects" className="projects-section">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="section-label">03 / Projects</p>
          <h2 className="section-title">
            Featured <span className="gradient-text">Projects</span>
          </h2>
        </motion.div>

        <div className="projects-grid">
          {projects.map((proj, i) => (
            <motion.div
              key={proj.number}
              className="project-card"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.12, duration: 0.6 }}
              onClick={() => window.open(proj.href, '_blank', 'noreferrer')}
              role="link"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && window.open(proj.href, '_blank', 'noreferrer')}
            >
              <p className="project-number">PROJECT {proj.number}</p>
              <div className="project-icon">{proj.icon}</div>
              <h3 className="project-title">{proj.title}</h3>
              <p className="project-desc">{proj.desc}</p>
              <div className="project-tags">
                {proj.tags.map((tag) => (
                  <span
                    key={tag.label}
                    className={`project-tag${tag.color !== 'default' ? ` ${tag.color}` : ''}`}
                  >
                    {tag.label}
                  </span>
                ))}
              </div>
              <div className="project-footer">
                <span className="project-stat">{proj.stat}</span>
                <span className="project-github-hint">GitHub ↗</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
