<script lang="ts">
import { defineComponent, PropType, SetupContext, toRefs } from 'vue';

interface Props {
  item: Object;
  className: String;
  label: String;
  dataIndex: Number;
  dataId?: Number;
  iconClasses: String;
}

export default defineComponent({
  name: 'ButtonFooter',
  props: {
    item: {
      type: Object as PropType<{}>,
      default: () => {},
    },
    className: {
      type: String,
      default: () => '',
    },
    label: {
      type: String,
      default: () => '',
    },
    dataIndex: {
      type: Number,
      default: () => null,
    },
    dataId: {
      type: Number,
      default: () => null,
    },
    iconClasses: {
      type: String,
      default: () => '',
    },
  },
  setup(props: Props, { emit }: SetupContext) {
    const { item } = toRefs(props);

    function handleClick() {
      emit('clicked', item.value);
    }

    return {
      handleClick,
    };
  },
});
</script>

<template>
  <button
    class="link card-footer-item"
    :class="className"
    :aria-label="label"
    tabindex="0"
    @click="handleClick"
    :data-index="dataIndex"
    :data-id="dataId"
  >
    <i :class="iconClasses"></i>
    <span>{{ label }}</span>
  </button>
</template>
