import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

export default function StudyTool() {
  const [decks, setDecks] = useState<any[]>([]);
  const [selectedDeck, setSelectedDeck] = useState<any>(null);
  const [cards, setCards] = useState<any[]>([]);
  const [currentCardIdx, setCurrentCardIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [inSession, setInSession] = useState(false);

  useEffect(() => {
    fetchDecks();
  }, []);

  const fetchDecks = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/study/decks`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDecks(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleStartSession = async (deck: any) => {
    const token = localStorage.getItem('token');
    try {
      const cardsRes = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/study/decks/${deck.id}/cards`);
      setCards(cardsRes.data);
      setSelectedDeck(deck);
      setInSession(true);
      setCurrentCardIdx(0);
      setIsFlipped(false);

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/study/session`,
        { deckId: deck.id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleCardResult = async (quality: number) => {
    const token = localStorage.getItem('token');
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/study/card-result`,
        { cardId: cards[currentCardIdx].id, quality },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (currentCardIdx < cards.length - 1) {
        setCurrentCardIdx(currentCardIdx + 1);
        setIsFlipped(false);
      } else {
        setInSession(false);
        setCurrentCardIdx(0);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (inSession && cards.length > 0) {
    const currentCard = cards[currentCardIdx];
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
        <div className="w-full max-w-2xl">
          <div className="mb-4 text-center">
            <p className="text-gray-600">
              Card {currentCardIdx + 1} of {cards.length}
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div
                className="bg-indigo-600 h-2 rounded-full transition-all"
                style={{ width: `${((currentCardIdx + 1) / cards.length) * 100}%` }}
              />
            </div>
          </div>

          <motion.div
            onClick={() => setIsFlipped(!isFlipped)}
            className="bg-white rounded-lg shadow-2xl p-8 cursor-pointer min-h-64 flex items-center justify-center mb-6"
            whileHover={{ scale: 1.02 }}
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-4">{isFlipped ? 'Answer' : 'Question'}</p>
              <p className="text-3xl font-bold text-gray-900">
                {isFlipped ? currentCard.back : currentCard.front}
              </p>
              <p className="text-gray-500 mt-6 text-sm">Click to flip</p>
            </div>
          </motion.div>

          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Hard', quality: 1, color: 'red' },
              { label: 'Medium', quality: 3, color: 'yellow' },
              { label: 'Easy', quality: 5, color: 'green' },
            ].map((btn) => (
              <button
                key={btn.label}
                onClick={() => handleCardResult(btn.quality)}
                className={`bg-${btn.color}-100 text-${btn.color}-700 py-3 rounded-lg font-semibold hover:bg-${btn.color}-200`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Study Tool - Flashcards</h1>

        {decks.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <p className="text-gray-600 mb-4">Loading decks...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {decks.map((deck, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-lg shadow-lg p-6"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{deck.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">Subject: {deck.subject}</p>
                  <p className="text-gray-700 font-semibold mb-4">{deck.cardCount} cards</p>
                  <button
                    onClick={() => handleStartSession(deck)}
                    className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 font-semibold"
                  >
                    Study Now
                  </button>
                </motion.div>
              ))}
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Your Progress</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                  <p className="text-gray-600 text-sm">Total Cards</p>
                  <p className="text-3xl font-bold text-blue-600">150</p>
                </div>
                <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
                  <p className="text-gray-600 text-sm">Mastered</p>
                  <p className="text-3xl font-bold text-green-600">45</p>
                </div>
                <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-500">
                  <p className="text-gray-600 text-sm">Study Streak</p>
                  <p className="text-3xl font-bold text-purple-600">5 days</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
