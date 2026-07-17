import type { Hero } from "./heroe.interface";

export interface HeroesResponse {
  total: number;
  pages: number;
  heroes: Hero[];
}
