<script lang="ts">
import { computed, defineComponent, onMounted, reactive, toRefs } from 'vue';

import ListHeader from '@/components/list-header.vue';
import Modal from '@/components/modal.vue';
import VillainDetail from './villain-detail.vue';
import VillainList from './villain-list.vue';
import { useVillains } from './use-villains';
import { Villain } from '../../store/modules/models';
import store from '../../store';

const captains = console;

interface ComponentState {
  errorMessage: string;
  villainToDelete: Villain | null;
  message: string;
  routePath: string;
  selected: Villain | null;
  showModal: boolean;
  title: string;
  villains: Villain[];
}

export default defineComponent({
  name: 'Villains',
  data() {
    return {
      villainToDelete: null,
      message: '',
      routePath: '/villains',
      selected: null,
      showModal: false,
      title: 'Villains',
    };
  },
  components: {
    ListHeader,
    VillainList,
    VillainDetail,
    Modal,
  },
  setup() {
    const {
      deleteVillainAction,
      getVillainsAction,
      updateVillainAction,
      addVillainAction,
    } = useVillains();

    const state: ComponentState = reactive({
      errorMessage: '',
      message: '',
      villainToDelete: null,
      routePath: '/villains',
      selected: null,
      showModal: false,
      title: 'villains',
      villains: computed(() => store.getters.villains as Villain[]),
    });

    onMounted(async () => getVillains());

    function clear() {
      state.selected = null;
    }

    function closeModal() {
      state.showModal = false;
    }

    function enableAddMode() {
      state.selected = new Villain('');
    }

    function askToDelete(villain: Villain) {
      state.villainToDelete = villain;
      state.showModal = true;
      if (state.villainToDelete.name) {
        state.message = `Would you like to delete ${state.villainToDelete.name}?`;
      }
    }

    async function deleteVillain() {
      closeModal();
      if (state.villainToDelete) {
        captains.log(
          `You said you want to delete ${state.villainToDelete.name}`
        );
        await deleteVillainAction(state.villainToDelete);
      }
      clear();
    }

    async function getVillains() {
      state.errorMessage = '';
      try {
        await getVillainsAction();
      } catch (error) {
        captains.error(error);
        state.errorMessage = 'Unauthorized';
      }
    }

    async function save(villain: Villain) {
      captains.log('villain changed', villain);
      if (villain.id) {
        await updateVillainAction(villain);
      } else {
        await addVillainAction(villain);
      }
    }

    function select(villain: Villain) {
      state.selected = villain;
    }

    return {
      ...toRefs(state),
      askToDelete,
      clear,
      closeModal,
      deleteVillain,
      enableAddMode,
      getVillains,
      save,
      select,
    };
  },
});
</script>

<template>
  <div class="content-container">
    <ListHeader
      :title="title"
      @refresh="getVillains"
      @add="enableAddMode"
      :routePath="routePath"
    ></ListHeader>
    <div class="columns is-multiline is-variable">
      <div class="column is-8" v-if="villains">
        <VillainList
          v-if="!selected"
          :villains="villains"
          @selected="select($event)"
          @deleted="askToDelete($event)"
        ></VillainList>
        <VillainDetail
          v-if="selected"
          :villain="selected"
          @unselect="clear"
          @save="save"
        ></VillainDetail>
      </div>
    </div>

    <Modal
      class="modal-villain"
      :message="message"
      :isOpen="showModal"
      @handleNo="closeModal"
      @handleYes="deleteVillain"
    ></Modal>
  </div>
</template>
