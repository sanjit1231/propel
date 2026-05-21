import { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

export default function CollegeCalculator() {
  const [sat, setSat] = useState('');
  const [gpa, setGpa] = useState('');
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/college/calculate`, {
        sat: parseInt(sat),
        gpa: parseFloat(gpa),
      });
      setResults(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">College Admissions Calculator</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-white p-8 rounded-lg shadow-lg">
            <form onSubmit={handleCalculate} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">SAT Score</label>
                <input
                  type="number"
                  value={sat}
                  onChange={(e) => setSat(e.target.value)}
                  placeholder="1200-1600"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">GPA</label>
                <input
                  type="number"
                  value={gpa}
                  onChange={(e) => setGpa(e.target.value)}
                  placeholder="0.0-4.0"
                  step="0.1"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 disabled:opacity-50 font-semibold"
              >
                {loading ? 'Calculating...' : 'Calculate Matches'}
              </button>
            </form>
          </motion.div>

          {results && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              {['reach', 'target', 'likely'].map((tier) => (
                <div key={tier} className={`p-6 rounded-lg ${tier === 'reach' ? 'bg-red-50' : tier === 'target' ? 'bg-yellow-50' : 'bg-green-50'}`}>
                  <h3 className="text-lg font-bold capitalize mb-4">{tier} Schools ({results[tier].length})</h3>
                  <div className="space-y-2">
                    {results[tier].slice(0, 5).map((school: any, i: number) => (
                      <div key={i} className="flex justify-between items-center p-3 bg-white rounded">
                        <span className="font-semibold">{school.name}</span>
                        <span className="text-sm text-gray-600">{school.rate}% acceptance</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
