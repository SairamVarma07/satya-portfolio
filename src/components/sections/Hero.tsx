import { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { useTypewriter } from '../../hooks/useTypewriter';

const HeroScene = lazy(() => import('../three/HeroScene'));

const roles = [
  'Software Engineer',
  'AI Researcher',
  'Founder @ Vytara AI',
  'MS CS @ UIS — GPA 4.0',
  'AWS Solutions Architect',
];

const badges = ['AWS Certified', 'CVPR 2026', 'IEEE ICNC 2026', 'First Author'];

/* ── Tech stack floating in the right half of the hero ── */
const TECH = [
  { label: 'Python',      l: '60%', t: '15%', delay: 0.0, dur: 4.2, sz: 'lg' as const, c: '#22d3ee', b: 'rgba(34,211,238,0.07)'  },
  { label: 'ML',          l: '78%', t: '21%', delay: 0.4, dur: 3.8, sz: 'xl' as const, c: '#818cf8', b: 'rgba(99,102,241,0.09)'   },
  { label: 'AI / LLMs',  l: '67%', t: '34%', delay: 0.2, dur: 4.5, sz: 'lg' as const, c: '#6366f1', b: 'rgba(99,102,241,0.08)'   },
  { label: 'Java',        l: '57%', t: '50%', delay: 0.6, dur: 3.6, sz: 'md' as const, c: '#c084fc', b: 'rgba(168,85,247,0.07)'   },
  { label: 'C++',         l: '82%', t: '40%', delay: 0.1, dur: 4.0, sz: 'md' as const, c: '#e2e8f0', b: 'rgba(148,163,184,0.06)'  },
  { label: 'TypeScript',  l: '70%', t: '58%', delay: 0.5, dur: 3.9, sz: 'md' as const, c: '#7dd3fc', b: 'rgba(56,189,248,0.07)'   },
  { label: 'React',       l: '59%', t: '70%', delay: 0.3, dur: 4.3, sz: 'sm' as const, c: '#7dd3fc', b: 'rgba(56,189,248,0.06)'   },
  { label: 'AWS',         l: '79%', t: '64%', delay: 0.7, dur: 3.7, sz: 'sm' as const, c: '#fdba74', b: 'rgba(251,146,60,0.07)'   },
  { label: 'Docker',      l: '54%', t: '80%', delay: 0.4, dur: 4.1, sz: 'sm' as const, c: '#93c5fd', b: 'rgba(96,165,250,0.06)'   },
  { label: 'PyTorch',     l: '72%', t: '78%', delay: 0.8, dur: 3.5, sz: 'sm' as const, c: '#fb923c', b: 'rgba(249,115,22,0.06)'   },
  { label: 'Kafka',       l: '83%', t: '53%', delay: 0.6, dur: 4.4, sz: 'sm' as const, c: '#c4b5fd', b: 'rgba(167,139,250,0.06)'  },
  { label: 'Spring Boot', l: '61%', t: '87%', delay: 0.2, dur: 3.8, sz: 'xs' as const, c: '#86efac', b: 'rgba(74,222,128,0.06)'   },
  { label: 'SNN',         l: '74%', t: '12%', delay: 0.9, dur: 4.2, sz: 'sm' as const, c: '#f9a8d4', b: 'rgba(244,114,182,0.06)'  },
  { label: 'Kubernetes',  l: '84%', t: '29%', delay: 0.3, dur: 4.0, sz: 'xs' as const, c: '#93c5fd', b: 'rgba(96,165,250,0.06)'   },
  { label: 'LLMs',        l: '88%', t: '72%', delay: 0.5, dur: 4.3, sz: 'xs' as const, c: '#818cf8', b: 'rgba(99,102,241,0.07)'   },
] as const;

const FS = { xl: '1rem', lg: '0.88rem', md: '0.78rem', sm: '0.7rem', xs: '0.62rem' } as const;
const PX = { xl: '14px', lg: '12px', md: '11px', sm: '10px', xs: '8px'  } as const;
const PY = { xl: '7px',  lg: '6px',  md: '5px',  sm: '4px',  xs: '3px'  } as const;

function TechCloud() {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 2,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {TECH.map((tag) => (
        <motion.div
          key={tag.label}
          style={{ position: 'absolute', left: tag.l, top: tag.t }}
          initial={{ opacity: 0, scale: 0.7, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 1.0 + tag.delay, duration: 0.5, ease: 'easeOut' }}
        >
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: FS[tag.sz],
              fontWeight: 500,
              letterSpacing: '0.5px',
              color: tag.c,
              background: tag.b,
              border: `1px solid ${tag.c}38`,
              padding: `${PY[tag.sz]} ${PX[tag.sz]}`,
              borderRadius: '4px',
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
              whiteSpace: 'nowrap',
              boxShadow: `0 0 14px ${tag.c}18, 0 0 1px ${tag.c}25`,
              animation: `tech-float ${tag.dur}s ease-in-out infinite`,
              animationDelay: `${tag.delay}s`,
            }}
          >
            {tag.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default function Hero() {
  const displayText = useTypewriter(roles, 75, 2200);

  return (
    <section id="hero" className="hero-section">
      {/* Three.js starfield + particle background */}
      <div className="hero-canvas">
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      </div>

      {/* Radial gradient overlay */}
      <div className="hero-overlay" />

      {/* Floating tech tags — right half */}
      <TechCloud />

      {/* Left-side text content */}
      <div className="hero-content">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          <motion.div
            className="hero-badges"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            {badges.map((b) => (
              <span key={b} className="hero-badge">{b}</span>
            ))}
          </motion.div>

          <motion.p
            className="hero-eyebrow"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            Hello, World — I'm
          </motion.p>

          <motion.h1
            className="hero-name"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
          >
            <span className="name-line-1">SATYA SAIRAM</span>
            <span className="name-line-2">VARMA</span>
          </motion.h1>

          <motion.div
            className="hero-typewriter"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <span className="typewriter-prefix">{'>'}_</span>
            <span>{displayText}</span>
            <span className="typewriter-cursor" />
          </motion.div>

          <motion.div
            className="hero-cta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <button
              className="btn-primary"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span>Explore My Work</span>
            </button>
            <button
              className="btn-secondary"
              onClick={() => document.getElementById('research')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Research
            </button>
          </motion.div>
        </motion.div>
      </div>

      <div className="hero-scroll-indicator">
        <span className="scroll-text">Scroll</span>
        <div className="scroll-line" />
      </div>
    </section>
  );
}
