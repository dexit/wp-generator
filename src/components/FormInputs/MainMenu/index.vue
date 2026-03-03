<template>
  <card sectionName="Main Menu (Optional)">
    <div class="row">
      <!-- Menu Title -->
      <text-input
        label="Menu Title"
        objkey="menuTitle"
        :parent="'mainMenu'"
        placeholder="Weather"
      />

      <!-- Page Title -->
      <text-input
        label="Page Title"
        objkey="pageTitle"
        :parent="'mainMenu'"
        placeholder="Weather"
      />

      <!-- Capability -->
      <text-input
        label="Capability"
        objkey="capability"
        :parent="'mainMenu'"
        placeholder="manage_options"
      />

      <!-- Menu Slug -->
      <text-input
        label="Menu Slug"
        objkey="pageSlug"
        convert-case="slug"
        :parent="'mainMenu'"
        placeholder="wf-weather"
      />
    </div>
  </card>
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

<style scoped></style>
