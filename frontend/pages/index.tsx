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
    <motion.div initial="initial" animate="animate" exit="exit" variants={pageVariants} className="min-h-screen bg-black overflow-hidden" style={{ backgroundColor: '#0a0a0a', color: '#ffffff' }}>
      {/* Premium Zeabur-style Gradient Background */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Top right glow - vibrant purple */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-b from-violet-600 via-purple-600 to-transparent rounded-full filter blur-3xl opacity-40 animate-float" />
        {/* Bottom left glow - electric blue/purple */}
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-t from-purple-600 via-violet-600 to-transparent rounded-full filter blur-3xl opacity-40 animate-float" style={{ animationDelay: '2s' }} />
        {/* Center/right glow - pink accent */}
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-gradient-to-l from-pink-600 via-purple-600 to-transparent rounded-full filter blur-3xl opacity-30 animate-glow" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-black/90" style={{ backgroundColor: 'rgba(10, 10, 10, 0.9)' }}>
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
            Propel
          </motion.h1>
          <div className="flex gap-4 items-center">
            <Link href="/login" className="px-4 py-2 text-slate-300 hover:text-white transition-colors text-sm font-medium">
              Login
            </Link>
            <Link href="/signup" className="px-6 py-2 bg-violet-600 hover:bg-violet-500 rounded-full font-semibold transition-all text-sm shadow-lg hover:shadow-violet-500/50">
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center pt-20 pb-10 relative z-10">
        {/* Background blur effect */}
        <div className="absolute inset-0 z-0 pointer-events-none" />

        {/* Content */}
        <motion.div variants={containerVariants} className="max-w-4xl mx-auto px-6 text-center relative z-10">
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-8 inline-block">
            <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-semibold text-slate-300 hover:bg-white/10 transition-colors cursor-pointer tracking-wide">
              NEW • Premium Student Platform
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.div variants={itemVariants}>
            <h2 className="text-6xl md:text-8xl font-bold mb-8 leading-tight text-white">
              Master Your<br />
              <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Academic Goals</span>
            </h2>
          </motion.div>

          {/* Subheading */}
          <motion.p variants={itemVariants} className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
            Everything you need for AP exams, college admissions, physics mastery, and effective studying in one intelligent platform.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
            <Link href="/signup" className="px-8 py-3 bg-white text-black rounded-full font-semibold hover:bg-slate-100 transition-all duration-300 shadow-xl hover:shadow-2xl">
              Get Started Free
            </Link>
            <button className="px-8 py-3 border border-white/30 rounded-full font-semibold hover:bg-white/10 hover:border-white/50 transition-all duration-300 text-white">
              Learn More
            </button>
          </motion.div>

          {/* Stats Grid */}
          <motion.div variants={itemVariants} className="grid grid-cols-3 gap-6 md:gap-12 pt-10 border-t border-white/5">
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-violet-400 to-violet-500 bg-clip-text text-transparent">50+</p>
              <p className="text-slate-400 text-sm mt-3 font-medium">Real AP FRQs</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-purple-500 bg-clip-text text-transparent">30+</p>
              <p className="text-slate-400 text-sm mt-3 font-medium">Real Colleges</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-400 to-pink-500 bg-clip-text text-transparent">250+</p>
              <p className="text-slate-400 text-sm mt-3 font-medium">Study Cards</p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-32 relative z-10">
        <motion.div variants={containerVariants} className="max-w-7xl mx-auto px-6">
          <motion.h3 variants={itemVariants} className="text-5xl md:text-6xl font-bold text-center mb-24 leading-tight">
            Powerful tools for <br /> <span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">student success</span>
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {tools.map((tool, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -6 }}
                className="group cursor-pointer p-8 rounded-2xl border border-white/10 hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-300 backdrop-blur-sm overflow-hidden relative"
              >
                {/* Hover gradient effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${tool.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none`} />

                {/* Content */}
                <div className="relative z-10">
                  <div className="text-5xl mb-6">{tool.icon}</div>
                  <h4 className="text-2xl font-bold mb-3">{tool.title}</h4>
                  <p className="text-slate-400 text-base leading-relaxed mb-6">{tool.desc}</p>

                  {/* Arrow */}
                  <motion.div
                    animate={{ x: 0 }}
                    whileHover={{ x: 4 }}
                    className="text-slate-300 text-sm font-semibold flex items-center gap-1 group-hover:text-white transition-colors"
                  >
                    Learn more <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative z-10">
        <motion.div variants={containerVariants} className="max-w-3xl mx-auto px-6 text-center">
          <motion.div variants={itemVariants} className="p-16 rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl hover:bg-white/[0.05] transition-all duration-300">
            <h3 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Ready to ace your exams <br /> and get into your dream school?
            </h3>
            <p className="text-slate-300 mb-10 text-lg leading-relaxed">
              Join thousands of students using Propel to master AP exams, plan college applications, and study smarter.
            </p>
            <Link href="/signup" className="px-10 py-3 bg-white text-black rounded-full font-semibold hover:bg-slate-100 transition-all duration-300 inline-block shadow-xl hover:shadow-2xl">
              Start Free Today
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-16 mt-32 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center text-slate-500 text-sm">
            <p>&copy; 2025 Propel. All rights reserved.</p>
            <p className="mt-3 text-slate-600">Free tier • Premium starting at $7/month</p>
          </div>
        </div>
      </footer>
    </motion.div>
  );
}
