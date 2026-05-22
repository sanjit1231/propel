import { useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { collegeAPI } from '@/utils/api';
import type { College, CollegeResult } from '@/types';

export default function CollegeCalculator() {
  const router = useRouter();
  const [sat, setSat] = useState('1400');
  const [gpa, setGpa] = useState('3.8');
  const [results, setResults] = useState<CollegeResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateInputs = (): boolean => {
    const satNum = parseInt(sat);
    const gpaNum = parseFloat(gpa);

    if (!sat || !gpa) {
      setError('Please fill in both SAT score and GPA');
      return false;
    }
    if (satNum < 400 || satNum > 1600) {
      setError('SAT score must be between 400 and 1600');
      return false;
    }
    if (gpaNum < 0 || gpaNum > 4.0) {
      setError('GPA must be between 0.0 and 4.0');
      return false;
    }
    setError(null);
    return true;
  };

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateInputs()) return;

    setLoading(true);
    try {
      const response = await collegeAPI.calculate(parseInt(sat), parseFloat(gpa));
      setResults(response.data);
    } catch (err) {
      setError('Failed to calculate college matches. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const SchoolCard = ({ school, tier }: { school: College; tier: string }) => {
    const getTierColor = (tier: string) => {
      if (tier === 'reach') return 'border-l-4 border-red-500 bg-red-50';
      if (tier === 'target') return 'border-l-4 border-yellow-500 bg-yellow-50';
      return 'border-l-4 border-green-500 bg-green-50';
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`p-4 rounded-lg ${getTierColor(tier)} hover:shadow-md transition-shadow`}
      >
        <div className="flex justify-between items-start mb-2">
          <h4 className="font-bold text-gray-900">{school.name}</h4>
          <span className={`text-sm font-semibold px-3 py-1 rounded-full ${
            school.rate > 50 ? 'bg-green-200 text-green-800' :
            school.rate > 20 ? 'bg-yellow-200 text-yellow-800' :
            'bg-red-200 text-red-800'
          }`}>
            {school.rate}%
          </span>
        </div>
        <div className="text-sm text-gray-700 space-y-1">
          <p>Average SAT: {school.sat}</p>
          <p>Average GPA: {school.gpa.toFixed(2)}</p>
          <p className="text-xs text-gray-600">Your Match: {Math.round(school.rate)}% acceptance chance</p>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">College Admissions Calculator</h1>
          <p className="text-gray-600">Find colleges that match your SAT score and GPA</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-white p-8 rounded-lg shadow-lg sticky top-6">
              <form onSubmit={handleCalculate} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    SAT Score: {sat}
                  </label>
                  <input
                    type="range"
                    min="400"
                    max="1600"
                    value={sat}
                    onChange={(e) => setSat(e.target.value)}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <input
                    type="number"
                    value={sat}
                    onChange={(e) => setSat(e.target.value)}
                    placeholder="1200-1600"
                    min="400"
                    max="1600"
                    className="w-full px-4 py-2 mt-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    GPA: {parseFloat(gpa).toFixed(2)}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="4"
                    step="0.1"
                    value={gpa}
                    onChange={(e) => setGpa(e.target.value)}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <input
                    type="number"
                    value={gpa}
                    onChange={(e) => setGpa(e.target.value)}
                    placeholder="0.0-4.0"
                    min="0"
                    max="4"
                    step="0.1"
                    className="w-full px-4 py-2 mt-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm"
                  >
                    {error}
                  </motion.div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 disabled:opacity-50 font-semibold transition-colors"
                >
                  {loading ? 'Calculating...' : 'Calculate Matches'}
                </button>
              </form>
            </div>
          </motion.div>

          {/* Results */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            {results ? (
              <div className="space-y-6">
                {/* Reach Schools */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <span className="w-3 h-3 bg-red-500 rounded-full mr-3"></span>
                    Reach Schools ({results.reach.length})
                  </h3>
                  <div className="space-y-3">
                    {results.reach.length > 0 ? (
                      results.reach.map((school, i) => (
                        <SchoolCard key={i} school={school} tier="reach" />
                      ))
                    ) : (
                      <p className="text-gray-500 italic">No reach schools in database</p>
                    )}
                  </div>
                </div>

                {/* Target Schools */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <span className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></span>
                    Target Schools ({results.target.length})
                  </h3>
                  <div className="space-y-3">
                    {results.target.length > 0 ? (
                      results.target.map((school, i) => (
                        <SchoolCard key={i} school={school} tier="target" />
                      ))
                    ) : (
                      <p className="text-gray-500 italic">No target schools in database</p>
                    )}
                  </div>
                </div>

                {/* Likely Schools */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <span className="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
                    Likely Schools ({results.likely.length})
                  </h3>
                  <div className="space-y-3">
                    {results.likely.length > 0 ? (
                      results.likely.map((school, i) => (
                        <SchoolCard key={i} school={school} tier="likely" />
                      ))
                    ) : (
                      <p className="text-gray-500 italic">No likely schools in database</p>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white p-12 rounded-lg shadow-lg text-center"
              >
                <p className="text-gray-500 text-lg">Enter your SAT score and GPA to see college recommendations</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
