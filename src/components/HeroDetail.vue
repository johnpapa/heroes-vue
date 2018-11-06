<template>
  <div class="card edit-detail">
    <header class="card-header">
      <p class="card-header-title">
        {{editingHero.name}}
      </p>
    </header>
    <div class="card-content">
      <div class="content">
        <div class="field" v-if="editingHero.id">
          <label class="label" for="id">
            id
          </label>
          <input name="id" class="input" type="text" v-model="editingHero.id" placeholder="e.g. HeroColleen" readOnly />
        </div>
        <div class="field">
          <label class="label" for="name">
            name
          </label>
          <input name="name" class="input" type="text" v-model="editingHero.name" placeholder="e.g. Colleen" />
        </div>
        <div class="field">
          <label class="label" for="description">
            description
          </label>
          <input name="description" class="input" type="text" v-model="editingHero.description" placeholder="dance fight!" />
        </div>
      </div>
    </div>
    <footer class="card-footer ">
      <ButtonFooter class="card-footer-item" :className="'cancel-button'" :iconClasses="'fas fa-undo'" @clicked="clear" label="Cancel" :item="editingHero"></ButtonFooter>
      <ButtonFooter class="card-footer-item" :className="'save-button'" :iconClasses="'fas fa-save'" @clicked="saveHero" label="Save" :item="editingHero"></ButtonFooter>
    </footer>
  </div>
</template>

<script>
import ButtonFooter from './ButtonFooter.vue';

export default {
  name: 'HeroDetail',
  props: {
    hero: {
      type: Object,
      default() {},
    },
  },
  components: { ButtonFooter },
  data() {
    return {
      addMode: false,
      editingHero: { ...this.hero },
    };
  },
  watch: {
    hero() {
      // newHero, originalHero) {
      if (this.hero && this.hero.id) {
        this.editingHero = { ...this.hero };
        this.addMode = false;
      } else {
        this.editingHero = { id: undefined, name: '', description: '' };
        this.addMode = true;
      }
    },
  },
  methods: {
    clear() {
      this.$emit('unselect');
    },
    saveHero() {
      this.$emit('save', this.editingHero);
      this.clear();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
