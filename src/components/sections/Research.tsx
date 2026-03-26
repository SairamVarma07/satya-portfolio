import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const papers = [
  {
    badge: 'CVPR 2026 — CV4Edu Workshop',
    badgeClass: 'badge-cvpr',
    title: 'Toward Efficient Student Engagement Analysis with Spiking Neural Networks',
    href: null,
    meta: {
      venue: 'Computer Vision for Education Workshop, CVPR 2026',
      status: 'Accepted · In Proceedings',
      role: 'First Author',
    },
    highlights: [
      'Proposed a research roadmap transferring energy-efficient SNN methodology from drowsiness detection to multimodal classroom engagement analysis.',
      'Demonstrated that a CSNN achieves 97.94% accuracy on a custom eye-mouth dataset while reducing energy consumption by 61% vs. CNN baseline.',
      'Outlined a multimodal perception pipeline (visual + temporal) as a foundation for human-in-the-loop annotation workflows enabling efficient labeling at scale.',
    ],
    metrics: [
      { value: '97.94%', label: 'Accuracy' },
      { value: '61%', label: 'Energy Savings' },
      { value: 'CVPR', label: 'Venue' },
    ],
  },
  {
    badge: 'IEEE ICNC 2026',
    badgeClass: 'badge-ieee',
    title: 'Energy Efficient Drowsiness Detection with Spiking Neural Networks',
    href: 'http://www.conf-icnc.org/2026/papers/p411-manthena.pdf',
    meta: {
      venue: 'IEEE International Conference on Computing, Networking and Communications',
      status: 'Peer-Reviewed · Published 2026',
      role: 'First Author',
    },
    highlights: [
      'Designed and evaluated a CSNN architecture for real-time drowsiness detection via facial cues — achieving 97.94% accuracy with 61% energy reduction.',
      'Implemented and compared SNN vs. CNN across accuracy, inference speed, and energy consumption with controlled datasets, ablation studies, and domain-specific metrics.',
      'Contributed to a real-world AI use case in healthcare-adjacent monitoring — end-to-end pipeline from data collection through model training, evaluation, and publication.',
    ],
    metrics: [
      { value: '97.94%', label: 'Top Accuracy' },
      { value: '61%', label: 'Energy Reduction' },
      { value: 'IEEE', label: 'Venue' },
    ],
  },
];

export default function Research() {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });

  return (
    <section id="research" className="research-section">
      <div className="grid-bg" />
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="section-label">04 / Research</p>
          <h2 className="section-title">
            Publications &{' '}
            <span className="gradient-text">Research</span>
          </h2>
        </motion.div>

        <div className="research-grid">
          {papers.map((paper, i) => (
            <motion.div
              key={paper.badge}
              className={`research-card${paper.href ? ' research-card-link' : ''}`}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.15, duration: 0.7 }}
              onClick={paper.href ? () => window.open(paper.href!, '_blank', 'noreferrer') : undefined}
              role={paper.href ? 'link' : undefined}
              tabIndex={paper.href ? 0 : undefined}
              onKeyDown={paper.href ? (e) => e.key === 'Enter' && window.open(paper.href!, '_blank', 'noreferrer') : undefined}
            >
              <div className={`research-conf-badge ${paper.badgeClass}`}>
                <span className="badge-dot" />
                {paper.badge}
              </div>

              <h3 className="research-title">{paper.title}</h3>

              <div className="research-meta">
                <span>{paper.meta.venue}</span>
                <span>·</span>
                <span className="author-badge">{paper.meta.role}</span>
                <span>·</span>
                <span>{paper.meta.status}</span>
              </div>

              <ul className="research-highlights">
                {paper.highlights.map((h, j) => (
                  <li key={j}>{h}</li>
                ))}
              </ul>

              <div className="research-metrics">
                {paper.metrics.map((m) => (
                  <div key={m.label} className="metric">
                    <span className="metric-value">{m.value}</span>
                    <span className="metric-label">{m.label}</span>
                  </div>
                ))}
                {paper.href && (
                  <div className="research-read-link">
                    Read Paper ↗
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
