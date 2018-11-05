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
import ListHeader from '@/components/ListHeader.vue';
import HeroList from '@/components/HeroList.vue';
import { mapActions, mapGetters, mapMutations } from 'vuex';
// import { ADD_PERSON, UPDATE_PERSON, DELETE_PERSON } from '@/store';

export default {
  name: 'Heroes',
  data() {
    return {
      title: 'Heroes',
      routePath: '/heroes',
      // heroes: [{ id: 1, name: 'ward', description: 'hi' }],
      selected: null,
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
    askToDelete(hero) {
      // TODO
      // this.heroToDelete = hero;
      // this.showModal = true;
      // if (this.heroToDelete.name) {
      //   this.message = `Would you like to delete ${this.heroToDelete.name}?`;
      // }
    },
    enableAddMode() {},
    refreshHeroes() {
      this.selected = null;
      this.getHeroes();
    },
    select(hero) {
      this.selected = hero;
    },
  },
};
</script>

<style lang="scss">
</style>
