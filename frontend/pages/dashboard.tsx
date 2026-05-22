import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { clearAuthToken } from '@/utils/api';
import { containerVariants, itemVariants } from '@/animations/transitions';

const TOOLS = [
  {
    title: 'College Calculator',
    icon: '🎓',
    href: '/college-calculator',
    desc: '30+ real colleges with AI-powered matching',
  },
  {
    title: 'AP Exam Prep',
    icon: '📚',
    href: '/ap-prep',
    desc: '50+ FRQs across 5 subjects with solutions',
  },
  {
    title: 'Physics Simulator',
    icon: '⚛️',
    href: '/physics-simulator',
    desc: 'Interactive 3D physics simulations',
  },
  {
    title: 'Study Tool',
    icon: '✨',
    href: '/study-tool',
    desc: '250+ cards with spaced repetition',
  },
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
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-black text-white" style={{ backgroundColor: '#0a0a0a' }}>
      {/* Premium Zeabur Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-b from-violet-600 via-purple-600 to-transparent rounded-full filter blur-3xl opacity-40 animate-float" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-t from-purple-600 via-violet-600 to-transparent rounded-full filter blur-3xl opacity-40 animate-float" style={{ animationDelay: '2s' }} />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/10 backdrop-blur-xl bg-black/90" style={{ backgroundColor: 'rgba(10, 10, 10, 0.9)' }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
              Propel
            </h1>
          </motion.div>

          <button
            onClick={handleLogout}
            className="px-4 py-2 text-slate-300 hover:text-white border border-white/10 hover:border-white/30 rounded-lg transition font-medium text-sm"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <motion.div variants={containerVariants} initial="initial" animate="animate" className="max-w-7xl mx-auto px-6 py-24 relative z-10">
        {/* Welcome Section */}
        <motion.div variants={itemVariants} className="mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-3">
            Welcome back, <span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">{userName}</span>
          </h2>
          <p className="text-xl text-slate-300">Continue your path to academic excellence</p>
        </motion.div>

        {/* Tools Grid */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {TOOLS.map((tool, i) => (
            <motion.div key={tool.href} variants={itemVariants} whileHover={{ y: -4 }} className="group">
              <Link href={tool.href} className="block h-full">
                <div className="h-full p-6 rounded-2xl border border-white/10 hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-300 backdrop-blur-sm cursor-pointer relative overflow-hidden">
                  {/* Hover gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none" />

                  <div className="relative z-10">
                    <div className="text-4xl mb-3">{tool.icon}</div>
                    <h3 className="text-lg font-bold mb-2">{tool.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{tool.desc}</p>
                    <div className="mt-4 text-slate-300 text-sm font-medium flex items-center gap-1 group-hover:text-white transition-colors">
                      Open <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div variants={itemVariants} className="grid grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm">
            <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent mb-2">
              12
            </div>
            <p className="text-slate-400 text-sm">FRQs Completed</p>
          </div>
          <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm">
            <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-purple-500 bg-clip-text text-transparent mb-2">
              87
            </div>
            <p className="text-slate-400 text-sm">Cards Mastered</p>
          </div>
          <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm">
            <div className="text-4xl font-bold bg-gradient-to-r from-pink-400 to-pink-500 bg-clip-text text-transparent mb-2">
              7
            </div>
            <p className="text-slate-400 text-sm">Day Streak 🔥</p>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
