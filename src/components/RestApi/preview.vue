<template>
  <div
    class="modal fade"
    id="restPreviewModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="restPreviewModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="restPreviewModalLabel">REST API Preview</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body text-left">
          <copy-button />
          <div ref="restEditorContainer" style="width: 100%; height: 70vh;"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as monaco from 'monaco-editor';
import CopyButton from "@/components/Common/CopyButton.vue";

export default {
  components: { CopyButton },
  data() { return { editor: null }; },
  computed: {
    activeCode() { return this.$store.getters.activeFileCodes; }
  },
  watch: {
    activeCode(newCode) {
      if (this.editor) this.editor.setValue(newCode);
    }
  },
  mounted() {
    this.editor = monaco.editor.create(this.$refs.restEditorContainer, {
      value: this.activeCode,
      language: 'php',
      theme: 'vs-dark',
      automaticLayout: true,
      readOnly: true
    });
  },
  beforeUnmount() {
    if (this.editor) this.editor.dispose();
  }
};
</script>
