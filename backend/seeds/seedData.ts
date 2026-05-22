// Seed script to load real data into Propel database
// Run with: npm run seed

import { Pool } from 'pg';
import { realColleges, realFRQs, realSimulations, realFlashcardDecks } from './realData';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function seedDatabase() {
  const client = await pool.connect();

  try {
    console.log('🌱 Starting database seeding...\n');

    // Seed colleges
    console.log('📚 Seeding colleges...');
    for (const college of realColleges) {
      await client.query(
        'INSERT INTO colleges (name, sat, gpa, accept_rate) VALUES ($1, $2, $3, $4) ON CONFLICT DO NOTHING',
        [college.name, college.sat, college.gpa, college.accept_rate]
      );
    }
    console.log(`✅ Seeded ${realColleges.length} colleges\n`);

    // Seed FRQs
    console.log('📖 Seeding FRQs...');
    for (const frq of realFRQs) {
      await client.query(
        'INSERT INTO frqs (subject, title, question, solution, hints, difficulty, points) VALUES ($1, $2, $3, $4, $5, $6, $7)',
        [frq.subject, frq.title, frq.question, frq.solution, frq.hints, frq.difficulty, frq.points]
      );
    }
    console.log(`✅ Seeded ${realFRQs.length} FRQs\n`);

    // Seed physics simulations
    console.log('🔬 Seeding physics simulations...');
    for (const sim of realSimulations) {
      await client.query(
        'INSERT INTO physics_simulations (name, subject, topic, description, config_json) VALUES ($1, $2, $3, $4, $5)',
        [sim.name, sim.subject, sim.topic, sim.description, JSON.stringify(sim.config)]
      );
    }
    console.log(`✅ Seeded ${realSimulations.length} simulations\n`);

    // Seed flashcard decks and cards
    console.log('🎴 Seeding flashcard decks and cards...');
    for (const deck of realFlashcardDecks) {
      const deckResult = await client.query(
        'INSERT INTO decks (name, subject, card_count) VALUES ($1, $2, $3) RETURNING id',
        [deck.name, deck.subject, deck.cards.length]
      );
      const deckId = deckResult.rows[0].id;

      // Seed cards for this deck
      for (const card of deck.cards) {
        await client.query(
          'INSERT INTO cards (deck_id, front, back) VALUES ($1, $2, $3)',
          [deckId, card.front, card.back]
        );
      }
    }
    console.log(`✅ Seeded ${realFlashcardDecks.length} decks with ${realFlashcardDecks.reduce((sum, d) => sum + d.cards.length, 0)} cards\n`);

    console.log('🎉 Database seeding completed successfully!');
    console.log('\nSummary:');
    console.log(`  • ${realColleges.length} colleges`);
    console.log(`  • ${realFRQs.length} FRQs`);
    console.log(`  • ${realSimulations.length} physics simulations`);
    console.log(`  • ${realFlashcardDecks.length} flashcard decks (${realFlashcardDecks.reduce((sum, d) => sum + d.cards.length, 0)} cards)`);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

// Run the seed
seedDatabase()
  .then(() => {
    console.log('\n✨ Seed completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Seed failed:', error);
    process.exit(1);
  });
