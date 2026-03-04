<template>
  <div class="row gx-2 mb-2">
    <div class="col-md-3">
      <div class="form-group">
        <label>Handle</label>
        <input type="text" v-model="handle" class="form-control form-control-sm" autocomplete="off" />
      </div>
    </div>
    <div class="col-md-3">
      <div class="form-group">
        <label>File Name</label>
        <input type="text" v-model="filename" class="form-control form-control-sm" autocomplete="off" />
      </div>
    </div>

    <div class="col-md-3">
      <div class="form-group">
        <label>Dependency</label>
        <input type="text" v-model="dependency" class="form-control form-control-sm" autocomplete="off" />
      </div>
    </div>

    <div class="col-md-3 d-flex align-items-end">
      <div class="form-check mb-1" v-if="type === 'js'">
        <input
          :id="'in_footer-' + index"
          class="form-check-input"
          type="checkbox"
          v-model="in_footer"
        />
        <label :for="'in_footer-' + index" class="form-check-label small">Footer</label>
      </div>
    </div>
  </div>
</template>

<script>
import { slug } from "../../../utils/helpers";
import { mapState } from "vuex";

export default {
  props: {
    index: {
      type: Number,
      default: 0,
    },
    type: {
      type: String,
      default: "css",
    },
  },
  computed: {
    ...mapState(["assets"]),
    handle: {
      get() {
        return this.assets[this.type][this.index].handle;
      },
      set(val) {
        this.$store.dispatch("setAssetsData", {
          type: this.type,
          index: this.index,
          key: "handle",
          value: slug(val),
        });
      },
    },
    filename: {
      get() {
        let key = this.type === "css" ? "style" : "script";
        return this.assets[this.type][this.index][key];
      },
      set(val) {
        let key = this.type === "css" ? "style" : "script";
        this.$store.dispatch("setAssetsData", {
          type: this.type,
          index: this.index,
          key: key,
          value: slug(val),
        });
      },
    },
    dependency: {
      get() {
        return this.assets[this.type][this.index].dependency;
      },
      set(val) {
        this.$store.dispatch("setAssetsData", {
          type: this.type,
          index: this.index,
          key: "dependency",
          value: val,
        });
      },
    },
    in_footer: {
      get() {
        return this.assets[this.type][this.index].in_footer;
      },
      set(val) {
        this.$store.dispatch("setAssetsData", {
          type: this.type,
          index: this.index,
          key: "in_footer",
          value: val,
        });
      },
    },
  },
};
</script>

<style scoped>
label {
  font-size: 11px;
  font-weight: bold;
}
</style>
