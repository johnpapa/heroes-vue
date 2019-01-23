<template>
  <div class="card-content">
    <div class="content">
      <div class="name">{{ name }}</div>
      <div class="description">{{ description }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardContent',
  props: {
    name: {
      type: String,
      default: () => '',
    },
    description: {
      type: String,
      default: () => '',
    },
  },
};
</script>

<style lang="scss"></style>
