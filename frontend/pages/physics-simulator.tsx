import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { physicsAPI } from '@/utils/api';
import { useAuth } from '@/hooks/useAuth';
import PhysicsCanvas from '@/components/PhysicsCanvas';
import type { PhysicsSimulation } from '@/types';

const SUBJECTS = ['Physics 1', 'Physics 2', 'Physics C', 'Chemistry', 'Biology'];

interface SimulationParams {
  velocity: number;
  angle: number;
  mass?: number;
}

export default function PhysicsSimulator() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const [simulations, setSimulations] = useState<PhysicsSimulation[]>([]);
  const [selectedSim, setSelectedSim] = useState<PhysicsSimulation | null>(null);
  const [subject, setSubject] = useState('Physics 1');
  const [params, setParams] = useState<SimulationParams>({
    velocity: 20,
    angle: 45,
    mass: 1,
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedStates, setSavedStates] = useState<any[]>([]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    fetchSimulations();
  }, [subject, isAuthenticated]);

  const fetchSimulations = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await physicsAPI.getSimulations(subject);
      setSimulations(response.data || []);
      setSelectedSim(null);
    } catch (err) {
      setError('Failed to load simulations. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectSim = async (sim: PhysicsSimulation) => {
    setError(null);
    try {
      const response = await physicsAPI.getSimulation(sim.id);
      setSelectedSim(response.data);
      setParams({
        velocity: 20,
        angle: 45,
        mass: 1,
      });
      setIsPlaying(false);
    } catch (err) {
      setError('Failed to load simulation. Please try again.');
      console.error(err);
    }
  };

  const handleSaveState = async () => {
    if (!selectedSim || !isAuthenticated) return;
    setError(null);

    try {
      await physicsAPI.saveState(selectedSim.id, { params });
      setSavedStates([...savedStates, { timestamp: new Date(), params }]);
      // Show success toast
    } catch (err) {
      setError('Failed to save state. Please try again.');
      console.error(err);
    }
  };

  const handleReset = () => {
    setParams({
      velocity: 20,
      angle: 45,
      mass: 1,
    });
    setIsPlaying(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Physics Simulator</h1>
          <p className="text-gray-600">Interactive 3D physics simulations with real-time calculations</p>
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

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg mb-6"
          >
            {error}
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Simulations List */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-6">
              <h2 className="font-bold text-lg mb-4 text-gray-900">Simulations</h2>
              {loading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-16 bg-gray-200 rounded animate-pulse"></div>
                  ))}
                </div>
              ) : simulations.length > 0 ? (
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {simulations.map((sim) => (
                    <motion.button
                      key={sim.id}
                      onClick={() => handleSelectSim(sim)}
                      whileHover={{ x: 5 }}
                      className={`w-full text-left p-4 rounded-lg transition ${
                        selectedSim?.id === sim.id
                          ? 'bg-indigo-100 border-l-4 border-indigo-600'
                          : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      <p className="font-semibold text-sm text-gray-900">{sim.name}</p>
                      <p className="text-xs text-gray-600 mt-1">{sim.topic}</p>
                    </motion.button>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No simulations available.</p>
              )}
            </div>
          </motion.div>

          {/* Simulation Detail */}
          {selectedSim ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-3"
            >
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedSim.name}</h2>
                <p className="text-gray-600 mb-6">{selectedSim.description}</p>

                {/* Canvas and Controls */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                  {/* Canvas */}
                  <div className="lg:col-span-2 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg overflow-hidden min-h-96">
                    <PhysicsCanvas
                      simulationType="projectile"
                      params={params}
                      isPlaying={isPlaying}
                      onAnimationComplete={() => setIsPlaying(false)}
                    />
                  </div>

                  {/* Controls */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 mb-4">Parameters</h3>

                      <div className="space-y-4">
                        {/* Velocity */}
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Velocity: {params.velocity} m/s
                          </label>
                          <input
                            type="range"
                            min="5"
                            max="50"
                            value={params.velocity}
                            onChange={(e) =>
                              setParams({ ...params, velocity: parseFloat(e.target.value) })
                            }
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                            disabled={isPlaying}
                          />
                          <input
                            type="number"
                            value={params.velocity}
                            onChange={(e) =>
                              setParams({ ...params, velocity: parseFloat(e.target.value) })
                            }
                            className="w-full mt-2 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            disabled={isPlaying}
                            min="5"
                            max="50"
                          />
                        </div>

                        {/* Angle */}
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Angle: {params.angle}°
                          </label>
                          <input
                            type="range"
                            min="0"
                            max="90"
                            value={params.angle}
                            onChange={(e) =>
                              setParams({ ...params, angle: parseFloat(e.target.value) })
                            }
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                            disabled={isPlaying}
                          />
                          <input
                            type="number"
                            value={params.angle}
                            onChange={(e) =>
                              setParams({ ...params, angle: parseFloat(e.target.value) })
                            }
                            className="w-full mt-2 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            disabled={isPlaying}
                            min="0"
                            max="90"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3 pt-4 border-t border-gray-200">
                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 font-semibold transition flex items-center justify-center gap-2"
                      >
                        {isPlaying ? '⏸ Pause' : '▶ Play'}
                      </button>

                      <button
                        onClick={handleReset}
                        className="w-full bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 font-semibold transition"
                      >
                        ⟲ Reset
                      </button>

                      {isAuthenticated && (
                        <button
                          onClick={handleSaveState}
                          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-semibold transition"
                        >
                          💾 Save State
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Physics Info */}
                <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                  <h3 className="font-semibold text-gray-900 mb-3">Physics Constants</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Gravity (g)</p>
                      <p className="font-semibold text-gray-900">{selectedSim.physics.g} m/s²</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Air Resistance</p>
                      <p className="font-semibold text-gray-900">{(selectedSim.physics.friction * 100).toFixed(1)}%</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="lg:col-span-3 bg-white rounded-lg shadow-lg p-12 text-center"
            >
              <p className="text-gray-500 text-lg">
                {loading ? 'Loading simulations...' : 'Select a simulation to begin'}
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
