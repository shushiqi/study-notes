<template>
  <div class="container">
    <span>{{ text }}</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
        text:"Vue环境配置"
    };
  },
  mounted() {
    console.log("mounted");
  },
};
</script>

<style>
</style>