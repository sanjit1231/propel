'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'

export default function Home() {
  const orb1Ref = useRef(null)
  const orb2Ref = useRef(null)

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20
      const y = (e.clientY / window.innerHeight - 0.5) * 10
      if (orb1Ref.current) {
        orb1Ref.current.style.transform = `translateX(calc(-50% + ${x}px)) translateY(${y}px)`
      }
      if (orb2Ref.current) {
        orb2Ref.current.style.transform = `translate(${-x * 0.5}px, ${-y * 0.5}px)`
      }
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1 }
    )
    document.querySelectorAll('.fade-in-section').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      {/* Background layer */}
      <div className="bg-layer">
        <div className="orb-1" ref={orb1Ref}></div>
        <div className="orb-2" ref={orb2Ref}></div>
        <div className="orb-3"></div>
        <div className="grid-overlay"></div>
      </div>

      {/* NAV */}
      <nav>
        <Link href="/" className="nav-logo">
          <div className="logo-icon">P</div>
          Propel
        </Link>
        <ul className="nav-links">
          <li><a href="#features">Features</a></li>
          <li><a href="#tools">Tools</a></li>
          <li><a href="#pricing">Pricing</a></li>
        </ul>
        <div className="nav-actions">
          <Link href="/login" className="btn-ghost">Login</Link>
          <Link href="/signup" className="btn-primary">Sign Up</Link>
        </div>
      </nav>

      {/* MAIN */}
      <main>

        {/* HERO */}
        <section className="hero">
          <div className="badge">
            <span className="badge-new">NEW</span>
            <span className="badge-text">Premium Student Platform</span>
            <span className="badge-arrow">→</span>
          </div>

          <h1>
            Master Your<br />
            <span className="grad">Academic Goals</span>
          </h1>

          <p className="hero-sub">
            Everything you need for AP exams, college admissions,
            physics mastery, and smarter studying — in one intelligent platform.
          </p>

          <div className="hero-ctas">
            <Link href="/signup" className="btn-cta-primary">Get Started Free</Link>
            <a href="#features" className="btn-cta-secondary">See what&apos;s inside →</a>
          </div>

          <div className="stats">
            <div className="stat">
              <div className="stat-num">50+</div>
              <div className="stat-label">Real AP FRQs</div>
            </div>
            <div className="stat">
              <div className="stat-num">30+</div>
              <div className="stat-label">Real Colleges</div>
            </div>
            <div className="stat">
              <div className="stat-num">250+</div>
              <div className="stat-label">Study Cards</div>
            </div>
            <div className="stat">
              <div className="stat-num">5</div>
              <div className="stat-label">AP Subjects</div>
            </div>
          </div>
        </section>

        {/* SUBJECT ROW */}
        <div className="logo-row">
          <p className="logo-row-label">Covering all major AP subjects</p>
          <div className="logos">
            {['AP Physics', 'AP Calculus', 'AP Chemistry', 'AP Biology', 'AP CS Principles', 'AP Literature'].map((s) => (
              <span key={s} className="logo-item">
                <span className="logo-dot"></span>{s}
              </span>
            ))}
          </div>
        </div>

        <hr className="section-divider" />

        {/* FEATURE 1: College Calculator */}
        <section className="feature-section fade-in-section" id="features">
          <div className="feature-text">
            <p className="feature-label">College Admissions</p>
            <h2 className="feature-title">
              Know your odds at <span style={{ color: 'var(--accent)' }}>every school</span>
            </h2>
            <p className="feature-desc">
              Our AI-powered admissions calculator uses real acceptance rates across
              30+ universities to give you an honest, data-driven match score — reach,
              target, and safety.
            </p>
            <ul className="feature-list">
              <li>Real acceptance rate data for 30+ top universities</li>
              <li>AI-powered school matching and recommendations</li>
              <li>Track reach, target, and safety schools in one view</li>
              <li>Updated annually with the latest admissions data</li>
            </ul>
            <Link href="/signup" className="feature-link">Try the calculator →</Link>
          </div>

          <div className="feature-visual">
            <div className="card-dark">
              <div className="card-glow"></div>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 16 }}>
                Your School List
              </div>
              <div className="college-grid">
                {[
                  { name: 'MIT', rate: '3.9% admit', tier: 'Reach', cls: 'rate-reach' },
                  { name: 'UC San Diego', rate: '24% admit', tier: 'Target', cls: 'rate-target' },
                  { name: 'UChicago', rate: '5.4% admit', tier: 'Reach', cls: 'rate-reach' },
                  { name: 'Georgia Tech', rate: '17% admit', tier: 'Target', cls: 'rate-target' },
                  { name: 'U of Michigan', rate: '18% admit', tier: 'Target', cls: 'rate-target' },
                  { name: 'ASU Barrett', rate: '88% admit', tier: 'Safety', cls: 'rate-safety' },
                ].map((col) => (
                  <div key={col.name} className="college-card">
                    <div className="college-name">{col.name}</div>
                    <div className="college-rate">
                      <span>{col.rate}</span>
                      <span className={`rate-badge ${col.cls}`}>{col.tier}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FEATURE 2: AP Exam Prep */}
        <section className="feature-section reverse fade-in-section" id="tools">
          <div className="feature-text">
            <p className="feature-label">AP Exam Prep</p>
            <h2 className="feature-title">
              Real FRQs with <span style={{ color: 'var(--accent)' }}>real solutions</span>
            </h2>
            <p className="feature-desc">
              50+ authentic AP free-response questions across 5 subjects, each with
              step-by-step solutions, hints, and instant feedback. Practice exactly what
              shows up on test day.
            </p>
            <ul className="feature-list">
              <li>Full solutions with detailed worked examples</li>
              <li>Hints system — get unstuck without giving it away</li>
              <li>Track which topics need the most work</li>
              <li>Physics, Calc, Chem, Bio, and CSP covered</li>
            </ul>
            <Link href="/signup" className="feature-link">Start practicing →</Link>
          </div>

          <div className="feature-visual">
            <div className="card-dark">
              <div className="card-glow"></div>
              <div className="terminal">
                <div className="terminal-bar">
                  <div className="dot dot-red"></div>
                  <div className="dot dot-yellow"></div>
                  <div className="dot dot-green"></div>
                  <span className="terminal-label">AP Physics 2 · FRQ #14</span>
                </div>
                <div className="terminal-body">
                  <div><span className="t-dim">Q</span> <span className="t-white">A proton moves through a uniform</span></div>
                  <div><span className="t-dim">&nbsp;</span> <span className="t-white">magnetic field B = 0.40 T into</span></div>
                  <div><span className="t-dim">&nbsp;</span> <span className="t-white">the page. v = 3×10⁶ m/s, west.</span></div>
                  <div><span className="t-dim">&nbsp;</span></div>
                  <div><span className="t-dim">→</span> <span className="t-violet">Find the magnitude of F</span></div>
                  <div><span className="t-dim">&nbsp;</span></div>
                  <div><span className="t-dim">#</span> <span className="t-muted">F = qvB sin(θ)</span></div>
                  <div><span className="t-dim">#</span> <span className="t-muted">F = (1.6×10⁻¹⁹)(3×10⁶)(0.40)(1)</span></div>
                  <div><span className="t-dim">#</span> <span className="t-green">F = 1.92 × 10⁻¹³ N ✓</span></div>
                  <div><span className="t-dim">&nbsp;</span></div>
                  <div><span className="t-dim">→</span> <span className="t-violet">Direction of force?</span></div>
                  <div><span className="t-dim">#</span> <span className="t-amber">Right-hand rule: v west × B into page</span></div>
                  <div><span className="t-dim">#</span> <span className="t-green">→ Force directed SOUTH ✓</span></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURE 3: Study Tool */}
        <section className="feature-section fade-in-section">
          <div className="feature-text">
            <p className="feature-label">Smart Studying</p>
            <h2 className="feature-title">
              Spaced repetition <span style={{ color: 'var(--accent)' }}>that actually works</span>
            </h2>
            <p className="feature-desc">
              250+ pre-built study cards with SM-2 spaced repetition. The algorithm
              schedules reviews right before you&apos;d forget — so you retain more with
              less time spent.
            </p>
            <ul className="feature-list">
              <li>SM-2 algorithm — proven memory science</li>
              <li>250+ cards across AP subjects and college prep</li>
              <li>Tracks your confidence per card, per topic</li>
              <li>Add your own cards to any deck</li>
            </ul>
            <Link href="/signup" className="feature-link">Try the study tool →</Link>
          </div>

          <div className="feature-visual">
            <div className="card-dark">
              <div className="card-glow"></div>
              <div className="flashcard">
                <div className="flashcard-q">AP Physics 2 · Electromagnetism</div>
                <div className="flashcard-text">
                  What is the relationship between electric field strength and the distance from a point charge?
                </div>
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-subtle)', marginBottom: 12, textAlign: 'center' }}>
                How well did you know this?
              </div>
              <div className="flashcard-buttons">
                <button className="flashcard-btn btn-forgot">Forgot</button>
                <button className="flashcard-btn btn-hard">Hard</button>
                <button className="flashcard-btn btn-got">Got it</button>
                <button className="flashcard-btn btn-easy">Easy</button>
              </div>
              <div className="subject-tags">
                <span className="tag tag-active">Physics 2</span>
                <span className="tag">Calculus AB</span>
                <span className="tag">Chemistry</span>
                <span className="tag">CSP</span>
                <span className="tag">+ 1 more</span>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURE 4: Physics Simulator */}
        <section className="feature-section reverse fade-in-section">
          <div className="feature-text">
            <p className="feature-label">Physics Simulator</p>
            <h2 className="feature-title">
              See the physics <span style={{ color: 'var(--accent)' }}>come alive</span>
            </h2>
            <p className="feature-desc">
              Interactive 3D physics simulations with real-time parameter controls.
              Adjust variables and watch how the system responds — perfect for building
              intuition before the exam.
            </p>
            <ul className="feature-list">
              <li>Real-time 3D visualizations with adjustable parameters</li>
              <li>Covers E&M, optics, waves, quantum, and mechanics</li>
              <li>Linked to specific AP Physics 2 learning objectives</li>
              <li>No download needed — runs in your browser</li>
            </ul>
            <Link href="/signup" className="feature-link">Open the simulator →</Link>
          </div>

          <div className="feature-visual">
            <div className="card-dark">
              <div className="card-glow"></div>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 14 }}>
                Magnetic Force on Moving Charge
              </div>
              <div className="sim-canvas">
                <div className="sim-grid"></div>
                <div className="sim-trail"></div>
                <div className="sim-orb"></div>
              </div>
              <div>
                {[
                  { label: 'Velocity', val: '3.0×10⁶ m/s', def: 60 },
                  { label: 'B Field', val: '0.40 T', def: 40 },
                  { label: 'Charge', val: '+1e', def: 100 },
                ].map((c) => (
                  <div key={c.label} className="sim-controls">
                    <span className="sim-control-label">{c.label}</span>
                    <input type="range" className="dark-range" defaultValue={c.def} />
                    <span className="sim-control-val">{c.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES ICON GRID */}
        <div className="features-grid-section fade-in-section">
          <div className="features-grid">
            {[
              { icon: '🎓', title: 'College Calculator', desc: 'Real acceptance rates and AI school matching for 30+ universities.' },
              { icon: '📚', title: 'AP Exam Prep', desc: '50+ real FRQs with full solutions, hints, and progress tracking.' },
              { icon: '🔬', title: 'Physics Simulator', desc: 'Interactive 3D physics simulations with real-time parameter control.' },
              { icon: '✨', title: 'Study Tool', desc: 'SM-2 spaced repetition with 250+ cards to maximize retention.' },
            ].map((f) => (
              <div key={f.title} className="feat-card">
                <div className="feat-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA SECTION */}
        <section className="cta-section" id="pricing">
          <div className="cta-inner">
            <p className="cta-label">Get started today</p>
            <h2>Ready to ace your exams<br />and get into your dream school?</h2>
            <p>
              Join thousands of students using Propel to master AP exams, plan college
              applications, and study smarter — starting completely free.
            </p>
            <div className="cta-buttons">
              <Link href="/signup" className="btn-cta-primary">Start Free Today</Link>
              <Link href="/login" className="btn-cta-secondary">Already have an account</Link>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer>
          <div className="footer-left">
            <Link href="/" className="nav-logo" style={{ fontSize: 15 }}>
              <div className="footer-logo-icon">P</div>
              Propel
            </Link>
            <span className="footer-text">© 2025 Propel. All rights reserved.</span>
          </div>
          <div className="footer-links">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Contact</a>
          </div>
          <span className="footer-pricing">Free tier • Premium from $7/mo</span>
        </footer>

      </main>
    </>
  )
}
