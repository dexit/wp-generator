<template>
  <div class="row">
    <div class="col-md-12">
      <div class="form-check mb-3" v-if="showEnableCheckbox">
        <input class="form-check-input" type="checkbox" v-model="enabled" id="restEnabled">
        <label class="form-check-label" for="restEnabled">
          Enable Rest API
        </label>
      </div>

      <div class="row" v-if="enabled">
        <div class="col-md-4">
          <form-text-input
            label="Class Name"
            placeholder="Example"
            v-model="className"
          />
        </div>
        <div class="col-md-4">
          <form-text-input
            label="Namespace"
            placeholder="wpgenerator/v1"
            v-model="namespace"
          />
        </div>
        <div class="col-md-4">
          <form-text-input
            label="Rest Base"
            placeholder="items"
            v-model="restbase"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FormTextInput from "@/components/Common/FormTextInput.vue";
import { mapGetters } from "vuex";

export default {
  props: {
    index: { type: Number, default: 0 },
    showEnableCheckbox: { type: Boolean, default: true },
    type: { type: String, default: "table" },
  },
  components: { FormTextInput },
  computed: {
    ...mapGetters(["restapi"]),
    enabled: {
      get() { return this.restapi[this.index]?.enabled; },
      set(val) { this.setData("enabled", val); },
    },
    className: {
      get() { return this.restapi[this.index]?.className; },
      set(val) { this.setData("className", val); },
    },
    namespace: {
      get() { return this.restapi[this.index]?.namespace; },
      set(val) { this.setData("namespace", val); },
    },
    restbase: {
      get() { return this.restapi[this.index]?.restbase; },
      set(val) { this.setData("restbase", val); },
    },
  },
  methods: {
    setData(key, value) {
      this.$store.dispatch("setRestApiData", {
        index: this.index,
        key: key,
        value: value,
      });
    },
  },
};
</script>
