<template>
  <div class="content-container">
    <ListHeader :title="title" @refresh="refreshHeroes" @add="enableAddMode" :routePath="routePath"></ListHeader>
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

    <!-- <app-modal class="modal-hero" [message]="message" [isOpen]="showModal" (handleNo)="closeModal()" (handleYes)="deleteHero()"></app-modal> -->
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import ListHeader from '@/components/ListHeader.vue';
import HeroList from '@/components/HeroList.vue';
import { ADD_HERO, UPDATE_HERO, DELETE_HERO } from '@/store';

const captains = console;

export default {
  name: 'Heroes',
  data() {
    return {
      heroToDelete: null,
      title: 'Heroes',
      routePath: '/heroes',
      // heroes: [{ id: 1, name: 'ward', description: 'hi' }],
      selected: null,
      showModal: false,
    };
  },
  components: {
    ListHeader,
    HeroList,
  },
  created() {
    this.getHeroes();
  },
  computed: {
    ...mapGetters('heroes', { heroes: 'heroes' }),
  },
  methods: {
    ...mapActions('heroes', ['getHeroes']),
    ...mapMutations('heroes', [ADD_HERO, UPDATE_HERO, DELETE_HERO]),
    askToDelete(hero) {
      this.heroToDelete = hero;
      this.showModal = true;
      if (this.heroToDelete.name) {
        this.message = `Would you like to delete ${this.heroToDelete.name}?`;
        captains.log(this.message);
      }
    },
    deleteHero() {
      this.showModal = false;
      if (this.heroToDelete) {
        // TODO
        // this.heroService
        //   .delete(this.heroToDelete.id)
        //   .subscribe(() => (this.heroToDelete = null));
      }
      this.close();
    },
    enableAddMode() {},
    refreshHeroes() {
      this.selected = null;
      this.getHeroes();
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
