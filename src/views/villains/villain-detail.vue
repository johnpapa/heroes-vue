<template>
  <div class="card edit-detail">
    <header class="card-header">
      <p class="card-header-title">{{ editingVillain.name }}</p>
    </header>
    <div class="card-content">
      <div class="content">
        <div class="field" v-if="editingVillain.id">
          <label class="label" for="id"> id </label>
          <input
            name="id"
            class="input"
            type="text"
            v-model="editingVillain.id"
            placeholder="e.g. VillainColleen"
            readOnly
          />
        </div>
        <div class="field">
          <label class="label" for="name"> name </label>
          <input
            name="name"
            class="input"
            type="text"
            v-model="editingVillain.name"
            placeholder="e.g. Colleen"
          />
        </div>
        <div class="field">
          <label class="label" for="description"> description </label>
          <input
            name="description"
            class="input"
            type="text"
            v-model="editingVillain.description"
            placeholder="dance fight!"
          />
        </div>
      </div>
    </div>
    <footer class="card-footer ">
      <ButtonFooter
        class="card-footer-item"
        :className="'cancel-button'"
        :iconClasses="'fas fa-undo'"
        @clicked="clear"
        label="Cancel"
        :item="editingVillain"
      ></ButtonFooter>
      <ButtonFooter
        class="card-footer-item"
        :className="'save-button'"
        :iconClasses="'fas fa-save'"
        @clicked="saveVillain"
        label="Save"
        :item="editingVillain"
      ></ButtonFooter>
    </footer>
  </div>
</template>

<script>
import ButtonFooter from '@/components/button-footer.vue';

export default {
  name: 'VillainDetail',
  props: {
    villain: {
      type: Object,
      default() {},
    },
  },
  components: { ButtonFooter },
  data() {
    return {
      addMode: false,
      editingVillain: { ...this.villain },
    };
  },
  watch: {
    villain() {
      // newVillain, originalVillain) {
      if (this.villain && this.villain.id) {
        this.editingVillain = { ...this.villain };
        this.addMode = false;
      } else {
        this.editingVillain = { id: undefined, name: '', description: '' };
        this.addMode = true;
      }
    },
  },
  methods: {
    clear() {
      this.$emit('unselect');
    },
    saveVillain() {
      this.$emit('save', this.editingVillain);
      this.clear();
    },
  },
};
</script>

<style lang="scss" scoped></style>
