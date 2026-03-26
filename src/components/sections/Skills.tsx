import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const skillGroups = [
  {
    icon: '{ }',
    title: 'Core Languages',
    iconBg: 'rgba(99,102,241,0.15)',
    skills: [
      { label: 'Python', color: 'primary' },
      { label: 'JavaScript', color: 'primary' },
      { label: 'TypeScript', color: 'primary' },
      { label: 'Java', color: 'primary' },
      { label: 'C++', color: 'primary' },
    ],
  },
  {
    icon: '⚛',
    title: 'Frontend & Backend',
    iconBg: 'rgba(34,211,238,0.12)',
    skills: [
      { label: 'React', color: 'cyan' },
      { label: 'Spring Boot', color: 'cyan' },
      { label: 'Node.js', color: 'cyan' },
      { label: 'REST APIs', color: 'cyan' },
      { label: 'API Gateway', color: 'cyan' },
    ],
  },
  {
    icon: '🤖',
    title: 'AI / ML',
    iconBg: 'rgba(168,85,247,0.12)',
    skills: [
      { label: 'LLMs', color: 'purple' },
      { label: 'PyTorch', color: 'purple' },
      { label: 'Spiking Neural Networks', color: 'purple' },
      { label: 'Computer Vision', color: 'purple' },
      { label: 'RLHF', color: 'purple' },
      { label: 'MLOps', color: 'purple' },
      { label: 'MCP Protocol', color: 'purple' },
    ],
  },
  {
    icon: '☁',
    title: 'Cloud & DevOps',
    iconBg: 'rgba(251,146,60,0.1)',
    skills: [
      { label: 'AWS (Certified)', color: 'orange' },
      { label: 'Azure', color: 'orange' },
      { label: 'GCP', color: 'orange' },
      { label: 'Docker', color: 'orange' },
      { label: 'Kubernetes', color: 'orange' },
      { label: 'GitHub Actions', color: 'orange' },
      { label: 'Jenkins', color: 'orange' },
    ],
  },
  {
    icon: '🗄',
    title: 'Databases',
    iconBg: 'rgba(34,211,238,0.08)',
    skills: [
      { label: 'PostgreSQL', color: 'cyan' },
      { label: 'MongoDB', color: 'cyan' },
      { label: 'Redis', color: 'cyan' },
    ],
  },
  {
    icon: '⚡',
    title: 'Event-Driven & APIs',
    iconBg: 'rgba(99,102,241,0.12)',
    skills: [
      { label: 'Apache Kafka', color: 'primary' },
      { label: 'BFF Patterns', color: 'primary' },
      { label: 'API Lifecycle', color: 'primary' },
      { label: 'API Governance', color: 'primary' },
      { label: 'Microservices', color: 'primary' },
      { label: 'SDLC', color: 'primary' },
    ],
  },
];

const colorMap: Record<string, string> = {
  primary: 'tag-primary',
  cyan: 'tag-cyan',
  purple: 'tag-purple',
  orange: 'tag-orange',
};

const certs = [
  {
    icon: '🏆',
    title: 'AWS Certified Solutions Architect',
    sub: 'Associate · Amazon Web Services',
  },
  {
    icon: '📄',
    title: 'First Author · CVPR 2026',
    sub: 'Computer Vision for Education Workshop',
  },
  {
    icon: '📄',
    title: 'First Author · IEEE ICNC 2026',
    sub: 'Neuromorphic AI · Peer Reviewed',
  },
];

export default function Skills() {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });

  return (
    <section id="skills" className="skills-section">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="section-label">05 / Skills</p>
          <h2 className="section-title">
            Technical <span className="gradient-text">Skills</span>
          </h2>
        </motion.div>

        <div className="skills-container">
          {skillGroups.map((group, i) => (
            <motion.div
              key={group.title}
              className="skill-group"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.6 }}
            >
              <div className="skill-group-header">
                <div
                  className="skill-group-icon"
                  style={{ background: group.iconBg }}
                >
                  {group.icon}
                </div>
                <span className="skill-group-title">{group.title}</span>
              </div>
              <div className="skill-tags">
                {group.skills.map((skill) => (
                  <span
                    key={skill.label}
                    className={`skill-tag ${colorMap[skill.color]}`}
                  >
                    {skill.label}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <p className="section-label" style={{ marginTop: '4rem' }}>
            Certifications & Honors
          </p>
          <div className="cert-row">
            {certs.map((cert) => (
              <div key={cert.title} className="cert-card">
                <span className="cert-icon">{cert.icon}</span>
                <div className="cert-text">
                  <strong>{cert.title}</strong>
                  <span>{cert.sub}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
