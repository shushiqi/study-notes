<template>
  <div class="">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Array,
      default: [],
    },
  },
  provide() {
    return {
      collapse: this,
    };
  },
  created() {
    this.$on("my-collapse-item-click", (item) => {
      let index = this.value.indexOf(item.name);
      if (index > -1) {
        this.value.splice(index, 1);
      } else {
        this.value.push(item.name);
      }
    });
  },
};
</script>

<style>
</style>