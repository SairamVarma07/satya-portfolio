import './index.css';
import Navbar from './components/ui/Navbar';
import CustomCursor from './components/ui/CustomCursor';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Experience from './components/sections/Experience';
import Projects from './components/sections/Projects';
import Research from './components/sections/Research';
import Skills from './components/sections/Skills';
import Contact from './components/sections/Contact';

export default function App() {
  return (
    <>
      <CustomCursor />
      <Navbar />

      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Research />
        <Skills />
        <Contact />
      </main>

      <footer className="footer">
        <div className="footer-content">
          <p className="footer-name">SATYA SAIRAM VARMA</p>
          <div className="footer-links">
            <a href="mailto:sairamvrm@gmail.com">sairamvrm@gmail.com</a>
            <a href="https://linkedin.com/in/sairam-varma07" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a href="tel:+16787942399">(678) 794-2399</a>
            <a href="#hero">Back to Top ↑</a>
          </div>
          <p className="footer-copy">
            © 2026 Satya Sairam Varma Manthena · Built with React + Three.js
          </p>
        </div>
      </footer>
    </>
  );
}
