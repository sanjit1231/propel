import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const api = axios.create({
  baseURL: API_URL,
});

export function getAuthHeader() {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export function setAuthToken(token: string) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  localStorage.setItem('token', token);
}

export function clearAuthToken() {
  delete api.defaults.headers.common['Authorization'];
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
}

// API calls
export const authAPI = {
  register: (email: string, password: string, firstName: string, lastName: string) =>
    api.post('/auth/register', { email, password, firstName, lastName }),
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
};

export const collegeAPI = {
  calculate: (sat: number, gpa: number) =>
    api.post('/college/calculate', { sat, gpa }),
};

export const apPrepAPI = {
  getFRQs: (subject?: string) =>
    api.get('/ap-prep/frqs', { params: { subject } }),
  getFRQ: (id: number) =>
    api.get(`/ap-prep/frqs/${id}`),
  submitAttempt: (frqId: number, response: string) =>
    api.post('/ap-prep/attempts', { frqId, response }, { headers: getAuthHeader() }),
  getProgress: () =>
    api.get('/ap-prep/progress', { headers: getAuthHeader() }),
};

export const physicsAPI = {
  getSimulations: (subject?: string) =>
    api.get('/physics/simulations', { params: { subject } }),
  getSimulation: (id: number) =>
    api.get(`/physics/simulations/${id}`),
  saveState: (simulationId: number, state: any) =>
    api.post('/physics/states', { simulationId, state }, { headers: getAuthHeader() }),
  getStates: () =>
    api.get('/physics/states', { headers: getAuthHeader() }),
};

export const studyAPI = {
  getDecks: (subject?: string) =>
    api.get('/study/decks', {
      params: { subject },
      headers: getAuthHeader(),
    }),
  getDeckCards: (deckId: number) =>
    api.get(`/study/decks/${deckId}/cards`),
  startSession: (deckId: number) =>
    api.post('/study/session', { deckId }, { headers: getAuthHeader() }),
  submitCardResult: (cardId: number, quality: number) =>
    api.post('/study/card-result', { cardId, quality }, { headers: getAuthHeader() }),
  getProgress: () =>
    api.get('/study/progress', { headers: getAuthHeader() }),
};
