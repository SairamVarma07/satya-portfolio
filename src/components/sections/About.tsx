import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import avatarImg from '../../assets/Gemini.png';

const stats = [
  { value: '4.0', label: 'GPA / 4.0' },
  { value: '2', label: 'Publications' },
  { value: '200+', label: 'Users Served' },
  { value: '5+', label: 'Years Coding' },
];

const highlights = [
  'Founder & Lead Engineer at Vytara AI, a production wellness platform with 200+ users',
  'First-author research accepted at CVPR 2026 and IEEE ICNC 2026',
  'Full-stack development with React, Java Spring Boot, Python, and AWS',
  'Strong focus on scalable systems, API design, and ML in production',
];

const education = [
  {
    degree: 'M.S. Computer Science',
    school: 'University of Illinois Springfield',
    meta: 'GPA 4.0 · Expected June 2026',
  },
  {
    degree: 'B.S. Computer Science',
    school: 'Lovely Professional University, India',
    meta: 'GPA 3.75 / 4.0',
  },
];

function AboutPhoto({ inView }: { inView: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 120, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 120, damping: 20 });

  const shineX = useTransform(springY, [-12, 12], ['0%', '100%']);
  const shineY = useTransform(springX, [-12, 12], ['0%', '100%']);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    rotateX.set(((e.clientY - cy) / (rect.height / 2)) * -8);
    rotateY.set(((e.clientX - cx) / (rect.width / 2)) * 8);
  };

  const onMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      className="about-photo-wrap"
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay: 0.85, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        ref={cardRef}
        className="about-photo-card"
        style={{
          rotateX: springX,
          rotateY: springY,
          transformStyle: 'preserve-3d',
          transformPerspective: 800,
        }}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        whileHover={{ scale: 1.02 }}
        transition={{ scale: { duration: 0.3 } }}
      >
        <div className="about-photo-ring" />
        <img
          src={avatarImg}
          alt="Satya Sairam Varma"
          className="about-photo-img"
          draggable={false}
        />
        <motion.div
          className="about-photo-shine"
          style={{
            background: useTransform(
              [shineX, shineY],
              ([x, y]) =>
                `radial-gradient(circle at ${x} ${y}, rgba(34,211,238,0.1) 0%, transparent 60%)`,
            ),
          }}
        />
        <div className="about-photo-chip">
          <span className="about-photo-chip-dot" />
          <span>Satya Sairam Varma · Atlanta, GA</span>
        </div>
      </motion.div>
      <div className="about-photo-glow" />
    </motion.div>
  );
}

export default function About() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="about" className="about-section">
      <div className="grid-bg" />
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="section-label">01 / About</p>
          <h2 className="section-title">
            Software Engineer &{' '}
            <span className="gradient-text">AI Researcher</span>
          </h2>
          <p className="about-intro">
            M.S. Computer Science candidate at UIS (4.0 GPA). Open to software engineering
            and AI research roles.
          </p>
        </motion.div>

        <div className="about-grid">
          <motion.div
            className="about-text"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            <p className="about-lead">
              I build production AI systems and publish research in computer vision and
              energy-efficient neural networks. My work spans full-stack engineering,
              machine learning, and research that ships to real users.
            </p>

            <ul className="about-highlights">
              {highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <div className="about-edu">
              <p className="about-edu-title">Education</p>
              {education.map((edu) => (
                <div key={edu.school} className="edu-item">
                  <span className="edu-degree">{edu.degree}</span>
                  <span className="edu-school">{edu.school}</span>
                  <span className="edu-meta">{edu.meta}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            <div className="about-stats">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  className="stat-card"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                >
                  <span className="stat-value">{s.value}</span>
                  <span className="stat-label">{s.label}</span>
                </motion.div>
              ))}
            </div>

            <AboutPhoto inView={inView} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
