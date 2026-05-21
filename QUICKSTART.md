# Propel - Quick Start Guide

Get Propel running locally in 5 minutes!

## Prerequisites

- Node.js 16+ ([download](https://nodejs.org/))
- npm (comes with Node.js)

## Quick Start (No Database Required)

The backend runs with mock data - no database setup needed for testing!

### Step 1: Start Backend (Terminal 1)

```bash
cd backend
npm install
npm run dev
```

You should see:
```
Propel API running on port 5000
```

### Step 2: Start Frontend (Terminal 2)

```bash
cd frontend
npm install
npm run dev
```

You should see:
```
> ready started server on 0.0.0.0:3000
```

### Step 3: Open Browser

Visit **http://localhost:3000**

## Test the Platform

### 1. Landing Page
- See feature overview
- Click "Get Started Free" or "Sign Up"

### 2. Create Account
```
Email: test@example.com
Password: password123
First Name: John
Last Name: Doe
```

### 3. Try Each Tool

#### College Calculator
- SAT: 1400
- GPA: 3.8
- Click "Calculate Matches"
- See your reach/target/likely schools

#### AP Exam Prep
- Select "Physics 1" tab
- Click any FRQ title
- Read question
- Click "💡 Hint" to see hints
- Write a response
- Click "Submit Response"
- View solution

#### Physics Simulator
- Select "Physics 1" subject
- Click any simulation
- Adjust velocity/angle/mass sliders
- Click "▶ Play"
- Click "💾 Save State"

#### Study Tool
- Click "Study Now" on any deck
- See flashcard with question
- Click card to flip and see answer
- Click Hard/Medium/Easy
- Progress through deck
- View stats at end

## File Structure Explained

```
backend/
├── src/
│   ├── server.ts          # Express app setup
│   ├── routes/            # API endpoints
│   │   ├── auth.ts        # Register/login
│   │   ├── college.ts     # College matching
│   │   ├── apprep.ts      # FRQs and hints
│   │   ├── physics.ts     # Simulations
│   │   └── study.ts       # Flashcards
│   ├── middleware/        # Auth validation
│   └── config/            # Database (mock data)
└── package.json

frontend/
├── src/
│   ├── pages/             # Next.js pages
│   │   ├── index.tsx      # Landing
│   │   ├── login.tsx      # Auth
│   │   ├── dashboard.tsx  # Main hub
│   │   ├── college-calculator.tsx
│   │   ├── ap-prep.tsx
│   │   ├── physics-simulator.tsx
│   │   └── study-tool.tsx
│   ├── styles/            # CSS
│   └── types/             # TypeScript interfaces
└── package.json
```

## API Endpoints (Quick Reference)

### Auth
```
POST /auth/register
POST /auth/login
```

### College Calculator
```
POST /college/calculate
```

### AP Prep
```
GET /ap-prep/frqs?subject=Physics 1
GET /ap-prep/frqs/:id
POST /ap-prep/attempts
GET /ap-prep/progress
```

### Physics
```
GET /physics/simulations?subject=Physics 1
GET /physics/simulations/:id
POST /physics/states
```

### Study
```
GET /study/decks
GET /study/decks/:id/cards
POST /study/session
POST /study/card-result
```

## Troubleshooting

### Port 3000 or 5000 Already in Use
```bash
# Kill the process (macOS/Linux)
lsof -ti:3000 | xargs kill -9
lsof -ti:5000 | xargs kill -9

# Or specify different ports:
# Frontend: npm run dev -- -p 3001
# Backend: PORT=5001 npm run dev
```

### "Cannot find module" error
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Frontend can't connect to backend
- Check backend is running on `http://localhost:5000`
- Check `NEXT_PUBLIC_API_URL` in frontend environment
- Check no CORS errors in browser console

## Customize Data

### Edit Mock Colleges
File: `backend/src/routes/college.ts`
```typescript
const COLLEGES = [
  { name: 'Your School', sat: 1500, gpa: 3.9, rate: 5.0 },
  // ...
];
```

### Edit Mock FRQs
File: `backend/src/routes/apprep.ts`
```typescript
const FRQS = [
  {
    id: 1,
    subject: 'Chemistry',
    title: 'Your Question',
    question: 'Question text here',
    // ...
  },
];
```

### Edit Mock Decks
File: `backend/src/routes/study.ts`
```typescript
const DECKS = [
  { id: 1, name: 'Your Deck', subject: 'Physics 1', cardCount: 25 },
  // ...
];

const CARDS = [
  { id: 1, deckId: 1, front: 'Q?', back: 'A.' },
  // ...
];
```

## Next Features to Add

1. **Real Database**
   - Install PostgreSQL
   - Create database
   - Replace mock data with queries

2. **3D Physics**
   - Integrate Three.js
   - Build physics engine with Cannon.js
   - Create specific simulation components

3. **Authentication**
   - Google OAuth integration
   - Email verification
   - Password reset

4. **Payments**
   - Stripe integration
   - Premium subscription flow
   - Payment history

5. **Analytics**
   - Track user progress
   - Study statistics
   - Performance insights

## Development Tips

### Enable Debug Logging
Add to `backend/src/server.ts`:
```typescript
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});
```

### Test API Directly
```bash
# Register
curl -X POST http://localhost:5000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"pass","firstName":"John","lastName":"Doe"}'

# Login
curl -X POST http://localhost:5000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"pass"}'

# College calculator
curl -X POST http://localhost:5000/college/calculate \
  -H "Content-Type: application/json" \
  -d '{"sat":1400,"gpa":3.8}'
```

## Deployment Ready

When you're ready to go live:

### Backend → Railway
```bash
git push heroku main  # If using Railway
# Or follow Railway's Git deploy guide
```

### Frontend → Vercel
```bash
vercel  # CLI tool
# Or connect GitHub repo to Vercel dashboard
```

## Support

- Check console for error messages
- Read the full README.md for details
- Review the backend route files for data structure
- Check browser DevTools Network tab for API errors

---

**You're all set!** 🚀 Start building your Propel features!
