import { describe, expect, vi, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
  RouterProvider,
  createMemoryRouter,
  Outlet,
  useParams,
} from 'react-router';
import { appRouter } from './app.router';

// Mock de los componentes para evitar dependencias externas
vi.mock('@/admin/layouts/AdminLayout', () => ({
  AdminLayout: () => (
    <div data-testid="admin-layout">
      <Outlet />
    </div>
  ),
}));

vi.mock('@/admin/pages/AdminPage', () => ({
  AdminPage: () => <div data-testid="admin-page">Admin Page</div>,
}));

vi.mock('@/heroes/layouts/HeroesLayout', () => ({
  HeroesLayout: () => (
    <div data-testid="heroes-layout">
      <Outlet />
    </div>
  ),
}));

vi.mock('@/heroes/pages/hero/HeroPage', () => ({
  HeroPage: () => {
    const { idSlug = '' } = useParams();
    return <div data-testid="hero-page">Hero Page {idSlug}</div>;
  },
}));

vi.mock('@/heroes/pages/home/HomePage', () => ({
  HomePage: () => <div data-testid="home-page">Home Page</div>,
}));

vi.mock('@/heroes/pages/search/SearchPage', () => ({
  default: () => <div data-testid="search-page">Search Page</div>,
}));

describe('App Router', () => {
  test('should render home page at root path', async () => {
    const router = createMemoryRouter(appRouter.routes, {
      initialEntries: ['/'],
    });

    render(<RouterProvider router={router} />);

    expect(await screen.findByTestId('heroes-layout')).toBeDefined();
    expect(await screen.findByTestId('home-page')).toBeDefined();
  });

  test('should render hero page at /heroes/:idSlug path', async () => {
    const router = createMemoryRouter(appRouter.routes, {
      initialEntries: ['/heroes/superman'],
    });

    render(<RouterProvider router={router} />);

    expect(await screen.findByTestId('heroes-layout')).toBeDefined();
    expect(await screen.findByTestId('hero-page')).toBeDefined();
    expect(await screen.findByText('Hero Page superman')).toBeDefined();
  });

  test('should render search page at /search path', async () => {
    const router = createMemoryRouter(appRouter.routes, {
      initialEntries: ['/search'],
    });

    render(<RouterProvider router={router} />);

    expect(await screen.findByTestId('heroes-layout')).toBeDefined();
    expect(await screen.findByTestId('search-page')).toBeDefined();
  });

  test('should render admin page at /admin path', async () => {
    const router = createMemoryRouter(appRouter.routes, {
      initialEntries: ['/admin'],
    });

    render(<RouterProvider router={router} />);

    expect(await screen.findByTestId('admin-layout')).toBeDefined();
    expect(await screen.findByTestId('admin-page')).toBeDefined();
  });

  test('should redirect to home page for unknown routes', async () => {
    const router = createMemoryRouter(appRouter.routes, {
      initialEntries: ['/unknown-route'],
    });

    render(<RouterProvider router={router} />);

    // Debería redirigir a la página principal
    expect(await screen.findByTestId('heroes-layout')).toBeDefined();
    expect(await screen.findByTestId('home-page')).toBeDefined();
  });
});
