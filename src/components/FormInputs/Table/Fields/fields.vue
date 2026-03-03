<template>
  <div class="border-bottom mb-3 pb-3">
    <div class="row">
      <div class="col-md-2">
        <form-text-input
          label="Table Field Key"
          v-model="name"
        />
      </div>

      <div class="col-md-2">
        <div class="form-group">
          <label for="type">Type</label>
          <select id="type" name="type" v-model="type" class="form-select">
            <option value="INT">INT</option>
            <option value="FLOAT">FLOAT</option>
            <option value="VARCHAR">VARCHAR</option>
            <option value="TEXT">TEXT</option>
            <option value="DATE">DATE</option>
            <option value="DATETIME">DATETIME</option>
            <option value="TIMESTAMP">TIMESTAMP</option>
          </select>
        </div>
      </div>

      <div class="col-md-2">
        <form-text-input
          label="Length"
          v-model="length"
          :disabled="disable"
        />
      </div>

      <div class="col-md-1">
        <div class="form-check mt-4">
          <input :id="id" class="form-check-input" type="checkbox" v-model="nullable" />
          <label :for="id" class="form-check-label">Nullable</label>
        </div>
      </div>

      <div class="col-md-1">
        <div class="form-check mt-4">
          <input :id="primaryKeyId" class="form-check-input" type="checkbox" v-model="primary_key" />
          <label :for="primaryKeyId" class="form-check-label">PK</label>
        </div>
      </div>

      <div class="col-md-2">
        <form-text-input
          label="Default"
          v-model="defaultValue"
        />
      </div>

      <div class="col-md-2 d-flex align-items-end">
        <div class="form-check mb-2 me-3" v-if="adminPanel">
          <input
            :id="'show-admin-panel' + index + '-' + fieldIndex"
            class="form-check-input"
            type="checkbox"
            v-model="showInCrudForm"
          />
          <label :for="'show-admin-panel' + index + '-' + fieldIndex" class="form-check-label">CRUD Form</label>
        </div>
        <button
          class="btn btn-danger btn-sm mb-2"
          role="button"
          @click.prevent="delField"
        >
          <i class="fas fa-times"></i>
        </button>
      </div>
    </div>

    <admin-panel-form-settings
      v-if="showInCrudForm"
      :index="index"
      :field-index="fieldIndex"
    />
  </div>
</template>

<script>
import FormTextInput from "../../../Common/FormTextInput.vue";
import { mapGetters } from "vuex";
import { slug } from "../../../../utils/helpers";
import AdminPanelFormSettings from "./adminPanelFormSettings.vue";

export default {
  props: {
    index: {
      type: Number,
      default: 0,
    },
    fieldIndex: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      id: Math.random().toString(36).substr(2, 9),
      primaryKeyId: Math.random().toString(36).substr(2, 9),
      disable: false,
    };
  },
  components: {
    FormTextInput,
    AdminPanelFormSettings,
  },
  computed: {
    ...mapGetters(["tables"]),
    adminPanel() {
      return this.tables[this.index].settings.adminPanel;
    },
    name: {
      get() { return this.getData("name"); },
      set(val) { this.setData("name", val); },
    },
    type: {
      get() { return this.getData("type"); },
      set(val) {
        this.setData("type", val, false);
        this.makeDisable();
      },
    },
    length: {
      get() { return this.getData("length"); },
      set(val) {
        if (this.type === "TEXT") val = "";
        this.setData("length", val);
      },
    },
    nullable: {
      get() { return this.getData("nullable"); },
      set(val) { this.setData("nullable", val, false); },
    },
    primary_key: {
      get() { return this.getData("primary_key"); },
      set(val) { this.setData("primary_key", val, false); },
    },
    defaultValue: {
      get() { return this.getData("default"); },
      set(val) { this.setData("default", val); },
    },
    showInCrudForm: {
      get() { return this.getData("showInCrudForm"); },
      set(val) { this.setData("showInCrudForm", val, false); },
    },
  },
  methods: {
    getData(key) {
      return this.tables[this.index].fields[this.fieldIndex][key];
    },
    setData(key, value, slugCase = true) {
      value = slugCase ? slug(value, "_") : value;
      this.$store.dispatch("setTableFieldData", {
        index: this.index,
        fieldIndex: this.fieldIndex,
        key: key,
        value: value,
      });
    },
    delField() {
      this.$store.dispatch("deleteTableField", {
        index: this.index,
        fieldIndex: this.fieldIndex,
      });
    },
    makeDisable() {
      if (
        this.type === "TEXT" ||
        this.type === "DATE" ||
        this.type === "DATETIME" ||
        this.type === "TIMESTAMP"
      ) {
        this.length = "";
        this.disable = true;
      } else {
        this.disable = false;
      }
    },
  },
};
</script>

<style scoped>
.form-check {
  padding-top: 10px;
}
</style>
