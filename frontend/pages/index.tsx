import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const COLLEGES = [
  { name: 'MIT', category: 'reach', sat: '1520-1560', gpa: '3.9-4.0' },
  { name: 'UC San Diego', category: 'target', sat: '1310-1510', gpa: '3.7-3.9' },
  { name: 'UChicago', category: 'reach', sat: '1510-1560', gpa: '3.9-4.0' },
  { name: 'Georgia Tech', category: 'target', sat: '1450-1570', gpa: '3.9-4.0' },
  { name: 'U of Michigan', category: 'likely', sat: '1370-1530', gpa: '3.8-3.9' },
  { name: 'ASU Barrett', category: 'likely', sat: '1330-1510', gpa: '3.8-3.9' },
];

const FRQS = [
  {
    subject: 'Physics 2',
    title: 'Charged Particle Motion',
    question: 'A charged particle with charge q = 1.6 × 10⁻¹⁹ C enters a magnetic field B = 0.5 T perpendicular to its velocity v = 2 × 10⁶ m/s. Calculate the radius of circular motion.',
    solution: 'Using the Lorentz force and circular motion equations:\nF = qvB = mv²/r\nr = mv/(qB)\nFor an electron (m = 9.1 × 10⁻³¹ kg):\nr = (9.1 × 10⁻³¹ × 2 × 10⁶)/(1.6 × 10⁻¹⁹ × 0.5)\nr ≈ 0.023 m or 2.3 cm',
  },
];

const FLASHCARDS = [
  {
    term: 'Photosynthesis',
    difficulty: 'Medium',
    color: 'from-green-500 to-emerald-500',
  },
  {
    term: 'Mitochondria',
    difficulty: 'Easy',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    term: 'Genetics',
    difficulty: 'Hard',
    color: 'from-purple-500 to-pink-500',
  },
];

interface ParallaxPosition {
  x: number;
  y: number;
}

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [parallaxPos, setParallaxPos] = useState<ParallaxPosition>({ x: 0, y: 0 });
  const [sliderValues, setSliderValues] = useState({
    velocity: 45,
    bField: 0.5,
    charge: 1.6,
  });
  const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>({});
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 40;
      const y = (clientY / window.innerHeight - 0.5) * 40;
      setParallaxPos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      containerRef.current.querySelectorAll('[data-observe]').forEach((el) => {
        observer.observe(el);
      });
    }

    return () => observer.disconnect();
  }, []);

  const handleSliderChange = (key: string, value: number) => {
    setSliderValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white" style={{ backgroundColor: '#030312' }}>
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-black/80 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
            Propel
          </h1>
          <div className="flex gap-4 items-center">
            <Link href="/login" className="px-4 py-2 text-slate-300 hover:text-white transition text-sm font-medium">
              Login
            </Link>
            <Link href="/signup" className="px-6 py-2 bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 rounded-full font-semibold transition text-sm shadow-lg">
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Animated Background Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute w-96 h-96 bg-gradient-to-b from-violet-600 via-purple-600 to-transparent rounded-full filter blur-3xl opacity-40"
          style={{
            top: '-10%',
            right: '-5%',
            transform: `translate(${parallaxPos.x * 0.3}px, ${parallaxPos.y * 0.3}px)`,
            transition: 'transform 0.1s ease-out',
          }}
        />
        <div
          className="absolute w-96 h-96 bg-gradient-to-t from-purple-600 via-violet-600 to-transparent rounded-full filter blur-3xl opacity-40"
          style={{
            bottom: '-10%',
            left: '-5%',
            transform: `translate(${parallaxPos.x * 0.2}px, ${parallaxPos.y * 0.2}px)`,
            transition: 'transform 0.1s ease-out',
          }}
        />
        <div
          className="absolute w-80 h-80 bg-gradient-to-l from-pink-600 via-purple-600 to-transparent rounded-full filter blur-3xl opacity-30"
          style={{
            top: '33%',
            right: '25%',
            transform: `translate(${parallaxPos.x * 0.15}px, ${parallaxPos.y * 0.15}px)`,
            transition: 'transform 0.1s ease-out',
          }}
        />
      </div>

      {/* Hero Section */}
      <motion.section
        className="min-h-screen flex items-center justify-center pt-32 pb-10 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-8"
          >
            <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-semibold text-slate-300 hover:bg-white/10 transition inline-block tracking-wide">
              Premium Student Platform
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-6xl md:text-7xl font-bold mb-8 leading-tight"
          >
            Master Your
            <br />
            <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Academic Goals
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed font-light"
          >
            Everything you need for AP exams, college admissions, physics mastery, and effective studying in one intelligent platform.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-20"
          >
            <Link
              href="/signup"
              className="px-8 py-3 bg-white text-black rounded-full font-semibold hover:bg-slate-100 transition shadow-xl hover:shadow-2xl inline-block"
            >
              Get Started Free
            </Link>
            <button className="px-8 py-3 border border-white/30 rounded-full font-semibold hover:bg-white/10 hover:border-white/50 transition text-white">
              Learn More
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="grid grid-cols-3 gap-6 md:gap-12 pt-10 border-t border-white/5"
          >
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-violet-400 to-violet-500 bg-clip-text text-transparent">
                50+
              </p>
              <p className="text-slate-400 text-sm mt-3 font-medium">Real AP FRQs</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-purple-500 bg-clip-text text-transparent">
                30+
              </p>
              <p className="text-slate-400 text-sm mt-3 font-medium">Real Colleges</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-400 to-pink-500 bg-clip-text text-transparent">
                250+
              </p>
              <p className="text-slate-400 text-sm mt-3 font-medium">Study Cards</p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        id="features"
        data-observe
        className="py-32 relative z-10"
        initial={{ opacity: 0 }}
        animate={visibleSections['features'] ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={visibleSections['features'] ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-bold text-center mb-24 leading-tight"
          >
            Powerful tools for <br />{' '}
            <span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
              student success
            </span>
          </motion.h3>

          {/* College Calculator Feature */}
          <motion.div
            id="college-feature"
            data-observe
            initial={{ opacity: 0, y: 20 }}
            animate={visibleSections['college-feature'] ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="mb-16 group cursor-pointer p-8 rounded-2xl border border-white/10 hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-300 backdrop-blur-sm overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none" />
            <div className="relative z-10">
              <div className="text-5xl mb-6">🎓</div>
              <h4 className="text-2xl font-bold mb-3">College Calculator</h4>
              <p className="text-slate-400 text-base leading-relaxed mb-6">
                Advanced admissions calculator with 30+ real colleges, acceptance rates, and AI-powered school matching
              </p>
              <div className="mt-8 bg-white/5 rounded-lg p-6 border border-white/10">
                <p className="text-xs text-slate-400 mb-4 font-mono">Reach / Target / Safety</p>
                <div className="grid grid-cols-3 gap-4">
                  {COLLEGES.map((college) => (
                    <div
                      key={college.name}
                      className={`p-3 rounded-lg border text-xs ${
                        college.category === 'reach'
                          ? 'border-red-500/30 bg-red-500/5'
                          : college.category === 'target'
                          ? 'border-yellow-500/30 bg-yellow-500/5'
                          : 'border-green-500/30 bg-green-500/5'
                      }`}
                    >
                      <p className="font-semibold">{college.name}</p>
                      <p className="text-slate-400 text-xs mt-1">{college.sat}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* AP Prep Feature */}
          <motion.div
            id="ap-feature"
            data-observe
            initial={{ opacity: 0, y: 20 }}
            animate={visibleSections['ap-feature'] ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="mb-16 group cursor-pointer p-8 rounded-2xl border border-white/10 hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-300 backdrop-blur-sm overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none" />
            <div className="relative z-10">
              <div className="text-5xl mb-6">📚</div>
              <h4 className="text-2xl font-bold mb-3">AP Exam Prep</h4>
              <p className="text-slate-400 text-base leading-relaxed mb-6">
                50+ real FRQs across 5 subjects with detailed solutions, hints, and practice tracking
              </p>
              <div className="mt-8 bg-white/5 rounded-lg p-6 border border-white/10 font-mono text-xs">
                <div className="text-slate-300 mb-3">
                  <p className="text-slate-400">Physics 2 • FRQ 3</p>
                  <p className="mt-2 text-slate-300">{FRQS[0].question}</p>
                </div>
                <div className="bg-black/50 p-4 rounded mt-4 border border-white/10">
                  <p className="text-green-400 whitespace-pre-wrap">{FRQS[0].solution}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Study Tool Feature */}
          <motion.div
            id="study-feature"
            data-observe
            initial={{ opacity: 0, y: 20 }}
            animate={visibleSections['study-feature'] ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="mb-16 group cursor-pointer p-8 rounded-2xl border border-white/10 hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-300 backdrop-blur-sm overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none" />
            <div className="relative z-10">
              <div className="text-5xl mb-6">✨</div>
              <h4 className="text-2xl font-bold mb-3">Study Tool</h4>
              <p className="text-slate-400 text-base leading-relaxed mb-6">
                Smart flashcard system with SM-2 spaced repetition and 250+ cards across subjects
              </p>
              <div className="mt-8 grid grid-cols-3 gap-4">
                {FLASHCARDS.map((card) => (
                  <div
                    key={card.term}
                    className={`p-6 rounded-lg border border-white/10 bg-gradient-to-br ${card.color} opacity-10 hover:opacity-20 transition cursor-pointer group`}
                  >
                    <p className="text-slate-300 font-semibold">{card.term}</p>
                    <p className="text-xs text-slate-400 mt-2">{card.difficulty}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Physics Simulator Feature */}
          <motion.div
            id="physics-feature"
            data-observe
            initial={{ opacity: 0, y: 20 }}
            animate={visibleSections['physics-feature'] ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="group cursor-pointer p-8 rounded-2xl border border-white/10 hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-300 backdrop-blur-sm overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none" />
            <div className="relative z-10">
              <div className="text-5xl mb-6">⚛️</div>
              <h4 className="text-2xl font-bold mb-3">Physics Simulator</h4>
              <p className="text-slate-400 text-base leading-relaxed mb-6">
                Interactive 3D physics simulations with real-time parameter controls and visualizations
              </p>
              <div className="mt-8 bg-white/5 rounded-lg p-6 border border-white/10 space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm text-slate-300">Velocity</label>
                    <span className="text-sm font-mono text-slate-300">{sliderValues.velocity.toFixed(1)} m/s</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={sliderValues.velocity}
                    onChange={(e) => handleSliderChange('velocity', parseFloat(e.target.value))}
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm text-slate-300">B Field</label>
                    <span className="text-sm font-mono text-slate-300">{sliderValues.bField.toFixed(2)} T</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="2"
                    step="0.1"
                    value={sliderValues.bField}
                    onChange={(e) => handleSliderChange('bField', parseFloat(e.target.value))}
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm text-slate-300">Charge</label>
                    <span className="text-sm font-mono text-slate-300">{sliderValues.charge.toFixed(2)} × 10⁻¹⁹ C</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="3"
                    step="0.1"
                    value={sliderValues.charge}
                    onChange={(e) => handleSliderChange('charge', parseFloat(e.target.value))}
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        id="cta"
        data-observe
        className="py-32 relative z-10"
        initial={{ opacity: 0 }}
        animate={visibleSections['cta'] ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={visibleSections['cta'] ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="p-16 rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl hover:bg-white/[0.05] transition-all duration-300"
          >
            <h3 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Ready to ace your exams <br /> and get into your dream school?
            </h3>
            <p className="text-slate-300 mb-10 text-lg leading-relaxed">
              Join thousands of students using Propel to master AP exams, plan college applications, and study smarter.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/signup"
                className="px-10 py-3 bg-white text-black rounded-full font-semibold hover:bg-slate-100 transition shadow-xl hover:shadow-2xl inline-block"
              >
                Start Free Today
              </Link>
              <Link
                href="/login"
                className="px-10 py-3 border border-white/30 rounded-full font-semibold hover:bg-white/10 hover:border-white/50 transition text-white"
              >
                Already have an account
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-16 mt-32 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center text-slate-500 text-sm">
            <p>&copy; 2025 Propel. All rights reserved.</p>
            <p className="mt-3 text-slate-600">Free tier • Premium starting at $7/month</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
