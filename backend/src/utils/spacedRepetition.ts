export interface CardProgress {
  cardId: number;
  easinessFactor: number;
  interval: number;
  repetitions: number;
  nextReviewDate: Date;
}

export function initializeCard(): CardProgress {
  return {
    cardId: 0,
    easinessFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date(),
  };
}

export function updateCardProgress(progress: CardProgress, quality: number): CardProgress {
  // SM-2 Algorithm: quality 0-5
  if (quality < 3) {
    progress.repetitions = 0;
    progress.interval = 1;
  } else {
    if (progress.repetitions === 0) {
      progress.interval = 1;
    } else if (progress.repetitions === 1) {
      progress.interval = 3;
    } else {
      progress.interval = Math.round(progress.interval * progress.easinessFactor);
    }
    progress.repetitions += 1;
  }

  progress.easinessFactor = Math.max(
    1.3,
    progress.easinessFactor + 0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)
  );

  const nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + progress.interval);
  progress.nextReviewDate = nextDate;

  return progress;
}
