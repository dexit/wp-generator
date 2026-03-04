<template>
  <div>
    <card sectionName="General">
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label for="name">Plugin Name</label>
            <input
              type="text"
              name="name"
              class="form-control"
              autocomplete="off"
              v-model="pluginName"
            />
          </div>
        </div>

        <text-input label="Plugin URI" objkey="pluginURI" />
        <text-input label="Description" objkey="description" :col="12" />
        <text-input label="Version" objkey="version" />
        <text-input label="Author" objkey="author" />
        <text-input label="Author URI" objkey="authorURI" />
        <text-input label="Author Email" objkey="authorEmail" />
        <text-input label="License" objkey="license" />
        <text-input label="License URI" objkey="licenseURI" />
        <text-input
          label="Text Domain"
          objkey="textDomain"
          convert-case="slug"
        />
        <text-input label="Domain Path" objkey="domainPath" />
      </div>
    </card>
  </div>
</template>

<script>
import textInput from "../textInput.vue";
import card from "../card.vue";

export default {
  name: "General",
  computed: {
    pluginName: {
      get() {
        return this.$store.getters.pluginName;
      },
      set(val) {
        this.$store.dispatch("setPluginName", val);
      },
    },
  },
  components: {
    textInput,
    card,
  },
};
</script>

<style lang="scss" scoped></style>
