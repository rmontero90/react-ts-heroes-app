import { describe, expect, test, vi, beforeEach } from 'vitest';
import { getSummaryAction } from './get-summary.action';

describe('getSummaryAction', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('should fetch summary data and return complete summary information', async () => {
    const summary = await getSummaryAction();

    expect(summary).toStrictEqual({
      totalHeroes: expect.any(Number),
      strongestHero: expect.objectContaining({
        id: expect.any(String),
        name: expect.any(String),
        slug: expect.any(String),
        alias: expect.any(String),
        powers: expect.any(Array),
        description: expect.any(String),
        strength: expect.any(Number),
        intelligence: expect.any(Number),
        speed: expect.any(Number),
        durability: expect.any(Number),
        team: expect.any(String),
        image: expect.any(String),
        firstAppearance: expect.any(String),
        status: expect.any(String),
      }),
      smartestHero: expect.objectContaining({
        id: expect.any(String),
        name: expect.any(String),
        slug: expect.any(String),
        alias: expect.any(String),
        powers: expect.any(Array),
        description: expect.any(String),
        strength: expect.any(Number),
        intelligence: expect.any(Number),
        speed: expect.any(Number),
        durability: expect.any(Number),
        team: expect.any(String),
        image: expect.any(String),
        firstAppearance: expect.any(String),
        status: expect.any(String),
      }),
      heroCount: expect.any(Number),
      villainCount: expect.any(Number),
    });
  });
});
