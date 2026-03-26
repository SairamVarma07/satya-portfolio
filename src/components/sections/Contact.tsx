import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

type Status = 'idle' | 'sending' | 'sent';
interface FormState { name: string; email: string; subject: string; message: string; }

/* ── Status readouts on the right panel ─────────────────────────── */
const STATUS_ROWS = [
  { label: 'AVAILABILITY',  value: 'Full-time · Contract · Research', color: '#4ade80' },
  { label: 'RESPONSE TIME', value: '< 24 hours',                      color: '#22d3ee' },
  { label: 'TIMEZONE',      value: 'EST (UTC-5) · Flexible',          color: '#818cf8' },
  { label: 'ENCRYPTION',   value: 'AES-256 · Secure Channel',        color: '#a855f7' },
];

const INFO_ITEMS = [
  { icon: '✉',  label: 'Email',    value: 'sairamvrm@gmail.com',           href: 'mailto:sairamvrm@gmail.com'                  },
  { icon: 'in', label: 'LinkedIn', value: 'linkedin.com/in/sairam-varma07', href: 'https://linkedin.com/in/sairam-varma07'       },
  { icon: '◎',  label: 'Location', value: 'Atlanta, GA · Open to Remote',   href: null                                          },
];

/* ─────────────────────────────────────────────────────────────────
   RIGHT — Comm Hub: rotating CSS rings + status board + info list
───────────────────────────────────────────────────────────────── */
function CommHub({ inView }: { inView: boolean }) {
  return (
    <motion.div
      className="comm-hub-col"
      initial={{ opacity: 0, x: 40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
    >
      {/* ── Circular ring system ── */}
      <div className="comm-hub-ring-wrap">
        {/* Ambient glow behind rings */}
        <div className="ch-ambient" />

        {/* Ring 1 — outermost, dashed, slow CW */}
        <div className="ch-ring ch-ring-1" />
        {/* Ring 2 — medium, partial arc, CCW */}
        <div className="ch-ring ch-ring-2" />
        {/* Ring 3 — inner, bright leading edge, fast CW */}
        <div className="ch-ring ch-ring-3" />

        {/* Cardinal tick marks on outer ring */}
        <span className="ch-tick ch-n" />
        <span className="ch-tick ch-e" />
        <span className="ch-tick ch-s" />
        <span className="ch-tick ch-w" />

        {/* Center monogram */}
        <div className="ch-center">
          <div className="ch-center-pulse" />
          <p className="ch-monogram">SSV</p>
          <p className="ch-mono-sub">ENGINEER · AI</p>
        </div>
      </div>

      {/* ── Status readout board ── */}
      <div className="comm-status-board">
        <p className="csb-header">
          <span className="csb-header-dot" />
          SYSTEM STATUS
        </p>
        {STATUS_ROWS.map((row, i) => (
          <motion.div
            key={row.label}
            className="csb-row"
            initial={{ opacity: 0, x: 16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.7 + i * 0.1, duration: 0.45 }}
          >
            <span className="csb-dot" style={{ background: row.color, boxShadow: `0 0 6px ${row.color}` }} />
            <span className="csb-label">{row.label}</span>
            <span className="csb-value" style={{ color: row.color }}>{row.value}</span>
          </motion.div>
        ))}
      </div>

      {/* ── Contact info list ── */}
      <div className="comm-info-list">
        {INFO_ITEMS.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.1 + i * 0.1, duration: 0.45 }}
          >
            {item.href ? (
              <a
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                className="contact-info-item"
              >
                <span className="ci-icon">{item.icon}</span>
                <div><span className="ci-label">{item.label}</span><span className="ci-value">{item.value}</span></div>
              </a>
            ) : (
              <div className="contact-info-item">
                <span className="ci-icon">{item.icon}</span>
                <div><span className="ci-label">{item.label}</span><span className="ci-value">{item.value}</span></div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   LEFT — Terminal form panel
───────────────────────────────────────────────────────────────── */
function TerminalForm({
  form, update, status, handleSubmit, inView,
}: {
  form: FormState;
  update: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  status: Status;
  handleSubmit: (e: React.FormEvent) => void;
  inView: boolean;
}) {
  const label =
    status === 'sending' ? 'TRANSMITTING...'
    : status === 'sent'  ? '✓ TRANSMISSION COMPLETE'
    : 'TRANSMIT  MESSAGE  ➤';

  return (
    <motion.div
      className="terminal-panel"
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }}
    >
      {/* Corner brackets */}
      <span className="tp-corner tp-tl" />
      <span className="tp-corner tp-tr" />
      <span className="tp-corner tp-bl" />
      <span className="tp-corner tp-br" />

      {/* Slow scanning line */}
      <div className="tp-scanline" />

      {/* Title bar */}
      <div className="tp-titlebar">
        <div className="tp-traffic-lights">
          <span style={{ background: '#ef4444' }} />
          <span style={{ background: '#f59e0b' }} />
          <span style={{ background: '#22c55e' }} />
        </div>
        <span className="tp-titlebar-text">INITIATE_CONTACT.SH</span>
        <span className="tp-secure-badge">● SECURE</span>
      </div>

      {/* Boot lines */}
      <motion.div
        className="tp-boot"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        {['System: Ready', 'Encryption: Active', 'Awaiting input...'].map((l, i) => (
          <motion.span
            key={l}
            className="tp-boot-line"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.55 + i * 0.12 }}
          >
            <span className="tp-boot-prefix">&gt;</span> {l}
          </motion.span>
        ))}
      </motion.div>

      {/* Form */}
      <form className="tp-form" onSubmit={handleSubmit} noValidate>
        <div className="tp-row">
          <TpField label="NAME"  name="name"  value={form.name}  onChange={update} placeholder="Your full name" />
          <TpField label="EMAIL" name="email" type="email" value={form.email} onChange={update} placeholder="your@email.com" />
        </div>
        <TpField label="SUBJECT" name="subject" value={form.subject} onChange={update} placeholder="What's this about?" />
        <TpField label="MESSAGE" name="message" value={form.message} onChange={update} placeholder="Tell me about your project or idea..." textarea />

        <motion.button
          type="submit"
          className="tp-submit"
          disabled={status !== 'idle'}
          whileHover={status === 'idle' ? { scale: 1.015 } : {}}
          whileTap={status === 'idle'   ? { scale: 0.975 } : {}}
        >
          {status === 'sending' && <span className="contact-spinner" />}
          <span>{label}</span>
        </motion.button>

        <AnimatePresence>
          {status === 'sent' && (
            <motion.p
              className="tp-success"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              ✓ Email client opened with your message pre-filled — hit Send to complete the transmission.
            </motion.p>
          )}
        </AnimatePresence>
      </form>
    </motion.div>
  );
}

function TpField({
  label, name, value, onChange, placeholder, type = 'text', textarea,
}: {
  label: string; name: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder: string; type?: string; textarea?: boolean;
}) {
  return (
    <div className="tp-field">
      <label className="tp-prompt" htmlFor={name}>
        <span className="tp-prompt-arrow">&gt;_</span> {label}
      </label>
      {textarea ? (
        <textarea id={name} name={name} value={value} onChange={onChange}
          placeholder={placeholder} rows={4} required className="tp-input" />
      ) : (
        <input id={name} name={name} type={type} value={value} onChange={onChange}
          placeholder={placeholder} required className="tp-input" />
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Main export
───────────────────────────────────────────────────────────────── */
export default function Contact() {
  const [ref, inView] = useInView({ threshold: 0.07, triggerOnce: true });
  const [form, setForm] = useState<FormState>({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');

  const update = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    const body = `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`;
    const mailto =
      `mailto:sairamvrm@gmail.com` +
      `?subject=${encodeURIComponent(form.subject || 'Portfolio Contact')}` +
      `&body=${encodeURIComponent(body)}`;
    setTimeout(() => {
      window.location.href = mailto;
      setStatus('sent');
      setForm({ name: '', email: '', subject: '', message: '' });
    }, 900);
  };

  return (
    <section id="contact" className="contact-section">
      <div className="grid-bg" />
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="section-label">06 / Contact</p>
          <h2 className="section-title">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="contact-subtitle">
            Have a project, research idea, or collaboration in mind? I'd love to hear from you.
          </p>
        </motion.div>

        <div className="contact-grid">
          <TerminalForm form={form} update={update} status={status} handleSubmit={handleSubmit} inView={inView} />
          <CommHub inView={inView} />
        </div>
      </div>
    </section>
  );
}
