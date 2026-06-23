import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const CONTACT_EMAIL = 'sairamvrm@gmail.com';

type Status = 'idle' | 'sending' | 'sent' | 'error';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const CONTACT_LINKS = [
  {
    label: 'Email',
    value: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`,
    description: 'Best for job opportunities & quick questions',
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/sairam-varma07',
    href: 'https://linkedin.com/in/sairam-varma07',
    description: 'Connect professionally',
  },
  {
    label: 'Location',
    value: 'Atlanta, GA · Open to Remote',
    href: null,
    description: 'Available for relocation',
  },
];

export default function Contact() {
  const [ref, inView] = useInView({ threshold: 0.07, triggerOnce: true });
  const [form, setForm] = useState<FormState>({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');

  const update = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
          _replyto: form.email,
          _subject: form.subject
            ? `[Portfolio] ${form.subject}`
            : `[Portfolio] Message from ${form.name}`,
          _template: 'table',
        }),
      });

      if (response.ok) {
        setStatus('sent');
        setForm({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
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
            Open to full-time roles, internships, and research collaborations. Send a message below
            or email me directly — I typically reply within 24 hours.
          </p>
        </motion.div>

        <div className="contact-layout">
          <motion.aside
            className="contact-info-panel"
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.7 }}
          >
            <div className="contact-availability">
              <span className="contact-availability-dot" />
              Available for opportunities
            </div>

            <ul className="contact-links">
              {CONTACT_LINKS.map((item, i) => (
                <motion.li
                  key={item.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.25 + i * 0.08, duration: 0.5 }}
                >
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel="noreferrer"
                      className="contact-link-card"
                    >
                      <span className="contact-link-label">{item.label}</span>
                      <span className="contact-link-value">{item.value}</span>
                      <span className="contact-link-desc">{item.description}</span>
                    </a>
                  ) : (
                    <div className="contact-link-card">
                      <span className="contact-link-label">{item.label}</span>
                      <span className="contact-link-value">{item.value}</span>
                      <span className="contact-link-desc">{item.description}</span>
                    </div>
                  )}
                </motion.li>
              ))}
            </ul>

            <p className="contact-note">
              Prefer email? Click the address above or write to{' '}
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
            </p>
          </motion.aside>

          <motion.div
            className="contact-form-panel"
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="contact-form-row">
                <div className="contact-field">
                  <label htmlFor="name">Your Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={update}
                    placeholder="Jane Recruiter"
                    required
                  />
                </div>
                <div className="contact-field">
                  <label htmlFor="email">Your Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={update}
                    placeholder="you@company.com"
                    required
                  />
                </div>
              </div>

              <div className="contact-field">
                <label htmlFor="subject">Subject</label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  value={form.subject}
                  onChange={update}
                  placeholder="Software Engineer role at ..."
                  required
                />
              </div>

              <div className="contact-field">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={update}
                  placeholder="Tell me about the role, team, or project..."
                  rows={5}
                  required
                />
              </div>

              <button
                type="submit"
                className="contact-submit"
                disabled={status === 'sending'}
              >
                {status === 'sending' && <span className="contact-spinner" />}
                {status === 'sending' ? 'Sending...' : 'Send Message'}
              </button>

              <AnimatePresence>
                {status === 'sent' && (
                  <motion.p
                    className="contact-feedback contact-feedback--success"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    Message sent! I&apos;ll get back to you at your email soon.
                  </motion.p>
                )}
                {status === 'error' && (
                  <motion.p
                    className="contact-feedback contact-feedback--error"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    Something went wrong. Please email me directly at{' '}
                    <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
