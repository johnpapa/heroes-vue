export const unselector = {
  methods: {
    clear: function() {
      this.$emit('unselect');
    },
  },
};

export const containerMethods = {
  methods: {
    clear: function() {
      this.selected = null;
    },
    closeModal: function() {
      this.showModal = false;
    },
    enableAddMode() {
      this.selected = {};
    },
  },
};
