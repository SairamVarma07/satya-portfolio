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

const education = [
  {
    degree: 'M.S. Computer Science',
    school: 'University of Illinois Springfield',
    meta: 'GPA 4.0 / 4.0 · Expected June 2026',
  },
  {
    degree: 'B.S. Computer Science',
    school: 'Lovely Professional University, India',
    meta: 'GPA 3.75 / 4.0 · May 2024',
  },
];

function AboutPhoto({ inView }: { inView: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);

  // 3-D tilt driven by mouse position over the card
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 120, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 120, damping: 20 });

  // Shine overlay shifts with tilt
  const shineX = useTransform(springY, [-12, 12], ['0%', '100%']);
  const shineY = useTransform(springX, [-12, 12], ['0%', '100%']);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    rotateX.set(((e.clientY - cy) / (rect.height / 2)) * -10);
    rotateY.set(((e.clientX - cx) / (rect.width / 2)) * 10);
  };

  const onMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      className="about-photo-wrap"
      initial={{ opacity: 0, y: 40, scale: 0.94 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay: 0.85, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* 3-D tilt card */}
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
        whileHover={{ scale: 1.03 }}
        transition={{ scale: { duration: 0.3 } }}
      >
        {/* Glow border ring */}
        <div className="about-photo-ring" />

        {/* Photo */}
        <img
          src={avatarImg}
          alt="Satya Sairam Varma"
          className="about-photo-img"
          draggable={false}
        />

        {/* Moving shine overlay */}
        <motion.div
          className="about-photo-shine"
          style={{
            background: useTransform(
              [shineX, shineY],
              ([x, y]) =>
                `radial-gradient(circle at ${x} ${y}, rgba(34,211,238,0.12) 0%, transparent 60%)`,
            ),
          }}
        />

        {/* Bottom identity chip */}
        <div className="about-photo-chip">
          <span className="about-photo-chip-dot" />
          <span>Satya Sairam Varma · Atlanta, GA</span>
        </div>
      </motion.div>

      {/* Ambient glow underneath */}
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
            Building the Future{' '}
            <span className="gradient-text">with AI</span>
          </h2>
        </motion.div>

        <div className="about-grid">
          <motion.div
            className="about-text"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            <p>
              I'm a <strong>Software Engineer and AI Researcher</strong> pursuing my Master's
              in Computer Science at the University of Illinois Springfield with a{' '}
              <span className="about-highlight">4.0 GPA</span>. I build intelligent systems
              that sit at the intersection of engineering and research.
            </p>
            <p>
              As the <strong>Founder & Lead Engineer of Vytara AI</strong>, I've built
              a production AI wellness platform serving 200+ global users — combining
              React, Java Spring Boot, Python, and cutting-edge LLMs into a unified product.
            </p>
            <p>
              My research spans <strong>Spiking Neural Networks</strong>, energy-efficient AI,
              and multimodal perception — with{' '}
              <span className="about-highlight">first-author publications</span> accepted
              at CVPR 2026 and IEEE ICNC 2026.
            </p>
            <p>
              I'm passionate about API governance, developer experience, and building systems
              that are both <strong>scalable</strong> and <strong>maintainable</strong> —
              from design to production.
            </p>

            <div className="about-edu">
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

            {/* Avatar photo — revealed below the stats */}
            <AboutPhoto inView={inView} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
