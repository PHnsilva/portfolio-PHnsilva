export const ROAD = { width: 340, height: 340, lanes: [90, 170, 250], playerY: 272 };
export type Obstacle = { lane: number; y: number; kind: 'car' | 'barrier' };
export type Race = {
  lane: number;
  x: number;
  seconds: number;
  distance: number;
  speed: number;
  untilSpawn: number;
  obstacles: Obstacle[];
  crashed: boolean;
};
export function newRace(): Race {
  return {
    lane: 1,
    x: 170,
    seconds: 0,
    distance: 0,
    speed: 210,
    untilSpawn: 100,
    obstacles: [],
    crashed: false,
  };
}
export function steer(race: Race, direction: -1 | 1) {
  if (!race.crashed) race.lane = Math.max(0, Math.min(2, race.lane + direction));
}
/** Bounded substeps prevent tunnelling and jumps after interrupted frames. */
export function advance(race: Race, elapsed: number, random = Math.random) {
  if (race.crashed || !Number.isFinite(elapsed) || elapsed <= 0) return;
  let remaining = Math.min(elapsed, 0.1);
  while (remaining > 0 && !race.crashed) {
    const dt = Math.min(remaining, 1 / 120);
    remaining -= dt;
    race.seconds += dt;
    race.speed = Math.min(540, 210 + race.seconds * 7);
    const travel = race.speed * dt;
    race.distance += travel / 5;
    const target = ROAD.lanes[race.lane];
    race.x += Math.sign(target - race.x) * Math.min(Math.abs(target - race.x), 620 * dt);
    for (const obstacle of race.obstacles) obstacle.y += travel;
    race.untilSpawn -= travel;
    if (race.untilSpawn <= 0) {
      // One obstacle per row leaves two lanes free, with a consistent distance gap.
      race.obstacles.push({
        lane: Math.min(2, Math.floor(random() * 3)),
        y: -48,
        kind: random() < 0.5 ? 'car' : 'barrier',
      });
      race.untilSpawn += 185 + random() * 65;
    }
    race.crashed = race.obstacles.some(
      (obstacle) =>
        Math.abs(race.x - ROAD.lanes[obstacle.lane]) < (obstacle.kind === 'car' ? 28 : 36) &&
        Math.abs(ROAD.playerY - obstacle.y) < (obstacle.kind === 'car' ? 38 : 29),
    );
    race.obstacles = race.obstacles.filter((obstacle) => obstacle.y < ROAD.height + 48);
  }
}
