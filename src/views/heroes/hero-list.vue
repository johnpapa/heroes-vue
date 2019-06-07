<template>
  <ul class="list">
    <li v-for="(hero, index) in heroes" :key="hero.id" role="presentation">
      <div class="card">
        <CardContent :name="hero.name" :description="hero.description" />
        <footer class="card-footer">
          <ButtonFooter
            class="delete-item"
            iconClasses="fas fa-trash"
            label="Delete"
            :dataId="hero.id"
            :dataIndex="index"
            :item="hero"
            @clicked="deleteHero"
          />
          <ButtonFooter
            class="edit-item"
            iconClasses="fas fa-edit"
            label="Edit"
            :dataId="hero.id"
            :dataIndex="index"
            :item="hero"
            @clicked="selectHero"
          />
        </footer>
      </div>
    </li>
  </ul>
</template>

<script>
import ButtonFooter from '@/components/button-footer.vue';
import CardContent from '@/components/card-content.vue';

const captains = console;

export default {
  name: 'HeroList',
  props: {
    heroes: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    CardContent,
    ButtonFooter,
  },
  methods: {
    deleteHero(hero) {
      this.$emit('deleted', hero);
      captains.log(`You tried to delete ${hero.name}`);
    },
    selectHero(hero) {
      captains.log(`You tried to select ${hero.name}`);
      this.$emit('selected', hero);
    },
  },
};
</script>
