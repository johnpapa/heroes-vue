<template>
  <div class="content-container">
    <ListHeader :title="title" @refresh="getHeroes" @add="enableAddMode" :routePath="routePath"></ListHeader>
    <div class="columns is-multiline is-variable">
      <div class="column is-8" v-if="heroes">
        <div v-if="!selected">
          <HeroList :heroes="heroes" :selectedHero="selected" @selected="select($event)" @deleted="askToDelete($event)"></HeroList>
        </div>
        <div v-if="selected">
          {{selected.name}}
          <!-- <app-hero-detail [hero]="selected" (unselect)="clear()" (save)="save($event)"></app-hero-detail> -->
        </div>
      </div>
    </div>

    <Modal class="modal-hero" :message="message" :isOpen="showModal" @handleNo="closeModal" @handleYes="deleteHero"></Modal>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import ListHeader from '@/components/ListHeader.vue';
import HeroList from '@/components/HeroList.vue';
import Modal from '@/components/Modal.vue';
import { ADD_HERO, UPDATE_HERO } from '@/store';

const captains = console;

export default {
  name: 'Heroes',
  data() {
    return {
      heroToDelete: null,
      message: '',
      routePath: '/heroes',
      // heroes: [{ id: 1, name: 'ward', description: 'hi' }],
      selected: null,
      showModal: false,
      title: 'Heroes',
    };
  },
  components: {
    ListHeader,
    HeroList,
    Modal,
  },
  created() {
    this.getHeroesAction();
  },
  computed: {
    ...mapGetters('heroes', { heroes: 'heroes' }),
  },
  methods: {
    ...mapActions('heroes', ['getHeroesAction', 'deleteHeroAction']),
    ...mapMutations('heroes', [ADD_HERO, UPDATE_HERO]),
    askToDelete(hero) {
      this.heroToDelete = hero;
      this.showModal = true;
      if (this.heroToDelete.name) {
        this.message = `Would you like to delete ${this.heroToDelete.name}?`;
        captains.log(this.message);
      }
    },
    clear() {
      this.selected = null;
    },
    closeModal() {
      this.showModal = false;
    },
    deleteHero() {
      this.closeModal();
      if (this.heroToDelete) {
        captains.log(`You said you want to delete ${this.heroToDelete.name}`);
        this.deleteHeroAction(this.heroToDelete);
      }
      this.clear();
    },
    enableAddMode() {},
    getHeroes() {
      this.getHeroesAction();
      this.clear();
    },
    save(arg) {
      const hero = arg.hero;
      console.log('hero changed', hero);
      arg.mode === 'add' ? this.ADD_HERO(hero) : this.UPDATE_HERO(hero);
    },
    select(hero) {
      this.selected = hero;
    },
  },
};
</script>

<style lang="scss">
</style>
