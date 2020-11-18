<script>
import { mapActions, mapGetters } from 'vuex';
import ListHeader from '@/components/list-header.vue';
import Modal from '@/components/modal.vue';
import HeroDetail from './hero-detail.vue';
import HeroList from './hero-list.vue';
import { containerMethods } from '../../shared';

const captains = console;

export default {
  name: 'Heroes',
  data() {
    return {
      heroToDelete: null,
      message: '',
      routePath: '/heroes',
      selected: null,
      showModal: false,
      title: 'Heroes',
    };
  },
  components: {
    ListHeader,
    HeroList,
    HeroDetail,
    Modal,
  },
  mixins: [containerMethods],
  created() {
    this.getHeroesAction();
  },
  computed: {
    ...mapGetters('heroes', { heroes: 'heroes' }),
  },
  methods: {
    ...mapActions('heroes', [
      'getHeroesAction',
      'deleteHeroAction',
      'addHeroAction',
      'updateHeroAction',
    ]),
    askToDelete(hero) {
      this.heroToDelete = hero;
      this.showModal = true;
      if (this.heroToDelete.name) {
        this.message = `Would you like to delete ${this.heroToDelete.name}?`;
      }
    },
    deleteHero() {
      this.closeModal();
      if (this.heroToDelete) {
        captains.log(`You said you want to delete ${this.heroToDelete.name}`);
        this.deleteHeroAction(this.heroToDelete);
      }
      this.clear();
    },
    getHeroes() {
      this.getHeroesAction();
      this.clear();
    },
    save(hero) {
      captains.log('hero changed', hero);
      if (hero.id) {
        this.updateHeroAction(hero);
      } else {
        this.addHeroAction(hero);
      }
    },
    select(hero) {
      this.selected = hero;
    },
  },
};
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
