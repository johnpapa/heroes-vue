<script lang="ts">
import { defineComponent, SetupContext } from 'vue';

interface Props {
  title: string;
  routePath: string;
  showAdd: boolean;
}

export default defineComponent({
  name: 'ListHeader',
  props: {
    title: {
      type: String,
      default: () => '',
    },
    routePath: {
      type: String,
      default: () => '',
    },
    showAdd: {
      type: Boolean,
      default: () => true,
    },
  },
  setup(props: Props, { emit }: SetupContext) {
    function handleAdd() {
      emit('add');
    }

    function handleRefresh() {
      emit('refresh');
    }

    return {
      handleAdd,
      handleRefresh,
    };
  },
});
</script>

<template>
  <div class="content-title-group">
    <router-link :to="routePath">
      <h2 class="title">{{ title }}</h2>
    </router-link>
    <button
      v-if="showAdd"
      class="button add-button"
      @click="handleAdd"
      aria-label="add"
    >
      <i class="fas fa-plus" aria-hidden="true"></i>
    </button>
    <button
      class="button refresh-button"
      @click="handleRefresh"
      aria-label="refresh"
    >
      <i class="fas fa-sync" aria-hidden="true"></i>
    </button>
  </div>
</template>
