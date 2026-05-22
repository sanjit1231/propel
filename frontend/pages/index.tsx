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
    <motion.div initial="initial" animate="animate" exit="exit" variants={pageVariants} className="min-h-screen bg-[#0a0e27] text-white overflow-hidden">
      {/* Premium Gradient Background */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Top right glow */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-b from-blue-600 via-purple-600 to-transparent rounded-full filter blur-3xl opacity-30 animate-pulse" />
        {/* Bottom left glow */}
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-t from-purple-600 via-blue-600 to-transparent rounded-full filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }} />
        {/* Center subtle glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full filter blur-3xl opacity-10" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/10 backdrop-blur-xl bg-[#0a0e27]/80">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Propel
          </motion.h1>
          <div className="flex gap-4">
            <Link href="/login" className="px-4 py-2 text-slate-300 hover:text-white transition-colors text-sm">
              Login
            </Link>
            <Link href="/signup" className="px-6 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full font-medium transition-all text-sm">
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
          <motion.div variants={itemVariants} className="mb-6 inline-block">
            <span className="px-4 py-2 bg-white/10 border border-white/20 rounded-full text-sm font-medium text-slate-300 hover:bg-white/20 transition-colors cursor-pointer">
              ✨ Advanced Student Success Platform
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.div variants={itemVariants}>
            <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Master Your <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Academic Future</span>
            </h2>
          </motion.div>

          {/* Subheading */}
          <motion.p variants={itemVariants} className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            All-in-one platform for AP exam prep, college admissions planning, physics simulations, and intelligent study tools.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/signup" className="px-8 py-3 bg-white text-[#0a0e27] rounded-full font-semibold hover:bg-slate-100 transition-all duration-300 shadow-lg hover:shadow-xl">
              Get Started Free
            </Link>
            <button className="px-8 py-3 border border-white/30 rounded-full font-semibold hover:bg-white/10 transition-all duration-300">
              Learn More
            </button>
          </motion.div>

          {/* Stats Grid */}
          <motion.div variants={itemVariants} className="grid grid-cols-3 gap-6 md:gap-12 pt-8 border-t border-white/10">
            <div>
              <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent">50+</p>
              <p className="text-slate-400 text-sm mt-2">Real AP FRQs</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-purple-500 bg-clip-text text-transparent">30+</p>
              <p className="text-slate-400 text-sm mt-2">Real Colleges</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-400 to-pink-500 bg-clip-text text-transparent">250+</p>
              <p className="text-slate-400 text-sm mt-2">Study Cards</p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative z-10">
        <motion.div variants={containerVariants} className="max-w-7xl mx-auto px-6">
          <motion.h3 variants={itemVariants} className="text-4xl md:text-5xl font-bold text-center mb-20">
            Powerful tools for <br /> student success
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tools.map((tool, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className="group cursor-pointer p-6 rounded-2xl border border-white/10 hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-300 backdrop-blur-sm overflow-hidden relative"
              >
                {/* Hover gradient effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${tool.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`} />

                {/* Content */}
                <div className="relative z-10">
                  <div className="text-4xl mb-4">{tool.icon}</div>
                  <h4 className="text-xl font-bold mb-2">{tool.title}</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">{tool.desc}</p>

                  {/* Arrow */}
                  <motion.div
                    animate={{ x: 0 }}
                    whileHover={{ x: 4 }}
                    className="mt-4 text-slate-300 text-sm font-medium flex items-center gap-1 group-hover:text-white transition-colors"
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
      <section className="py-20 relative z-10">
        <motion.div variants={containerVariants} className="max-w-3xl mx-auto px-6 text-center">
          <motion.div variants={itemVariants} className="p-12 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to ace your exams <br /> and get into your dream school?
            </h3>
            <p className="text-slate-300 mb-8 text-lg">
              Join thousands of students using Propel to master AP exams, plan college applications, and study smarter.
            </p>
            <Link href="/signup" className="px-8 py-3 bg-white text-[#0a0e27] rounded-full font-semibold hover:bg-slate-100 transition-all duration-300 inline-block">
              Start Free Today
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 mt-20 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center text-slate-400 text-sm">
            <p>&copy; 2024 Propel. All rights reserved.</p>
            <p className="mt-2">Free tier • Premium $7/month</p>
          </div>
        </div>
      </footer>
    </motion.div>
  );
}
