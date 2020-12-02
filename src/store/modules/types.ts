import type { Hero, Villain } from './models';

export interface RootState {}

export interface HeroesState {
  heroes: Hero[];
}

export interface VillainsState {
  villains: Villain[];
}
