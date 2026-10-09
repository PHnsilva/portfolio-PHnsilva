import { describe, expect, it } from 'vitest';
import { advance, newRace, ROAD, steer } from '../src/games/racer';

describe('pixel racer', () => {
  it('moves automatically, accelerates and caps difficulty during a long run', () => {
    const race = newRace();
    for (let i = 0; i < 3600; i++) advance(race, 1 / 60, () => 0);
    expect(race.crashed).toBe(false);
    expect(race.distance).toBeGreaterThan(2000);
    expect(race.speed).toBe(540);
    expect(race.obstacles.every((o) => o.y < ROAD.height + 48)).toBe(true);
    const rows = race.obstacles.map((o) => o.y).sort((a, b) => a - b);
    for (let i = 1; i < rows.length; i++) expect(rows[i] - rows[i - 1]).toBeGreaterThan(179);
  });
  it('starts twice as fast and doubles acceleration', () => {
    const race = newRace();
    expect(race.speed).toBe(210);
    for (let i = 0; i < 600; i++) advance(race, 1 / 60, () => 0);
    expect(race.speed).toBeCloseTo(280, 5);
  });
  it('clamps steering at the road boundaries and detects collision while crossing lanes', () => {
    const race = newRace();
    steer(race, -1);
    steer(race, -1);
    expect(race.lane).toBe(0);
    race.obstacles = [{ lane: 0, y: ROAD.playerY, kind: 'barrier' }];
    advance(race, 0.1);
    expect(race.crashed).toBe(true);
    const distance = race.distance;
    advance(race, 1);
    expect(race.distance).toBe(distance);
    expect(newRace()).toMatchObject({ distance: 0, crashed: false, lane: 1, obstacles: [] });
  });
  it('allows passing an obstacle in an adjacent lane', () => {
    const race = newRace();
    race.obstacles = [{ lane: 0, y: ROAD.playerY - 20, kind: 'car' }];
    for (let i = 0; i < 120; i++) advance(race, 1 / 60, () => 0);
    expect(race.crashed).toBe(false);
  });
  it('does not teleport through obstacles after a delayed frame', () => {
    const race = newRace();
    race.seconds = 60;
    race.obstacles = [{ lane: 1, y: ROAD.playerY - 55, kind: 'car' }];
    advance(race, 30);
    expect(race.crashed).toBe(true);
    expect(race.seconds).toBeLessThanOrEqual(60.1);
  });
  it('keeps movement consistent across frame rates', () => {
    const slow = newRace(),
      fast = newRace();
    for (let i = 0; i < 300; i++) advance(slow, 1 / 30, () => 0);
    for (let i = 0; i < 1200; i++) advance(fast, 1 / 120, () => 0);
    expect(slow.distance).toBeCloseTo(fast.distance, 5);
    expect(slow.speed).toBeCloseTo(fast.speed, 5);
  });
});
