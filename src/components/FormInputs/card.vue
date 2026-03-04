<template>
  <div class="card mb-3">
    <div
      class="card-header cursor-pointer"
      data-bs-toggle="collapse"
      :data-bs-target="'#' + divid"
      aria-expanded="true"
      :aria-controls="divid"
    >
      {{ sectionName }}
    </div>

    <div class="card-body collapse show" :id="divid">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    sectionName: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      divid: "",
    };
  },
  mounted() {
    this.divid = 'card-' + Math.random().toString(36).substr(2, 9);
  },
};
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
