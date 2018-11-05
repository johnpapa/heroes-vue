<template>
  <div class="content-container">
    <ListHeader :title="title"></ListHeader>
    <!-- (add)="enableAddMode()" (refresh)="getHeroes()" -->
    <div class="columns is-multiline is-variable">
      <div class="column is-8" v-if="heroes">
        <div v-if="!selected">
          <HeroList :heroes="heroes" :selectedHero="selected" @selected="select($event)" @deleted="askToDelete($event)"></HeroList>
        </div>
        <div v-if="selected">
          hero detail
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

export default {
  name: 'Heroes',
  data() {
    return {
      title: 'Heroes',
      heroes: [{ id: 1, name: 'ward', description: 'hi' }],
      selected: null,
    };
  },
  components: {
    ListHeader,
    HeroList,
  },
  methods: {
    askToDelete() {},
    select() {},
  },
};
</script>

<style lang="scss">
</style>
