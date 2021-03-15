<template>
  <div class="container" @click="isContentShow">
    <div class="header">
      <h4>{{ title }}</h4>
    </div>
    <div class="content" v-show="contentShow">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  inject: ["collapse"],
  props: {
    title: {
      type: String,
      default: "",
    },
    name: {
      type: [String, Number],
      default: "",
    },
  },
  data() {
    return {
      //   contentShow: false,
    };
  },
  computed: {
    contentShow: function () {
      return this.collapse.value.indexOf(this.name) > -1;
    },
  },
  methods: {
    isContentShow() {
      this.collapse.$emit("my-collapse-item-click", this);
    },
  },
  created() {},
};
</script>

<style>
</style>