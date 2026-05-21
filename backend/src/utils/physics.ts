const G = 9.8; // gravitational constant

export function projectileRange(v0: number, angle: number): number {
  const angleRad = (angle * Math.PI) / 180;
  return (v0 * v0 * Math.sin(2 * angleRad)) / G;
}

export function projectileMaxHeight(v0: number, angle: number): number {
  const angleRad = (angle * Math.PI) / 180;
  return (v0 * v0 * Math.sin(angleRad) * Math.sin(angleRad)) / (2 * G);
}

export function projectileTimeOfFlight(v0: number, angle: number): number {
  const angleRad = (angle * Math.PI) / 180;
  return (2 * v0 * Math.sin(angleRad)) / G;
}

export function kineticEnergy(mass: number, velocity: number): number {
  return 0.5 * mass * velocity * velocity;
}

export function potentialEnergy(mass: number, height: number): number {
  return mass * G * height;
}

export function springPotential(k: number, x: number): number {
  return 0.5 * k * x * x;
}

export function momentum(mass: number, velocity: number): number {
  return mass * velocity;
}

export function force(mass: number, acceleration: number): number {
  return mass * acceleration;
}

export function elasticCollisionVelocities(
  m1: number,
  v1: number,
  m2: number,
  v2: number
): [number, number] {
  const v1Final = ((m1 - m2) * v1 + 2 * m2 * v2) / (m1 + m2);
  const v2Final = ((m2 - m1) * v2 + 2 * m1 * v1) / (m1 + m2);
  return [v1Final, v2Final];
}

export function waveSpeed(frequency: number, wavelength: number): number {
  return frequency * wavelength;
}

export function dopplerEffect(f0: number, vSource: number, vObserver: number, vSound: number): number {
  return f0 * ((vSound + vObserver) / (vSound - vSource));
}
