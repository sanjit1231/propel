import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { apPrepAPI } from '@/utils/api';
import { useAuth } from '@/hooks/useAuth';
import type { FRQ } from '@/types';

const SUBJECTS = ['Physics 1', 'Physics 2', 'Chemistry', 'Biology', 'Calculus', 'Statistics'];
const MAX_HINTS = 3;

export default function APPrep() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const [frqs, setFrqs] = useState<FRQ[]>([]);
  const [selectedFrq, setSelectedFrq] = useState<FRQ | null>(null);
  const [subject, setSubject] = useState('Physics 1');
  const [response, setResponse] = useState('');
  const [hintsUsed, setHintsUsed] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submittingAnswer, setSubmittingAnswer] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    fetchFrqs();
  }, [subject, isAuthenticated]);

  const fetchFrqs = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apPrepAPI.getFRQs(subject);
      setFrqs(response.data || []);
      setSelectedFrq(null);
    } catch (err) {
      setError('Failed to load FRQs. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!selectedFrq || !isAuthenticated) return;

    setSubmittingAnswer(true);
    setError(null);
    try {
      await apPrepAPI.submitAttempt(selectedFrq.id, response);
      setSubmitted(true);
      setTimeout(() => {
        setSelectedFrq(null);
        setResponse('');
        setSubmitted(false);
        setHintsUsed(0);
        fetchFrqs(); // Refresh to update progress
      }, 2000);
    } catch (err) {
      setError('Failed to submit answer. Please try again.');
      console.error(err);
    } finally {
      setSubmittingAnswer(false);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const revealNextHint = () => {
    if (hintsUsed < MAX_HINTS && selectedFrq && selectedFrq.hints) {
      setHintsUsed(hintsUsed + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">AP Exam Prep</h1>
          <p className="text-gray-600">Practice free-response questions and master each AP subject</p>
        </motion.div>

        {/* Subject Selector */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6 flex gap-2 overflow-x-auto pb-2"
        >
          {SUBJECTS.map((s) => (
            <button
              key={s}
              onClick={() => setSubject(s)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap font-semibold transition ${
                subject === s
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {s}
            </button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* FRQ List */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-6">
              <h2 className="font-bold text-lg mb-4 text-gray-900">Questions ({frqs.length})</h2>
              {loading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-16 bg-gray-200 rounded animate-pulse"></div>
                  ))}
                </div>
              ) : frqs.length > 0 ? (
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {frqs.map((frq) => (
                    <motion.button
                      key={frq.id}
                      onClick={() => {
                        setSelectedFrq(frq);
                        setResponse('');
                        setHintsUsed(0);
                        setSubmitted(false);
                        setError(null);
                      }}
                      whileHover={{ x: 5 }}
                      className={`w-full text-left p-4 rounded-lg transition ${
                        selectedFrq?.id === frq.id
                          ? 'bg-indigo-100 border-l-4 border-indigo-600'
                          : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      <p className="font-semibold text-sm text-gray-900 line-clamp-2">{frq.title}</p>
                      <div className="flex gap-2 mt-2">
                        <span className={`text-xs px-2 py-1 rounded ${getDifficultyColor(frq.difficulty)}`}>
                          {frq.difficulty}
                        </span>
                        <span className="text-xs text-gray-600 px-2 py-1">
                          {frq.points} pts
                        </span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No questions available for this subject.</p>
              )}
            </div>
          </motion.div>

          {/* FRQ Detail & Response */}
          {selectedFrq ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-2 bg-white rounded-lg shadow-lg p-8"
            >
              {/* Header */}
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">{selectedFrq.title}</h2>
                <div className="flex gap-3">
                  <span className={`text-sm px-3 py-1 rounded-full ${getDifficultyColor(selectedFrq.difficulty)}`}>
                    {selectedFrq.difficulty.charAt(0).toUpperCase() + selectedFrq.difficulty.slice(1)}
                  </span>
                  <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                    {selectedFrq.points} points
                  </span>
                </div>
              </div>

              {/* Question */}
              <div className="bg-blue-50 p-6 rounded-lg mb-6 border-l-4 border-blue-500">
                <p className="text-gray-800 whitespace-pre-wrap font-medium">{selectedFrq.question}</p>
              </div>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg mb-6"
                >
                  {error}
                </motion.div>
              )}

              {/* Response Textarea */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Your Response</h3>
                <textarea
                  value={response}
                  onChange={(e) => setResponse(e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 min-h-40 resize-none"
                  placeholder="Write your solution here... (Explain your reasoning step by step)"
                  disabled={submitted || submittingAnswer}
                />
                <p className="text-xs text-gray-500 mt-2">{response.length} characters</p>
              </div>

              {/* Hints */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900">Hints</h3>
                  <span className="text-sm text-gray-600">{hintsUsed}/{MAX_HINTS}</span>
                </div>

                {hintsUsed < MAX_HINTS && selectedFrq.hints && (
                  <button
                    onClick={revealNextHint}
                    disabled={submitted || submittingAnswer}
                    className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition text-sm font-medium disabled:opacity-50"
                  >
                    💡 Show Hint {hintsUsed + 1}
                  </button>
                )}

                {hintsUsed > 0 && selectedFrq.hints && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 space-y-3"
                  >
                    {Array.from({ length: hintsUsed }).map((_, i) => (
                      <div
                        key={i}
                        className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400"
                      >
                        <p className="text-sm font-semibold text-yellow-900 mb-1">Hint {i + 1}:</p>
                        <p className="text-sm text-yellow-800">
                          {selectedFrq.hints[i] || 'No more hints available'}
                        </p>
                      </div>
                    ))}
                  </motion.div>
                )}
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={submitted || !response.trim() || submittingAnswer}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 disabled:opacity-50 font-semibold transition"
              >
                {submitted ? '✓ Submitted!' : submittingAnswer ? 'Submitting...' : 'Submit Response'}
              </button>

              {/* Solution */}
              {submitted && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-6 p-6 bg-green-50 rounded-lg border border-green-200"
                >
                  <p className="text-green-800 font-semibold mb-3">✓ Response submitted!</p>
                  <details className="text-sm">
                    <summary className="cursor-pointer font-semibold text-green-700 hover:text-green-800">
                      View Solution
                    </summary>
                    <div className="mt-4 bg-white p-4 rounded border border-green-200 text-gray-700 whitespace-pre-wrap">
                      {selectedFrq.solution}
                    </div>
                  </details>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="lg:col-span-2 bg-white rounded-lg shadow-lg p-12 text-center"
            >
              <p className="text-gray-500 text-lg">
                {loading ? 'Loading questions...' : 'Select a question to get started'}
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
