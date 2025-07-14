import { describe, expect, test, vi, beforeEach } from 'vitest';
import { getHeroAction } from './get-hero.action';

describe('getHeroAction', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('should fetch hero data and return with complete image URL', async () => {
    // Arrange
    const idSlug = 'peter-parker';

    // Act
    const result = await getHeroAction(idSlug);

    // Assert
    expect(result).toStrictEqual({
      id: '5',
      name: 'Peter Parker',
      slug: 'peter-parker',
      alias: 'Spider-Man',
      powers: [
        'Escalar muros',
        'Sentido arácnido',
        'Lanzar telarañas',
        'Agilidad sobrehumana',
        'Reflejos mejorados',
      ],
      description:
        'Tu amistoso vecino Spider-Man, con gran poder viene una gran responsabilidad.',
      strength: 7,
      intelligence: 9,
      speed: 7,
      durability: 7,
      team: 'Vengadores',
      image: expect.any(String),
      firstAppearance: '1962',
      status: 'Active',
      category: 'Hero',
      universe: 'Marvel',
    });
    expect(result.image).toContain('http');
    expect(result.image).toContain('images');
    expect(result.image).toContain('5.jpeg');
  });

  test('should throw an error if the hero is not found', async () => {
    // Arrange
    const idSlug = 'batman';

    // Act
    const result = await getHeroAction(idSlug).catch((error) => {
      expect(error).toBeDefined();
      expect(error.message).toBe('Request failed with status code 404');
    });

    // Assert
    expect(result).toBeUndefined();
  });
});
