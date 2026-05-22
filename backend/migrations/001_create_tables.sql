-- Create users table if not exists
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create colleges table
CREATE TABLE IF NOT EXISTS colleges (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  sat SMALLINT NOT NULL,
  gpa DECIMAL(3, 2) NOT NULL,
  accept_rate SMALLINT DEFAULT 50,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create FRQ (Free Response Question) table
CREATE TABLE IF NOT EXISTS frqs (
  id SERIAL PRIMARY KEY,
  subject VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  question TEXT NOT NULL,
  solution TEXT NOT NULL,
  hints TEXT[] DEFAULT '{}',
  difficulty VARCHAR(20),
  points SMALLINT DEFAULT 4,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create FRQ attempts table
CREATE TABLE IF NOT EXISTS frq_attempts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  frq_id INTEGER NOT NULL REFERENCES frqs(id) ON DELETE CASCADE,
  response TEXT NOT NULL,
  score DECIMAL(3, 1),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create flashcard decks table
CREATE TABLE IF NOT EXISTS decks (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  subject VARCHAR(100),
  card_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create flashcards table
CREATE TABLE IF NOT EXISTS cards (
  id SERIAL PRIMARY KEY,
  deck_id INTEGER NOT NULL REFERENCES decks(id) ON DELETE CASCADE,
  front TEXT NOT NULL,
  back TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create card progress table (for spaced repetition SM-2)
CREATE TABLE IF NOT EXISTS card_progress (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  card_id INTEGER NOT NULL REFERENCES cards(id) ON DELETE CASCADE,
  easiness_factor DECIMAL(3, 2) DEFAULT 2.5,
  interval SMALLINT DEFAULT 1,
  repetitions SMALLINT DEFAULT 0,
  next_review_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, card_id)
);

-- Create physics simulations table
CREATE TABLE IF NOT EXISTS physics_simulations (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  subject VARCHAR(100) NOT NULL,
  topic VARCHAR(100) NOT NULL,
  description TEXT,
  config_json JSONB DEFAULT '{}',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create simulation states table
CREATE TABLE IF NOT EXISTS simulation_states (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  simulation_id INTEGER NOT NULL REFERENCES physics_simulations(id) ON DELETE CASCADE,
  state_json JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_frq_attempts_user_id ON frq_attempts(user_id);
CREATE INDEX IF NOT EXISTS idx_frq_attempts_frq_id ON frq_attempts(frq_id);
CREATE INDEX IF NOT EXISTS idx_frq_subject ON frqs(subject);
CREATE INDEX IF NOT EXISTS idx_card_progress_user_id ON card_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_card_progress_next_review ON card_progress(next_review_date);
CREATE INDEX IF NOT EXISTS idx_cards_deck_id ON cards(deck_id);
CREATE INDEX IF NOT EXISTS idx_simulation_states_user_id ON simulation_states(user_id);
