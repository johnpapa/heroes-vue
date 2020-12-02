export const unselector = {
  methods: {
    clear() {
      this.$emit('unselect');
    },
  },
};

export const containerMethods = {
  methods: {
    clear() {
      this.selected = null;
    },
    closeModal() {
      this.showModal = false;
    },
    enableAddMode() {
      this.selected = {};
    },
  },
};
