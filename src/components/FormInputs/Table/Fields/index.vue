<template>
  <div>
    <div v-for="(field, fieldIndex) in tables[index].fields" :key="fieldIndex">
      <fields :index="index" :fieldIndex="fieldIndex" />
    </div>

    <button
      class="button button-primary button-s"
      role="button"
      @click.prevent="addnew"
    >
      ADD FIELD
    </button>
  </div>
</template>

<script>
import fields from "./fields.vue";
import { mapGetters } from "vuex";
export default {
  props: {
    index: {
      type: Number,
      default: 0,
    },
  },
  components: {
    fields,
  },
  computed: {
    ...mapGetters(["tables"]),
  },
  methods: {
    addnew() {
      this.$store.dispatch("addNewTableField", {
        index: this.index,
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
