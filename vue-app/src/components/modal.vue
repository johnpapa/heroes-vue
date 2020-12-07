<script lang="ts">
import { defineComponent, SetupContext } from 'vue';

interface Props {
  message: string;
  isOpen: boolean;
}

export default defineComponent({
  name: 'Modal',
  props: {
    message: {
      type: String,
      default: () => '',
    },
    isOpen: {
      type: Boolean,
      default: () => false,
    },
  },
  setup(props: Props, { emit }: SetupContext) {
    function onNo() {
      emit('handle-no');
    }

    function onYes() {
      emit('handle-yes');
    }

    return {
      onNo,
      onYes,
    };
  },
});
</script>

<template>
  <div id="modal" class="modal" :class="{ 'is-active': isOpen }">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Confirm</p>
      </header>
      <section class="modal-card-body">{{ message }}</section>
      <footer class="modal-card-foot">
        <button class="button modal-no" @click="onNo">No</button>
        <button class="button is-primary modal-yes" @click="onYes">Yes</button>
      </footer>
    </div>
  </div>
</template>
