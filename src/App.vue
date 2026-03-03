<template>
  <div id="app">
    <layout />
  </div>
</template>

<script>
import Layout from "./views/Layout.vue";
export default {
  mounted() {
    document.body.classList.add("page", "page-home", "preload");
  },
  components: {
    Layout,
  },
};
</script>

<style>
@import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css";

#app {
  width: 100%;
}
</style>
