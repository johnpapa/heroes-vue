<script lang="ts">
import {
  defineComponent,
  PropType,
  reactive,
  SetupContext,
  toRefs,
  watch,
} from 'vue';
import ButtonFooter from '@/components/button-footer.vue';
import { Hero } from '@/store/modules/models';

interface Props {
  hero: Hero;
}

interface ComponentState {
  addMode: boolean;
  editingHero: Hero;
}

export default defineComponent({
  name: 'HeroDetail',
  props: {
    hero: {
      type: Object as PropType<Hero>,
      default: () => new Hero(''),
    },
  },
  components: { ButtonFooter },
  setup(props: Props, { emit }: SetupContext) {
    const { hero } = toRefs(props);
    const state: ComponentState = reactive({
      addMode: false,
      editingHero: { ...hero.value },
    });

    watch(hero, (/* newValue, oldValue */) => {
      if (hero.value && hero.value.id) {
        state.editingHero = { ...hero.value };
        state.addMode = false;
      } else {
        state.editingHero = {
          id: '',
          name: '',
          description: '',
        };
        state.addMode = true;
      }
    });

    function clear() {
      emit('unselect');
    }

    function saveHero() {
      emit('save', state.editingHero);
      clear();
    }

    return { ...state, clear, saveHero };
  },
});
</script>

<template>
  <div class="card edit-detail">
    <header class="card-header">
      <p class="card-header-title">{{ editingHero.name }}</p>
    </header>
    <div class="card-content">
      <div class="content">
        <div class="field" v-if="editingHero.id">
          <label class="label" for="id">id</label>
          <input
            class="input"
            name="id"
            placeholder="e.g. HeroColleen"
            readonly
            type="text"
            v-model="editingHero.id"
          />
        </div>
        <div class="field">
          <label class="label" for="name">name</label>
          <input
            class="input"
            name="name"
            placeholder="e.g. Colleen"
            type="text"
            v-model="editingHero.name"
          />
        </div>
        <div class="field">
          <label class="label" for="description">description</label>
          <input
            class="input"
            name="description"
            placeholder="dance fight!"
            type="text"
            v-model="editingHero.description"
          />
        </div>
      </div>
    </div>
    <footer class="card-footer">
      <ButtonFooter
        class="card-footer-item"
        label="Cancel"
        :className="'cancel-button'"
        :iconClasses="'fas fa-undo'"
        :item="editingHero"
        @clicked="clear"
      ></ButtonFooter>
      <ButtonFooter
        class="card-footer-item"
        label="Save"
        :className="'save-button'"
        :iconClasses="'fas fa-save'"
        :item="editingHero"
        @clicked="saveHero"
      ></ButtonFooter>
    </footer>
  </div>
</template>
