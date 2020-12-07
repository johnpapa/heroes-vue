<script lang="ts">
import { defineComponent } from 'vue';
import type { SetupContext } from 'vue';
import ButtonFooter from '@/components/button-footer.vue';
import CardContent from '@/components/card-content.vue';
import type { Villain } from '../../store/modules/models';

const captains = console;

interface Props {
  villains: Array<Villain>;
}

export default defineComponent({
  name: 'VillainList',
  props: {
    villains: {
      type: Array as () => Array<Villain>,
      default: () => [],
    },
  },
  components: {
    CardContent,
    ButtonFooter,
  },
  setup(props: Props, { emit }: SetupContext) {
    function deleteVillain(villain: Villain) {
      emit('deleted', villain);
      captains.log(`You tried to delete ${villain.name}`);
    }
    function selectVillain(villain: Villain) {
      captains.log(`You tried to select ${villain.name}`);
      emit('selected', villain);
    }

    return { deleteVillain, selectVillain };
  },
});
</script>

<template>
  <ul class="list">
    <li
      v-for="(villain, index) in villains"
      :key="villain.id"
      role="presentation"
    >
      <div class="card">
        <CardContent :name="villain.name" :description="villain.description" />
        <footer class="card-footer">
          <ButtonFooter
            class="delete-item"
            iconClasses="fas fa-trash"
            @clicked="deleteVillain"
            label="Delete"
            :dataIndex="index"
            :dataId="villain.id"
            :item="villain"
          />
          <ButtonFooter
            class="edit-item"
            iconClasses="fas fa-edit"
            @clicked="selectVillain"
            label="Edit"
            :dataIndex="index"
            :dataId="villain.id"
            :item="villain"
          />
        </footer>
      </div>
    </li>
  </ul>
</template>
