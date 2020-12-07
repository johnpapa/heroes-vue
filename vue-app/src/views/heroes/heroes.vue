<script lang="ts">
import { computed, defineComponent, onMounted, reactive, toRefs } from 'vue';

import ListHeader from '@/components/list-header.vue';
import Modal from '@/components/modal.vue';
import HeroDetail from './hero-detail.vue';
import HeroList from './hero-list.vue';
import { useHeroes } from './use-heroes';
import { Hero } from '../../store/modules/models';
import store from '../../store';

const captains = console;

interface ComponentState {
  errorMessage: string;
  heroToDelete: Hero | null;
  message: string;
  routePath: string;
  selected: Hero | null;
  showModal: boolean;
  title: string;
  heroes: Hero[];
}

export default defineComponent({
  name: 'Heroes',
  components: {
    ListHeader,
    HeroList,
    HeroDetail,
    Modal,
  },
  setup() {
    const {
      deleteHeroAction,
      getHeroesAction,
      updateHeroAction,
      addHeroAction,
    } = useHeroes();

    const state: ComponentState = reactive({
      errorMessage: '',
      message: '',
      heroToDelete: null,
      routePath: '/heroes',
      selected: null,
      showModal: false,
      title: 'Heroes',
      heroes: computed(() => store.getters.heroes as Hero[]),
    });

    onMounted(async () => getHeroes());

    function clear() {
      state.selected = null;
    }

    function closeModal() {
      state.showModal = false;
    }

    function enableAddMode() {
      state.selected = new Hero('');
    }

    function askToDelete(hero: Hero) {
      state.heroToDelete = hero;
      state.showModal = true;
      if (state.heroToDelete.name) {
        state.message = `Would you like to delete ${state.heroToDelete.name}?`;
      }
    }

    async function deleteHero() {
      closeModal();
      if (state.heroToDelete) {
        captains.log(`You said you want to delete ${state.heroToDelete.name}`);
        await deleteHeroAction(state.heroToDelete);
      }
      clear();
    }

    async function getHeroes() {
      state.errorMessage = '';
      try {
        await getHeroesAction();
      } catch (error) {
        captains.error(error);
        state.errorMessage = 'Unauthorized';
      }
    }

    async function save(hero: Hero) {
      captains.log('hero changed', hero);
      if (hero.id) {
        await updateHeroAction(hero);
      } else {
        await addHeroAction(hero);
      }
    }

    function select(hero: Hero) {
      state.selected = hero;
    }

    return {
      ...toRefs(state),
      askToDelete,
      clear,
      closeModal,
      deleteHero,
      enableAddMode,
      getHeroes,
      save,
      select,
    };
  },
});
</script>

<template>
  <div class="content-container">
    <ListHeader
      :title="title"
      @refresh="getHeroes"
      @add="enableAddMode"
      :routePath="routePath"
    ></ListHeader>
    <div class="columns is-multiline is-variable">
      <div class="column is-8" v-if="heroes">
        <HeroList
          v-if="!selected"
          :heroes="heroes"
          @deleted="askToDelete($event)"
          @selected="select($event)"
        ></HeroList>
        <HeroDetail
          v-if="selected"
          :hero="selected"
          @unselect="clear"
          @save="save"
        ></HeroDetail>
      </div>
    </div>

    <Modal
      class="modal-hero"
      :message="message"
      :isOpen="showModal"
      @handleNo="closeModal"
      @handleYes="deleteHero"
    ></Modal>
  </div>
</template>
