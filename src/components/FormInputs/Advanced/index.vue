<template>
  <div>
    <card sectionName="Advanced">
      <div class="row">
        <text-input
          label="Base Namespace"
          objkey="baseNamespace"
          convert-case="title"
          helptext="Plugin initial namespace. ex: WPGenerator\Weather"
          placeholder="WPGenerator\Weather"
        />

        <text-input
          label="Main Class Name"
          objkey="mainClassName"
          convert-case="title"
          helptext="Main class name of the plugin. ex: Weather"
          placeholder="Weather"
        />

        <text-input
          label="Constant Prefix"
          objkey="constantPrefix"
          convert-case="slug"
          separator="_"
          helptext="Plugin constant prefix. ex: WF_WEATHER"
          placeholder="WF_WEATHER"
        />

        <text-input
          label="Function Prefix"
          objkey="functionPrefix"
          convert-case="slug"
          separator="_"
          helptext="Plugin function prefix. ex: wf_get_weather"
          placeholder="wf_get_weather"
        />
      </div>
    </card>
  </div>
</template>

<script>
import textInput from "../textInput.vue";
import card from "../card.vue";
export default {
  components: {
    textInput,
    card,
  },
};
</script>

<style lang="scss" scoped></style>
