<template>
  <div :class="`col-md-${col}`" class="mb-3">
    <div class="form-group">
      <label v-if="label">{{ label }}</label>
      <span class="form-text d-block mb-1" v-if="helptext !== ''">{{ helptext }}</span>

      <input
        type="text"
        v-model="inputData"
        class="form-control"
        autocomplete="off"
        :placeholder="placeholder"
      />
    </div>
  </div>
</template>

<script>
import { slug, titleCase } from "../../utils/helpers";

export default {
  props: {
    col: { type: Number, default: 6 },
    label: { type: String, default: "" },
    objkey: { type: String, default: "" },
    parent: { type: String, default: "general" },
    convertCase: { type: String, default: "" },
    separator: { type: String, default: "" },
    placeholder: { type: String, default: "" },
    helptext: { type: String, default: "" },
  },
  computed: {
    inputData: {
      get() {
        return this.$store.getters[this.parent][this.objkey];
      },
      set(val) {
        if (this.objkey !== "") {
          if (this.convertCase === "slug") {
            val = slug(val, this.separator);
          }
          if (this.convertCase === "title") {
            val = titleCase(val, this.separator);
          }
          if (this.convertCase === "uppercase") {
            val = titleCase(val, this.separator).toUpperCase();
          }

          if (this.parent === 'mainMenu') {
            this.$store.dispatch("setMainMenuData", {
              key: this.objkey,
              value: val,
            });
          } else {
            this.$store.dispatch("setGeneralData", {
              key: this.objkey,
              value: val,
            });
          }
        }
      },
    },
  },
};
</script>
