import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

export default function APPrep() {
  const [frqs, setFrqs] = useState<any[]>([]);
  const [selectedFrq, setSelectedFrq] = useState<any>(null);
  const [subject, setSubject] = useState('Physics 1');
  const [response, setResponse] = useState('');
  const [hintsUsed, setHintsUsed] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetchFrqs();
  }, [subject]);

  const fetchFrqs = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/ap-prep/frqs`, {
        params: { subject },
      });
      setFrqs(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/ap-prep/attempts`,
        { frqId: selectedFrq.id, response },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSubmitted(true);
      setTimeout(() => {
        setSelectedFrq(null);
        setResponse('');
        setSubmitted(false);
        setHintsUsed(0);
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  const subjects = ['Physics 1', 'Physics 2', 'Chemistry', 'Biology', 'Calculus', 'Statistics'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">AP Exam Prep</h1>

        <div className="mb-6 flex gap-2 overflow-x-auto">
          {subjects.map((s) => (
            <button
              key={s}
              onClick={() => setSubject(s)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap font-semibold transition ${
                subject === s
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 max-h-96 overflow-y-auto">
              <h2 className="font-bold text-lg mb-4">FRQs</h2>
              {frqs.map((frq, i) => (
                <motion.button
                  key={i}
                  onClick={() => {
                    setSelectedFrq(frq);
                    setResponse('');
                    setHintsUsed(0);
                    setSubmitted(false);
                  }}
                  whileHover={{ x: 5 }}
                  className={`w-full text-left p-3 rounded mb-2 transition ${
                    selectedFrq?.id === frq.id
                      ? 'bg-indigo-100 border-l-4 border-indigo-600'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <p className="font-semibold text-sm">{frq.title}</p>
                  <span className="text-xs text-gray-500">{frq.points} pts</span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {selectedFrq && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-2 bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-4">{selectedFrq.title}</h2>
              <div className="bg-blue-50 p-4 rounded mb-6 border-l-4 border-blue-500">
                <p className="text-gray-700 mb-2">{selectedFrq.question}</p>
                <p className="text-xs text-gray-500">{selectedFrq.points} points • ~{selectedFrq.time_minutes} minutes</p>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold mb-3">Your Response</h3>
                <textarea
                  value={response}
                  onChange={(e) => setResponse(e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 min-h-32"
                  placeholder="Write your solution here..."
                  disabled={submitted}
                />
              </div>

              {hintsUsed < 3 && (
                <button
                  onClick={() => setHintsUsed(hintsUsed + 1)}
                  className="mb-4 px-4 py-2 bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200 text-sm"
                >
                  💡 Hint ({hintsUsed + 1}/3)
                </button>
              )}

              {hintsUsed > 0 && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-yellow-50 p-4 rounded mb-6 border-l-4 border-yellow-400">
                  <p className="text-sm text-yellow-800">{selectedFrq.hints[Math.min(hintsUsed - 1, selectedFrq.hints.length - 1)]}</p>
                </motion.div>
              )}

              <button
                onClick={handleSubmit}
                disabled={submitted || !response.trim()}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 disabled:opacity-50 font-semibold"
              >
                {submitted ? '✓ Submitted!' : 'Submit Response'}
              </button>

              {submitted && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 p-4 bg-green-50 rounded border border-green-200">
                  <p className="text-green-800">Keep practicing to master this concept!</p>
                  <details className="mt-2 text-sm text-green-700 cursor-pointer">
                    <summary>View solution</summary>
                    <p className="mt-2 bg-white p-2 rounded">{selectedFrq.solution}</p>
                  </details>
                </motion.div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
