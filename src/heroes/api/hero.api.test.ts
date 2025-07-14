import { describe, expect, test } from 'vitest';

import { heroApi } from './hero.api';

const BASE_URL = import.meta.env.VITE_API_URL;

describe('heroApi', () => {
  test('env should be pointing to testing environment', () => {
    expect(import.meta.env.NODE_ENV).toBe('test');
  });

  test('should be configured as expected', () => {
    expect(heroApi).toBeDefined();
    // expect(heroApi.defaults.baseURL).toBe('http://localhost:3001/api/heroes');
    expect(heroApi.defaults.baseURL).toBe(`${BASE_URL}/api/heroes`);
  });
});
