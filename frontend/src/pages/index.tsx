import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-indigo-600">Propel</h1>
        <div className="flex gap-4">
          <Link href="/login" className="px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded">
            Login
          </Link>
          <Link href="/signup" className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
            Sign Up
          </Link>
        </div>
      </nav>

      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-5xl font-bold text-gray-900 mb-6">
          Your Path to Academic Success
        </motion.h2>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Master AP exams, explore physics through interactive simulations, and prepare for college—all in one platform.
        </motion.p>
        <Link href="/signup" className="bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg hover:bg-indigo-700 inline-block">
          Get Started Free
        </Link>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20">
        <h3 className="text-3xl font-bold text-center mb-12">Our Tools</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { title: 'College Calculator', desc: 'Find your perfect schools based on GPA & SAT' },
            { title: 'AP Exam Prep', desc: '270+ FRQs with interactive hints across 9 STEM APs' },
            { title: 'Physics Simulator', desc: 'Interactive 3D physics simulations with animations' },
            { title: 'Study Tool', desc: 'Smart flashcards with spaced repetition' },
          ].map((tool, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: i * 0.1 }} className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition">
              <h4 className="text-2xl font-bold text-indigo-600 mb-3">{tool.title}</h4>
              <p className="text-gray-600">{tool.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-8 mt-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p>&copy; 2024 Propel. All rights reserved. | Free tier with ads | Premium $7/month</p>
        </div>
      </footer>
    </div>
  );
}
