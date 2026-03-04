<template>
  <div>
    <!-- Modal -->
    <div
      class="modal fade"
      :id="'settings-modal-' + index"
      tabindex="-1"
      role="dialog"
      :aria-labelledby="'settings-modal-' + index + 'Label'"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" :id="'settings-modal-' + index + 'Label'">
              Table Name: {{ tableData }}
            </h5>

            <ul class="nav nav-pills mb-0 ms-3" id="pills-tab" role="tablist">
              <li class="nav-item">
                <button
                  class="nav-link active"
                  :id="'pills-settings-tab-' + settingsId"
                  data-bs-toggle="pill"
                  :data-bs-target="'#pills-settings-' + settingsId"
                  type="button"
                  role="tab"
                  :aria-controls="'pills-settings-' + settingsId"
                  aria-selected="true"
                  >Settings</button
                >
              </li>
              <li class="nav-item">
                <button
                  class="nav-link"
                  :id="'pills-fields-tab-' + fieldsId"
                  data-bs-toggle="pill"
                  :data-bs-target="'#pills-fields-' + fieldsId"
                  type="button"
                  role="tab"
                  :aria-controls="'pills-fields-' + fieldsId"
                  aria-selected="false"
                  >Fields</button
                >
              </li>
              <li class="nav-item">
                <button
                  class="nav-link"
                  :id="'pills-rest-tab-' + fieldsId"
                  data-bs-toggle="pill"
                  :data-bs-target="'#pills-rest-' + fieldsId"
                  type="button"
                  role="tab"
                  :aria-controls="'pills-rest-' + fieldsId"
                  aria-selected="false"
                  >Rest API</button
                >
              </li>
            </ul>

            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body text-left">
            <div class="">
              <div class="row">
                <div class="col-md-12">
                  <div class="tab-content" id="pills-tabContent">
                    <div
                      class="tab-pane fade show active"
                      :id="'pills-settings-' + settingsId"
                      role="tabpanel"
                      :aria-labelledby="'pills-settings-tab-' + settingsId"
                    >
                      <table-settings :index="index" />
                    </div>

                    <div
                      class="tab-pane fade"
                      :id="'pills-fields-' + fieldsId"
                      role="tabpanel"
                      :aria-labelledby="'pills-fields-tab-' + fieldsId"
                    >
                      <table-fields :index="index" />
                    </div>

                    <div
                      class="tab-pane fade"
                      :id="'pills-rest-' + fieldsId"
                      role="tabpanel"
                      :aria-labelledby="'pills-rest-tab-' + fieldsId"
                    >
                      <rest-api-contents :index="index" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import TableFields from "./Fields/index.vue";
import TableSettings from "./Fields/settings.vue";
import RestApiContents from "@/components/RestApi/settings.vue";
export default {
  props: {
    index: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      settingsId: Math.random().toString(36).substr(2, 9),
      fieldsId: Math.random().toString(36).substr(2, 9),
    };
  },
  components: {
    TableFields,
    TableSettings,
    RestApiContents,
  },
  computed: {
    ...mapGetters(["tables"]),
    tableData() {
      return this.tables[this.index].name;
    },
  },
};
</script>

<style scoped>
@media (min-width: 992px) {
  .modal-lg {
    max-width: 90%;
  }
}
.modal-content {
  min-height: 70vh;
  max-height: 90vh;
}
.nav-link {
  padding: 5px 15px;
}
</style>
