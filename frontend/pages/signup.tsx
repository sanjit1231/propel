import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { motion } from 'framer-motion';
import axios from 'axios';
import { pageVariants, containerVariants, itemVariants } from '@/animations/transitions';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
        email,
        password,
        firstName,
        lastName,
      });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.userId);
      router.push('/dashboard');
    } catch (err) {
      setError('Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const inputFields = [
    { name: 'firstName', label: 'First Name', type: 'text', placeholder: 'John', value: firstName, onChange: setFirstName },
    { name: 'lastName', label: 'Last Name', type: 'text', placeholder: 'Doe', value: lastName, onChange: setLastName },
    { name: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com', value: email, onChange: setEmail },
    { name: 'password', label: 'Password', type: 'password', placeholder: '••••••••', value: password, onChange: setPassword },
    { name: 'confirmPassword', label: 'Confirm Password', type: 'password', placeholder: '••••••••', value: confirmPassword, onChange: setConfirmPassword },
  ];

  return (
    <motion.div initial="initial" animate="animate" variants={pageVariants} className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden" style={{ backgroundColor: '#0a0a0a' }}>
      {/* Premium Zeabur Gradient Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-b from-violet-600 via-purple-600 to-transparent rounded-full filter blur-3xl opacity-40 animate-float" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-t from-purple-600 via-violet-600 to-transparent rounded-full filter blur-3xl opacity-40 animate-float" style={{ animationDelay: '2s' }} />
      </div>

      {/* Form Container */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-md relative z-10 p-8 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl">
        {/* Branding */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent mb-2">
            Propel
          </h1>
          <p className="text-slate-400 text-sm">Join thousands of successful students</p>
        </div>

        {/* Error Message */}
        {error && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-red-500/10 border border-red-500/30 text-red-300 p-3 rounded-lg mb-6 text-sm">
            {error}
          </motion.div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {inputFields.map((field, idx) => (
            <motion.div key={field.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.05 }}>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">{field.label}</label>
              <input
                type={field.type}
                placeholder={field.placeholder}
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                required
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all text-sm"
              />
            </motion.div>
          ))}

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-white text-black rounded-lg font-semibold mt-6 hover:bg-slate-100 disabled:opacity-50 flex items-center justify-center gap-2 transition-all"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-slate-300 border-t-slate-900 rounded-full animate-spin" />
                Creating Account...
              </>
            ) : (
              'Create Account'
            )}
          </motion.button>
        </form>

        {/* Login Link */}
        <p className="text-center text-slate-400 text-sm mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-white font-semibold hover:text-slate-100 transition-colors">
            Log in
          </Link>
        </p>
      </motion.div>
    </motion.div>
  );
}
