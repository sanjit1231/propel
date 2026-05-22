import { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import '@/styles/landing.css';

export default function Home() {
  useEffect(() => {
    // Parallax orbs on mousemove
    const orb1 = document.querySelector('.orb-1') as HTMLElement;
    const orb2 = document.querySelector('.orb-2') as HTMLElement;
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 10;
      if (orb1) orb1.style.transform = `translateX(calc(-50% + ${x}px)) translateY(${y}px)`;
      if (orb2) orb2.style.transform = `translate(${-x * 0.5}px, ${-y * 0.5}px)`;
    };
    document.addEventListener('mousemove', handleMouseMove);

    // Range slider live update
    const sliders = document.querySelectorAll('.dark-range') as NodeListOf<HTMLInputElement>;
    sliders.forEach(range => {
      range.addEventListener('input', e => {
        const target = e.target as HTMLInputElement;
        const val = parseInt(target.value);
        const valEl = target.closest('.sim-controls')?.querySelector('.sim-control-val') as HTMLElement;
        if (valEl) {
          if (valEl.textContent?.includes('m/s')) valEl.textContent = (val * 0.05).toFixed(1) + '×10⁶ m/s';
          else if (valEl.textContent?.includes('T')) valEl.textContent = (val * 0.01).toFixed(2) + ' T';
        }
      });
    });

    // Intersection observer for fade-in on scroll
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).style.opacity = '1';
          (entry.target as HTMLElement).style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });

    const observeElements = document.querySelectorAll('.feature-section, .features-grid-section');
    observeElements.forEach(el => {
      (el as HTMLElement).style.opacity = '0';
      (el as HTMLElement).style.transform = 'translateY(30px)';
      (el as HTMLElement).style.transition = 'opacity 0.7s ease, transform 0.7s ease';
      observer.observe(el);
    });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <Head>
        <title>Propel — Master Your Academic Goals</title>
        <meta name="description" content="Premium student platform for AP exams, college admissions, and smarter studying" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
      </Head>

      {/* Background layer */}
      <div className="bg-layer">
        <div className="orb-1"></div>
        <div className="orb-2"></div>
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

      {/* HERO */}
      <main>
        <section className="hero">
          <div className="badge">
            <span className="badge-new">NEW</span>
            <span className="badge-text">Premium Student Platform</span>
            <span className="badge-arrow">→</span>
          </div>

          <h1>Master Your<br /><span className="grad">Academic Goals</span></h1>

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

        {/* LOGO ROW */}
        <div className="logo-row">
          <p className="logo-row-label">Covering all major AP subjects</p>
          <div className="logos">
            <span className="logo-item"><span className="logo-dot"></span>AP Physics</span>
            <span className="logo-item"><span className="logo-dot"></span>AP Calculus</span>
            <span className="logo-item"><span className="logo-dot"></span>AP Chemistry</span>
            <span className="logo-item"><span className="logo-dot"></span>AP Biology</span>
            <span className="logo-item"><span className="logo-dot"></span>AP CS Principles</span>
            <span className="logo-item"><span className="logo-dot"></span>AP Literature</span>
          </div>
        </div>

        <hr className="section-divider" />

        {/* FEATURE 1: College Calculator */}
        <section className="feature-section" id="features">
          <div className="feature-text">
            <p className="feature-label">College Admissions</p>
            <h2 className="feature-title">Know your odds at <span style={{color: 'var(--accent)'}}>every school</span></h2>
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
            <br/>
            <Link href="/signup" className="feature-link">Try the calculator →</Link>
          </div>

          <div className="feature-visual">
            <div className="card-dark">
              <div className="card-glow"></div>
              <div style={{fontSize:'12px', fontWeight:'600', color:'var(--text-subtle)', textTransform:'uppercase', letterSpacing:'0.8px', marginBottom:'16px'}}>Your School List</div>
              <div className="college-grid">
                <div className="college-card">
                  <div className="college-name">MIT</div>
                  <div className="college-rate">
                    <span>3.9% admit</span>
                    <span className="rate-badge rate-reach">Reach</span>
                  </div>
                </div>
                <div className="college-card">
                  <div className="college-name">UC San Diego</div>
                  <div className="college-rate">
                    <span>24% admit</span>
                    <span className="rate-badge rate-target">Target</span>
                  </div>
                </div>
                <div className="college-card">
                  <div className="college-name">UChicago</div>
                  <div className="college-rate">
                    <span>5.4% admit</span>
                    <span className="rate-badge rate-reach">Reach</span>
                  </div>
                </div>
                <div className="college-card">
                  <div className="college-name">Georgia Tech</div>
                  <div className="college-rate">
                    <span>17% admit</span>
                    <span className="rate-badge rate-target">Target</span>
                  </div>
                </div>
                <div className="college-card">
                  <div className="college-name">U of Michigan</div>
                  <div className="college-rate">
                    <span>18% admit</span>
                    <span className="rate-badge rate-target">Target</span>
                  </div>
                </div>
                <div className="college-card">
                  <div className="college-name">ASU Barrett</div>
                  <div className="college-rate">
                    <span>88% admit</span>
                    <span className="rate-badge rate-safety">Safety</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURE 2: AP Exam Prep */}
        <section className="feature-section reverse" id="tools">
          <div className="feature-text">
            <p className="feature-label">AP Exam Prep</p>
            <h2 className="feature-title">Real FRQs with <span style={{color: 'var(--accent)'}}>real solutions</span></h2>
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
            <br/>
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
                  <span style={{fontSize:'11px', color:'var(--text-subtle)', marginLeft:'8px', fontFamily:"'JetBrains Mono',monospace"}}>AP Physics 2 · FRQ #14</span>
                </div>
                <div className="terminal-body">
                  <div><span className="t-dim">Q</span> <span className="t-white">A proton moves through a uniform</span></div>
                  <div><span className="t-dim"> </span> <span className="t-white">magnetic field B = 0.40 T into</span></div>
                  <div><span className="t-dim"> </span> <span className="t-white">the page. v = 3×10⁶ m/s, west.</span></div>
                  <div><span className="t-dim"> </span></div>
                  <div><span className="t-dim">→</span> <span className="t-violet">Find the magnitude of F</span></div>
                  <div><span className="t-dim"> </span></div>
                  <div><span className="t-dim">#</span> <span className="t-muted">F = qvB sin(θ)</span></div>
                  <div><span className="t-dim">#</span> <span className="t-muted">F = (1.6×10⁻¹⁹)(3×10⁶)(0.40)(1)</span></div>
                  <div><span className="t-dim">#</span> <span className="t-green">F = 1.92 × 10⁻¹³ N ✓</span></div>
                  <div><span className="t-dim"> </span></div>
                  <div><span className="t-dim">→</span> <span className="t-violet">Direction of force?</span></div>
                  <div><span className="t-dim">#</span> <span className="t-amber">Right-hand rule: v west × B into page</span></div>
                  <div><span className="t-dim">#</span> <span className="t-green">→ Force directed SOUTH ✓</span></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURE 3: Study Tool */}
        <section className="feature-section">
          <div className="feature-text">
            <p className="feature-label">Smart Studying</p>
            <h2 className="feature-title">Spaced repetition <span style={{color: 'var(--accent)'}}>that actually works</span></h2>
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
            <br/>
            <Link href="/signup" className="feature-link">Try the study tool →</Link>
          </div>

          <div className="feature-visual">
            <div className="card-dark">
              <div className="card-glow"></div>
              <div className="flashcard-wrap">
                <div className="flashcard">
                  <div className="flashcard-q">AP Physics 2 · Electromagnetism</div>
                  <div className="flashcard-text">What is the relationship between electric field strength and the distance from a point charge?</div>
                </div>
              </div>
              <div style={{fontSize:'12px', color:'var(--text-subtle)', marginBottom:'12px', textAlign:'center'}}>How well did you know this?</div>
              <div style={{display:'flex', gap:'8px', marginBottom:'20px'}}>
                <button style={{flex:1, background:'rgba(239,68,68,0.1)', border:'1px solid rgba(239,68,68,0.25)', color:'#f87171', borderRadius:'8px', padding:'8px', fontFamily:"'Outfit',sans-serif", fontSize:'13px', cursor:'pointer'}}>Forgot</button>
                <button style={{flex:1, background:'rgba(251,191,36,0.1)', border:'1px solid rgba(251,191,36,0.2)', color:'#fbbf24', borderRadius:'8px', padding:'8px', fontFamily:"'Outfit',sans-serif", fontSize:'13px', cursor:'pointer'}}>Hard</button>
                <button style={{flex:1, background:'rgba(52,211,153,0.1)', border:'1px solid rgba(52,211,153,0.2)', color:'#34d399', borderRadius:'8px', padding:'8px', fontFamily:"'Outfit',sans-serif", fontSize:'13px', cursor:'pointer'}}>Got it</button>
                <button style={{flex:1, background:'rgba(124,58,237,0.15)', border:'1px solid rgba(124,58,237,0.3)', color:'#a78bfa', borderRadius:'8px', padding:'8px', fontFamily:"'Outfit',sans-serif", fontSize:'13px', cursor:'pointer'}}>Easy</button>
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
        <section className="feature-section reverse">
          <div className="feature-text">
            <p className="feature-label">Physics Simulator</p>
            <h2 className="feature-title">See the physics <span style={{color: 'var(--accent)'}}>come alive</span></h2>
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
            <br/>
            <Link href="/signup" className="feature-link">Open the simulator →</Link>
          </div>

          <div className="feature-visual">
            <div className="card-dark">
              <div className="card-glow"></div>
              <div style={{fontSize:'12px', fontWeight:'600', color:'var(--text-subtle)', textTransform:'uppercase', letterSpacing:'0.8px', marginBottom:'14px'}}>Magnetic Force on Moving Charge</div>
              <div className="sim-canvas">
                <div className="sim-grid"></div>
                <div className="sim-trail"></div>
                <div className="sim-orb"></div>
              </div>
              <div style={{display:'flex', flexDirection:'column', gap:'12px'}}>
                <div className="sim-controls">
                  <span className="sim-control-label">Velocity</span>
                  <input type="range" className="dark-range" defaultValue="60" style={{flex:1, margin:'0 12px'}} />
                  <span className="sim-control-val">3.0×10⁶ m/s</span>
                </div>
                <div className="sim-controls">
                  <span className="sim-control-label">B Field</span>
                  <input type="range" className="dark-range" defaultValue="40" style={{flex:1, margin:'0 12px'}} />
                  <span className="sim-control-val">0.40 T</span>
                </div>
                <div className="sim-controls">
                  <span className="sim-control-label">Charge</span>
                  <input type="range" className="dark-range" defaultValue="100" style={{flex:1, margin:'0 12px'}} />
                  <span className="sim-control-val">+1e</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES ICON GRID */}
        <div className="features-grid-section">
          <div className="features-grid">
            <div className="feat-card">
              <div className="feat-icon">🎓</div>
              <h3>College Calculator</h3>
              <p>Real acceptance rates and AI school matching for 30+ universities.</p>
            </div>
            <div className="feat-card">
              <div className="feat-icon">📚</div>
              <h3>AP Exam Prep</h3>
              <p>50+ real FRQs with full solutions, hints, and progress tracking.</p>
            </div>
            <div className="feat-card">
              <div className="feat-icon">🔬</div>
              <h3>Physics Simulator</h3>
              <p>Interactive 3D physics simulations with real-time parameter control.</p>
            </div>
            <div className="feat-card">
              <div className="feat-icon">✨</div>
              <h3>Study Tool</h3>
              <p>SM-2 spaced repetition with 250+ cards to maximize retention.</p>
            </div>
          </div>
        </div>

        {/* CTA SECTION */}
        <section className="cta-section" id="pricing">
          <div className="cta-inner">
            <p className="cta-label">Get started today</p>
            <h2>Ready to ace your exams<br />and get into your dream school?</h2>
            <p>Join thousands of students using Propel to master AP exams, plan college applications, and study smarter — starting completely free.</p>
            <div className="cta-buttons">
              <Link href="/signup" className="btn-cta-primary">Start Free Today</Link>
              <Link href="/login" className="btn-cta-secondary">Already have an account</Link>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer>
          <div className="footer-left">
            <Link href="/" className="nav-logo" style={{fontSize:'15px'}}>
              <div className="logo-icon" style={{width:'22px', height:'22px', fontSize:'10px'}}>P</div>
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
  );
}
