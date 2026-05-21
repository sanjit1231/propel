import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

export default function PhysicsSimulator() {
  const [simulations, setSimulations] = useState<any[]>([]);
  const [selectedSim, setSelectedSim] = useState<any>(null);
  const [subject, setSubject] = useState('Physics 1');
  const [params, setParams] = useState<any>({});

  useEffect(() => {
    fetchSimulations();
  }, [subject]);

  const fetchSimulations = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/physics/simulations`, {
        params: { subject },
      });
      setSimulations(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectSim = async (sim: any) => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/physics/simulations/${sim.id}`);
      setSelectedSim(res.data);
      setParams({
        velocity: 20,
        angle: 45,
        mass: 1,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const subjects = ['Physics 1', 'Physics 2', 'Physics C', 'Chemistry', 'Biology'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Physics Simulator</h1>

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

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 max-h-96 overflow-y-auto">
              <h2 className="font-bold text-lg mb-4">Simulations</h2>
              {simulations.map((sim, i) => (
                <motion.button
                  key={i}
                  onClick={() => handleSelectSim(sim)}
                  whileHover={{ x: 5 }}
                  className={`w-full text-left p-3 rounded mb-2 transition ${
                    selectedSim?.id === sim.id
                      ? 'bg-indigo-100 border-l-4 border-indigo-600'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <p className="font-semibold text-sm">{sim.name}</p>
                  <p className="text-xs text-gray-500">{sim.topic}</p>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {selectedSim && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-3">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-2">{selectedSim.name}</h2>
                <p className="text-gray-600 mb-6">{selectedSim.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-gray-900 rounded-lg p-6 min-h-96 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-white text-lg">🎬 Simulation Canvas</p>
                      <p className="text-gray-400 text-sm mt-2">Three.js + Babylon.js rendering</p>
                      <p className="text-gray-400 text-sm">60fps physics animation</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-bold text-lg">Parameters</h3>

                    {['velocity', 'angle', 'mass'].map((param) => (
                      <div key={param}>
                        <label className="block text-sm font-semibold text-gray-700 mb-2 capitalize">
                          {param}: {params[param]}
                        </label>
                        <input
                          type="range"
                          min="0"
                          max={param === 'velocity' ? 50 : param === 'angle' ? 90 : 10}
                          value={params[param]}
                          onChange={(e) =>
                            setParams({ ...params, [param]: parseFloat(e.target.value) })
                          }
                          className="w-full"
                        />
                      </div>
                    ))}

                    <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 font-semibold">
                      ▶ Play
                    </button>
                    <button className="w-full bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 font-semibold">
                      ⟲ Reset
                    </button>
                    <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 font-semibold">
                      💾 Save State
                    </button>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded border-l-4 border-blue-500">
                  <h3 className="font-semibold mb-2">Physics Constants</h3>
                  <pre className="text-xs text-gray-700">
                    {JSON.stringify(selectedSim.physics, null, 2)}
                  </pre>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
