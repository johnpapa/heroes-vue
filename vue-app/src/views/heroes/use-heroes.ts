import store from '@/store';
import { Hero } from '@/store/modules/models';

export function useHeroes() {
  return {
    deleteHeroAction,
    getHeroesAction,
    updateHeroAction,
    addHeroAction,
  };

  async function deleteHeroAction(hero: Hero) {
    await store.dispatch('deleteHeroAction', hero);
  }

  async function getHeroesAction() {
    await store.dispatch('getHeroesAction');
  }

  async function updateHeroAction(hero: Hero) {
    await store.dispatch('updateHeroAction', hero);
  }

  async function addHeroAction(hero: Hero) {
    await store.dispatch('addHeroAction', hero);
  }
}
