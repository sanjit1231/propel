import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }
    setUser({ name: 'Student' });
  }, [router]);

  if (!user) return null;

  const tools = [
    { title: 'College Calculator', icon: '🎓', href: '/college-calculator', desc: 'Find your perfect schools' },
    { title: 'AP Exam Prep', icon: '📚', href: '/ap-prep', desc: '270+ FRQs across 9 APs' },
    { title: 'Physics Simulator', icon: '⚛️', href: '/physics-simulator', desc: 'Interactive 3D simulations' },
    { title: 'Study Tool', icon: '💡', href: '/study-tool', desc: 'Smart flashcards' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <nav className="bg-white shadow p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600">Propel</h1>
          <button onClick={() => { localStorage.removeItem('token'); router.push('/login'); }} className="px-4 py-2 text-red-600 hover:bg-red-50 rounded">
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-bold text-gray-900 mb-4">
          Welcome back, {user.name}! 👋
        </motion.h2>
        <p className="text-gray-600 mb-12">Let's continue your path to academic success</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition cursor-pointer"
            >
              <Link href={tool.href} className="block">
                <div className="text-4xl mb-3">{tool.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{tool.title}</h3>
                <p className="text-gray-600">{tool.desc}</p>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: 'FRQs Completed', value: '5', color: 'blue' },
            { label: 'Cards Mastered', value: '45', color: 'green' },
            { label: 'Study Streak', value: '5 days', color: 'purple' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className={`bg-${stat.color}-50 p-6 rounded-lg border-l-4 border-${stat.color}-500`}
            >
              <p className="text-gray-600 text-sm">{stat.label}</p>
              <p className={`text-3xl font-bold text-${stat.color}-600`}>{stat.value}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
