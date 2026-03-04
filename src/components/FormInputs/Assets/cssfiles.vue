<template>
  <div class="row">
    <div class="col-md-12">
      <h6 class="mb-10">Stylesheets (CSS)</h6>

      <div v-for="(item, index) in assets.css" :key="index" class="mb-20">
        <script-input :index="index" type="css" />
      </div>

      <button
        class="button button-primary button-s"
        role="button"
        @click.prevent="addnew"
      >
        ADD
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import scriptInput from "./scriptInput.vue";
export default {
  components: {
    scriptInput,
  },
  computed: {
    ...mapGetters(["assets"]),
  },
  methods: {
    addnew() {
      this.$store.dispatch("addNewAssets", {
        type: "css",
      });
    },
  },
};
</script>

<style scoped></style>
