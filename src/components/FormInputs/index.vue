<template>
  <div>
    <general />
    <advanced />
    <main-menu />
    <post-type />
    <taxonomy />
    <blocks />
    <assets />
    <tables />
  </div>
</template>

<script>
import General from "./General/index.vue";
import Advanced from "./Advanced/index.vue";
import MainMenu from "./MainMenu/index.vue";
import PostType from "./PostType/index.vue";
import Taxonomy from "./Taxonomy/index.vue";
import Blocks from "./Blocks/index.vue";
import Assets from "./Assets/index.vue";
import Tables from "./Table/index.vue";

export default {
  components: {
    General,
    Advanced,
    MainMenu,
    PostType,
    Taxonomy,
    Blocks,
    Assets,
    Tables,
  },
};
</script>

<style lang="scss" scoped></style>
