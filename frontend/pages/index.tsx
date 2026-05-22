import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { pageVariants, containerVariants, itemVariants, slideInRightVariants } from '@/animations/transitions';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const tools = [
    {
      title: 'College Calculator',
      desc: 'Advanced admissions calculator with 30+ real colleges, acceptance rates, and AI-powered school matching',
      icon: '🎓',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'AP Exam Prep',
      desc: '50+ real FRQs across 5 subjects with detailed solutions, hints, and practice tracking',
      icon: '📚',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Physics Simulator',
      desc: 'Interactive 3D physics simulations with real-time parameter controls and visualizations',
      icon: '🔬',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      title: 'Study Tool',
      desc: 'Smart flashcard system with SM-2 spaced repetition and 250+ cards across subjects',
      icon: '✨',
      gradient: 'from-orange-500 to-red-500',
    },
  ];

  return (
    <motion.div initial="initial" animate="animate" exit="exit" variants={pageVariants} className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-card m-4 rounded-xl" style={{ width: 'calc(100% - 2rem)', background: 'rgba(15, 23, 42, 0.7)' }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-3xl font-bold gradient-text">
            Propel
          </motion.h1>
          <div className="flex gap-4">
            <Link href="/login" className="px-4 py-2 text-slate-300 hover:text-white transition-colors">
              Login
            </Link>
            <Link href="/signup" className="glass-btn px-6 py-2 text-sm">
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center pt-20 pb-10 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute top-10 right-10 w-96 h-96 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full filter blur-3xl opacity-20"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            className="absolute bottom-10 left-10 w-96 h-96 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full filter blur-3xl opacity-20"
          />
        </div>

        {/* Content */}
        <motion.div variants={containerVariants} className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <motion.div variants={itemVariants}>
            <h2 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="gradient-text-blue">Your Path to</span>
              <br />
              <span className="gradient-text-purple">Academic Excellence</span>
            </h2>
          </motion.div>

          <motion.p variants={itemVariants} className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Master AP exams, explore physics through interactive simulations, calculate college admissions odds, and revolutionize your study habits—all in one premium platform.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup" className="glass-btn px-8 py-4 text-lg font-semibold">
              Get Started Free
            </Link>
            <button className="px-8 py-4 rounded-lg border border-white/30 font-semibold hover:bg-white/5 transition-all duration-300">
              Watch Demo
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div variants={itemVariants} className="grid grid-cols-3 gap-8 mt-16 text-center">
            <div>
              <p className="text-3xl font-bold gradient-text-blue">50+</p>
              <p className="text-slate-400 text-sm">AP FRQs</p>
            </div>
            <div>
              <p className="text-3xl font-bold gradient-text-purple">30+</p>
              <p className="text-slate-400 text-sm">Colleges</p>
            </div>
            <div>
              <p className="text-3xl font-bold gradient-text-pink">250+</p>
              <p className="text-slate-400 text-sm">Flashcards</p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <motion.div variants={containerVariants} className="max-w-7xl mx-auto px-6">
          <motion.h3 variants={itemVariants} className="text-4xl font-bold text-center mb-16">
            <span className="gradient-text-blue">Powerful Tools</span> for Student Success
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {tools.map((tool, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="glass-card group cursor-pointer overflow-hidden"
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-r ${tool.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

                {/* Content */}
                <div className="relative z-10">
                  <div className="text-5xl mb-4">{tool.icon}</div>
                  <h4 className="text-2xl font-bold mb-3">{tool.title}</h4>
                  <p className="text-slate-300 leading-relaxed">{tool.desc}</p>

                  {/* Arrow */}
                  <motion.div
                    animate={{ x: 0 }}
                    whileHover={{ x: 8 }}
                    className="mt-4 text-blue-400 font-semibold flex items-center gap-2"
                  >
                    Learn More <span>→</span>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <motion.div variants={containerVariants} className="max-w-4xl mx-auto px-6 text-center">
          <motion.div variants={itemVariants} className="glass-card">
            <h3 className="text-4xl font-bold mb-4 gradient-text-purple">Ready to Propel Your Success?</h3>
            <p className="text-xl text-slate-300 mb-8">
              Join thousands of students preparing for college and acing their exams with Propel's advanced learning tools.
            </p>
            <Link href="/signup" className="glass-btn px-8 py-4 text-lg font-semibold inline-block">
              Start Free Trial
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 mt-20">
        <div className="max-w-7xl mx-auto px-6 text-center text-slate-400">
          <p>&copy; 2024 Propel. All rights reserved. | Free tier with ads | Premium $7/month</p>
        </div>
      </footer>
    </motion.div>
  );
}
