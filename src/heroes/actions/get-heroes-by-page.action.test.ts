// https://www.npmjs.com/package/axios-mock-adapter

import { beforeEach, describe, expect, test } from 'vitest';
import { getHeroesByPageAction } from './get-heroes-by-page.action';
import { heroApi } from '../api/hero.api';
import AxiosMockAdapter from 'axios-mock-adapter';

describe('getHeroesByPageAction', () => {
  const heroesApiMock = new AxiosMockAdapter(heroApi);

  beforeEach(() => {
    heroesApiMock.reset();
  });

  test('should return the correct heroes', async () => {
    const BASE_URL = import.meta.env.VITE_API_URL;

    heroesApiMock.onGet('/').reply(200, {
      total: 10,
      pages: 2,
      heroes: [
        {
          image: '1.jpeg',
        },
        {
          image: '2.jpeg',
        },
      ],
    });

    const response = await getHeroesByPageAction(1);
    expect(response).toStrictEqual({
      total: 10,
      pages: 2,
      heroes: [
        { image: `${BASE_URL}/images/1.jpeg` },
        { image: `${BASE_URL}/images/2.jpeg` },
      ],
    });
  });

  test('should call the API with the correct parameters', async () => {
    heroesApiMock.onGet('/').reply(200, {
      total: 10,
      pages: 2,
      heroes: [],
    });

    await getHeroesByPageAction(1);

    expect(heroesApiMock.history.get.length).toBe(1);

    const request = heroesApiMock.history.get[0];

    expect(request.url).toBe('/');
    expect(request.params).toEqual({
      limit: 6,
      offset: 0,
      category: 'all',
    });
  });

  test('should return the correct heroes when the page is not a number', async () => {
    const responseObject = {
      total: 10,
      pages: 1,
      heroes: [],
    };

    heroesApiMock.onGet('/').reply(200, responseObject);

    await getHeroesByPageAction('a' as unknown as number);
    const request = heroesApiMock.history.get[0];

    expect(request.url).toBe('/');
    expect(request.params).toEqual({
      limit: 6,
      offset: 0,
      category: 'all',
    });
  });

  test('should call the API with different category', async () => {
    heroesApiMock.onGet('/').reply(200, {
      total: 10,
      pages: 2,
      heroes: [],
    });

    await getHeroesByPageAction(1, 6, 'marvel');

    expect(heroesApiMock.history.get.length).toBe(1);

    const request = heroesApiMock.history.get[0];

    expect(request.url).toBe('/');
    expect(request.params).toEqual({
      limit: 6,
      offset: 0,
      category: 'marvel',
    });
  });
});
