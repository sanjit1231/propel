import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { studyAPI } from '@/utils/api';
import { useAuth } from '@/hooks/useAuth';
import type { FlashcardDeck, Flashcard } from '@/types';

const QUALITY_BUTTONS = [
  { label: 'Hard', quality: 1, icon: '😤', color: 'red' },
  { label: 'Medium', quality: 3, icon: '😐', color: 'yellow' },
  { label: 'Easy', quality: 5, icon: '😊', color: 'green' },
];

export default function StudyTool() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  // Deck Selection View
  const [decks, setDecks] = useState<FlashcardDeck[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Study Session View
  const [inSession, setInSession] = useState(false);
  const [selectedDeck, setSelectedDeck] = useState<FlashcardDeck | null>(null);
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [currentCardIdx, setCurrentCardIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [sessionStats, setSessionStats] = useState({ correct: 0, skipped: 0 });

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    fetchDecks();
  }, [isAuthenticated]);

  const fetchDecks = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await studyAPI.getDecks();
      setDecks(response.data || []);
    } catch (err) {
      setError('Failed to load decks. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStartSession = async (deck: FlashcardDeck) => {
    setError(null);
    try {
      // Get cards
      const cardsResponse = await studyAPI.getDeckCards(deck.id);
      if (!cardsResponse.data || cardsResponse.data.length === 0) {
        setError('No cards found in this deck.');
        return;
      }
      setCards(cardsResponse.data);

      // Start session
      await studyAPI.startSession(deck.id);

      setSelectedDeck(deck);
      setInSession(true);
      setCurrentCardIdx(0);
      setIsFlipped(false);
      setSessionStats({ correct: 0, skipped: 0 });
    } catch (err) {
      setError('Failed to start study session. Please try again.');
      console.error(err);
    }
  };

  const handleCardResult = async (quality: number) => {
    const currentCard = cards[currentCardIdx];
    try {
      await studyAPI.submitCardResult(currentCard.id, quality);

      // Update stats
      if (quality >= 3) {
        setSessionStats(prev => ({ ...prev, correct: prev.correct + 1 }));
      } else {
        setSessionStats(prev => ({ ...prev, skipped: prev.skipped + 1 }));
      }

      // Move to next card or end session
      if (currentCardIdx < cards.length - 1) {
        setCurrentCardIdx(currentCardIdx + 1);
        setIsFlipped(false);
      } else {
        // Session complete
        setInSession(false);
      }
    } catch (err) {
      setError('Failed to save card result. Please try again.');
      console.error(err);
    }
  };

  const handleExitSession = () => {
    setInSession(false);
    setSelectedDeck(null);
    setCurrentCardIdx(0);
    setIsFlipped(false);
  };

  // STUDY SESSION VIEW
  if (inSession && cards.length > 0 && selectedDeck) {
    const currentCard = cards[currentCardIdx];
    const progressPercent = ((currentCardIdx + 1) / cards.length) * 100;

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-2xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{selectedDeck.name}</h1>
              <p className="text-gray-600 mb-4">
                Card {currentCardIdx + 1} of {cards.length}
              </p>
              <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  className="bg-indigo-600 h-3 rounded-full transition-all"
                />
              </div>
            </motion.div>
          </div>

          {/* Flashcard */}
          <motion.div
            key={currentCardIdx}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={() => setIsFlipped(!isFlipped)}
            className={`bg-white rounded-2xl shadow-2xl p-8 cursor-pointer min-h-80 flex items-center justify-center mb-8 transition-all ${
              isFlipped ? 'bg-gradient-to-br from-indigo-50 to-blue-50' : ''
            }`}
          >
            <div className="text-center w-full">
              <p className={`text-sm font-semibold mb-6 ${isFlipped ? 'text-indigo-600' : 'text-gray-500'}`}>
                {isFlipped ? '📝 Answer' : '❓ Question'}
              </p>
              <p className="text-2xl md:text-3xl font-bold text-gray-900 leading-relaxed mb-6">
                {isFlipped ? currentCard.back : currentCard.front}
              </p>
              <motion.p
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-gray-400 text-sm"
              >
                Click to {isFlipped ? 'see question' : 'reveal answer'}
              </motion.p>
            </div>
          </motion.div>

          {/* Quality Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-3 gap-3 mb-6"
          >
            {QUALITY_BUTTONS.map((btn) => (
              <button
                key={btn.quality}
                onClick={() => handleCardResult(btn.quality)}
                className={`py-4 rounded-xl font-semibold transition-all transform hover:scale-105 text-lg flex flex-col items-center gap-2 ${
                  btn.color === 'red'
                    ? 'bg-red-100 text-red-700 hover:bg-red-200'
                    : btn.color === 'yellow'
                    ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                    : 'bg-green-100 text-green-700 hover:bg-green-200'
                }`}
              >
                <span className="text-2xl">{btn.icon}</span>
                {btn.label}
              </button>
            ))}
          </motion.div>

          {/* Exit Button */}
          <button
            onClick={handleExitSession}
            className="w-full py-2 text-gray-600 hover:text-gray-900 text-sm font-medium"
          >
            Exit Session
          </button>
        </div>
      </div>
    );
  }

  // SESSION COMPLETE VIEW
  if (!inSession && selectedDeck && currentCardIdx === 0 && sessionStats.correct + sessionStats.skipped > 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-2xl p-12 max-w-md w-full text-center"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">🎉 Session Complete!</h1>
          <p className="text-gray-600 mb-8">Great job studying!</p>

          <div className="space-y-4 mb-8">
            <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
              <p className="text-sm text-gray-600">Mastered</p>
              <p className="text-3xl font-bold text-green-600">{sessionStats.correct}</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
              <p className="text-sm text-gray-600">Need Review</p>
              <p className="text-3xl font-bold text-yellow-600">{sessionStats.skipped}</p>
            </div>
          </div>

          <button
            onClick={() => {
              setSelectedDeck(null);
              setSessionStats({ correct: 0, skipped: 0 });
            }}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 font-semibold"
          >
            Back to Decks
          </button>
        </motion.div>
      </div>
    );
  }

  // DECK SELECTION VIEW
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Study Tool - Flashcards</h1>
          <p className="text-gray-600">Learn with spaced repetition. Smart flashcards for effective studying.</p>
        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg mb-6"
          >
            {error}
          </motion.div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-48 bg-white rounded-lg shadow-lg animate-pulse"></div>
            ))}
          </div>
        ) : decks.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {decks.map((deck, i) => (
                <motion.div
                  key={deck.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{deck.name}</h3>
                      <p className="text-gray-600 text-sm">{deck.subject}</p>
                    </div>
                    <span className="text-2xl">📚</span>
                  </div>

                  <div className="mb-4 pt-4 border-t border-gray-200">
                    <p className="text-gray-700 font-semibold text-lg">{deck.cardCount} cards</p>
                  </div>

                  <button
                    onClick={() => handleStartSession(deck)}
                    className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 font-semibold transition"
                  >
                    Study Now
                  </button>
                </motion.div>
              ))}
            </div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-lg shadow-lg p-12 text-center"
          >
            <p className="text-gray-500 text-lg">No decks available yet. Check back soon!</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
