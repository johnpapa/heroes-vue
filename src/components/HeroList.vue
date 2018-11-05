<template>
  <ul class="list">
    <li v-for="(hero, index) in heroes" :key="hero.id" role="presentation">
      <div class="card">
        <CardContent :name="hero.name" :description="hero.description" />
        <footer class="card-footer">
          <ButtonFooter class="delete-item" iconClasses="fas fa-trash" @clicked="deleteHero" label="Delete" :dataIndex="index" :dataId="hero.id" />
          <ButtonFooter class="edit-item" iconClasses="fas fa-edit" @clicked="selectHero" label="Edit" :dataIndex="index" :dataId="hero.id" />
        </footer>
      </div>
    </li>
  </ul>
</template>

<script>
import ButtonFooter from '@/components/ButtonFooter.vue';
import CardContent from '@/components/CardContent.vue';

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
    deleteHero() {},
    selectHero() {},
  },
};
</script>

<style lang="scss" scoped>
</style>
