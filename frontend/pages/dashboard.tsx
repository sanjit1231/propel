import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { clearAuthToken } from '@/utils/api';

const TOOLS = [
  {
    title: 'College Calculator',
    icon: '🎓',
    href: '/college-calculator',
    desc: 'Find your perfect schools based on SAT & GPA',
    color: 'from-blue-400 to-blue-600',
  },
  {
    title: 'AP Exam Prep',
    icon: '📚',
    href: '/ap-prep',
    desc: '270+ FRQs with hints across 9 STEM APs',
    color: 'from-green-400 to-green-600',
  },
  {
    title: 'Physics Simulator',
    icon: '⚛️',
    href: '/physics-simulator',
    desc: 'Interactive 3D physics simulations',
    color: 'from-purple-400 to-purple-600',
  },
  {
    title: 'Study Tool',
    icon: '💡',
    href: '/study-tool',
    desc: 'Smart flashcards with spaced repetition',
    color: 'from-orange-400 to-orange-600',
  },
];

const STATS = [
  { label: 'FRQs Completed', value: '12', icon: '📝', bgColor: 'bg-blue-50', textColor: 'text-blue-600', borderColor: 'border-blue-500' },
  { label: 'Cards Mastered', value: '87', icon: '✨', bgColor: 'bg-green-50', textColor: 'text-green-600', borderColor: 'border-green-500' },
  { label: 'Current Streak', value: '7 days', icon: '🔥', bgColor: 'bg-orange-50', textColor: 'text-orange-600', borderColor: 'border-orange-500' },
];

export default function Dashboard() {
  const router = useRouter();
  const { isAuthenticated, userId } = useAuth();
  const [userName, setUserName] = useState<string>('Student');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    // Get user name from localStorage or API
    const firstName = localStorage.getItem('firstName') || 'Student';
    setUserName(firstName);
    setLoading(false);
  }, [isAuthenticated, router]);

  const handleLogout = () => {
    clearAuthToken();
    router.push('/login');
  };

  if (loading || !isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <span className="text-2xl">🚀</span>
            <h1 className="text-2xl font-bold text-indigo-600">Propel</h1>
          </motion.div>

          <button
            onClick={handleLogout}
            className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition font-medium"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h2 className="text-5xl font-bold text-gray-900 mb-2">
            Welcome back, {userName}! 👋
          </h2>
          <p className="text-xl text-gray-600">
            Your path to academic success continues here
          </p>
        </motion.div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {TOOLS.map((tool, i) => (
            <motion.div
              key={tool.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className="h-full"
            >
              <Link href={tool.href} className="block h-full">
                <div className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all h-full p-6 cursor-pointer overflow-hidden relative">
                  {/* Gradient background accent */}
                  <div className={`absolute -right-10 -top-10 w-32 h-32 bg-gradient-to-br ${tool.color} opacity-5 rounded-full`}></div>

                  <div className="relative z-10">
                    <div className="text-5xl mb-3">{tool.icon}</div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{tool.title}</h3>
                    <p className="text-gray-600 text-sm">{tool.desc}</p>
                  </div>

                  {/* Click indicator */}
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <span className="text-indigo-600 font-semibold text-sm flex items-center gap-1">
                      Open →
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Your Progress</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className={`${stat.bgColor} p-6 rounded-lg border-l-4 ${stat.borderColor} hover:shadow-lg transition`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                    <p className={`text-4xl font-bold ${stat.textColor} mt-2`}>{stat.value}</p>
                  </div>
                  <span className="text-3xl">{stat.icon}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-8 text-white"
        >
          <h3 className="text-2xl font-bold mb-3">💡 Study Tips</h3>
          <ul className="space-y-2 text-indigo-50">
            <li>✓ Complete 5 FRQs per day to master AP concepts</li>
            <li>✓ Review flashcards during short breaks (5-10 minutes)</li>
            <li>✓ Use the physics simulator to understand concepts visually</li>
            <li>✓ Target 3-4 colleges in each category (reach, target, likely)</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
