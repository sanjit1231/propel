interface College {
  name: string;
  sat: number;
  gpa: number;
  rate: number;
}

export function calculateAcceptanceChance(college: College, sat: number, gpa: number): number {
  const satDiff = sat - college.sat;
  const gpaDiff = gpa - college.gpa;
  const satImpact = (satDiff / 50) * 5;
  const gpaImpact = (gpaDiff / 0.1) * 10;
  const chance = college.rate + satImpact + gpaImpact;
  return Math.max(0, Math.min(100, chance));
}

export function categorizeCollege(college: College, sat: number, gpa: number): 'reach' | 'target' | 'likely' {
  const chance = calculateAcceptanceChance(college, sat, gpa);
  if (chance < 20) return 'reach';
  if (chance < 60) return 'target';
  return 'likely';
}
