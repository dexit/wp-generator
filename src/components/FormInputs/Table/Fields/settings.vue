<template>
  <div class="row">
    <div class="col-md-3">
      <div class="form-check mt-4 mb-3">
        <input class="form-check-input" type="checkbox" v-model="adminPanel" id="adminPanel">
        <label class="form-check-label" for="adminPanel">
          Admin Panel
        </label>
      </div>
    </div>

    <div class="col-md-9" v-if="adminPanel">
      <div class="row">
        <div class="col-md-6">
          <form-text-input label="CRUD Class Name" v-model="crudClassName" />
        </div>
        <div class="col-md-6">
          <form-text-input label="Menu Title" v-model="menuTitle" />
        </div>
        <div class="col-md-6">
          <form-text-input label="Page Title" v-model="pageTitle" />
        </div>
        <div class="col-md-6">
          <form-text-input label="Capability" v-model="capability" />
        </div>
        <div class="col-md-6">
          <form-text-input label="Page Slug" v-model="pageSlug" />
        </div>
        <div class="col-md-6">
          <form-text-input label="File Name Prefix" v-model="fileNamePrefix" />
        </div>
        <div class="col-md-6">
          <form-text-input label="Nonce Key" v-model="nonceKey" />
        </div>
        <div class="col-md-6">
          <form-text-input label="Submit Button Text" v-model="submitButtonText" />
        </div>
        <div class="col-md-6">
          <form-text-input label="Update Button Text" v-model="updateButtonText" />
        </div>
        <div class="col-md-6">
          <form-text-input label="Submit Name" v-model="submitName" />
        </div>
        <div class="col-md-6">
          <form-text-input label="Singular Name" v-model="singularName" />
        </div>
        <div class="col-md-6">
          <form-text-input label="Plural Name" v-model="pluralName" />
        </div>
        <div class="col-md-6">
          <form-text-input label="No Item Found Text" v-model="noItemFoundText" />
        </div>
        <div class="col-md-6">
          <form-text-input label="Per Page" v-model="perPage" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FormTextInput from "@/components/Common/FormTextInput.vue";
import { mapGetters } from "vuex";
import { slug } from "@/utils/helpers";

export default {
  props: { index: { type: Number, default: 0 } },
  components: { FormTextInput },
  computed: {
    ...mapGetters(["tables"]),
    adminPanel: {
      get() { return this.tables[this.index].settings.adminPanel; },
      set(val) { this.setData("adminPanel", val, false); },
    },
    crudClassName: {
      get() { return this.tables[this.index].settings.crudClassName; },
      set(val) { this.setData("crudClassName", val); },
    },
    menuTitle: {
      get() { return this.tables[this.index].settings.menuTitle; },
      set(val) { this.setData("menuTitle", val, false); },
    },
    pageTitle: {
      get() { return this.tables[this.index].settings.pageTitle; },
      set(val) { this.setData("pageTitle", val, false); },
    },
    capability: {
      get() { return this.tables[this.index].settings.capability; },
      set(val) { this.setData("capability", val, false); },
    },
    pageSlug: {
      get() { return this.tables[this.index].settings.pageSlug; },
      set(val) { this.setData("pageSlug", val); },
    },
    fileNamePrefix: {
      get() { return this.tables[this.index].settings.fileNamePrefix; },
      set(val) { this.setData("fileNamePrefix", val); },
    },
    nonceKey: {
      get() { return this.tables[this.index].settings.nonceKey; },
      set(val) { this.setData("nonceKey", val); },
    },
    submitButtonText: {
      get() { return this.tables[this.index].settings.submitButtonText; },
      set(val) { this.setData("submitButtonText", val, false); },
    },
    updateButtonText: {
      get() { return this.tables[this.index].settings.updateButtonText; },
      set(val) { this.setData("updateButtonText", val, false); },
    },
    submitName: {
      get() { return this.tables[this.index].settings.submitName; },
      set(val) { this.setData("submitName", val); },
    },
    singularName: {
      get() { return this.tables[this.index].settings.singularName; },
      set(val) { this.setData("singularName", val); },
    },
    pluralName: {
      get() { return this.tables[this.index].settings.pluralName; },
      set(val) { this.setData("pluralName", val); },
    },
    noItemFoundText: {
      get() { return this.tables[this.index].settings.noItemFoundText; },
      set(val) { this.setData("noItemFoundText", val, false); },
    },
    perPage: {
      get() { return this.tables[this.index].settings.perPage; },
      set(val) { this.setData("perPage", val, false); },
    },
  },
  methods: {
    setData(key, value, slugCase = true) {
      if (slugCase) value = slug(value, "-");
      const settings = { ...this.tables[this.index].settings, [key]: value };
      this.$store.dispatch("setTableData", { index: this.index, key: "settings", value: settings });
    },
  },
};
</script>
