<template>
  <card sectionName="Assets (Optional)">
    <div class="row">
      <div class="col-md-6">
        <cssfiles />
      </div>

      <div class="col-md-6">
        <jsfiles />
      </div>
    </div>
  </card>
</template>

<script>
import card from "../card.vue";
import cssfiles from "./cssfiles.vue";
import jsfiles from "./jsfiles.vue";
export default {
  components: {
    card,
    cssfiles,
    jsfiles,
  },
};
</script>

<style scoped></style>
