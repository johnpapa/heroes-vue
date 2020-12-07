import store from '@/store';
import { Villain } from '@/store/modules/models';

export function useVillains() {
  return {
    deleteVillainAction,
    getVillainsAction,
    updateVillainAction,
    addVillainAction,
  };

  async function deleteVillainAction(villains: Villain) {
    await store.dispatch('deleteVillainAction', villains);
  }

  async function getVillainsAction() {
    await store.dispatch('getVillainsAction');
  }

  async function updateVillainAction(villains: Villain) {
    await store.dispatch('updateVillainAction', villains);
  }

  async function addVillainAction(villains: Villain) {
    await store.dispatch('addVillainAction', villains);
  }
}
