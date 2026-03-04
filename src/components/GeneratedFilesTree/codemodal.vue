<template>
  <div
    class="modal fade"
    id="codeModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="codeModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="codeModalLabel">
            {{ $store.getters.pluginName }} - {{ $store.getters.activeFileName }}
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body text-left">
          <div class="container-fluid">
            <div class="row">
              <div class="col-md-3">
                <div class="tree_area">
                  <ul class="tree-list">
                    <tree-item
                      v-for="(item, index) in $store.state.fileArchitecture"
                      :key="index"
                      :item="item"
                      @item-click="itemClick"
                    />
                  </ul>
                </div>
              </div>

              <div class="col-md-9">
                <copy-button />
                <div ref="editorContainer" class="monaco-editor-container"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as monaco from 'monaco-editor';
import TreeItem from "./TreeItem.vue";
import CopyButton from "@/components/Common/CopyButton.vue";

export default {
  components: {
    TreeItem,
    CopyButton,
  },
  data() {
    return {
      editor: null,
    };
  },
  computed: {
    activeCode() {
      return this.$store.getters.activeFileCodes;
    },
    activeFileName() {
      return this.$store.getters.activeFileName;
    }
  },
  watch: {
    activeCode(newCode) {
      if (this.editor) {
        this.editor.setValue(newCode);
        const language = this.getLanguage(this.activeFileName);
        monaco.editor.setModelLanguage(this.editor.getModel(), language);
      }
    },
  },
  mounted() {
    this.initEditor();
  },
  beforeUnmount() {
    if (this.editor) {
      this.editor.dispose();
    }
  },
  methods: {
    initEditor() {
      this.editor = monaco.editor.create(this.$refs.editorContainer, {
        value: this.activeCode,
        language: this.getLanguage(this.activeFileName),
        theme: 'vs-dark',
        automaticLayout: true,
        readOnly: true,
        fontSize: 14,
      });
    },
    getLanguage(filename) {
      if (!filename) return 'php';
      const ext = filename.split('.').pop();
      switch (ext) {
        case 'php': return 'php';
        case 'js': return 'javascript';
        case 'json': return 'json';
        case 'css': return 'css';
        case 'md': return 'markdown';
        default: return 'plaintext';
      }
    },
    itemClick(item) {
      if (item.file && item.value) {
        this.$store.dispatch("setActiveFileName", item.text);
        this.$store.dispatch("setActiveFileCodes", item.value);
      }
    },
  },
};
</script>

<style scoped>
@media (min-width: 992px) {
  .modal-lg {
    max-width: 95%;
  }
}
.tree_area {
  max-height: 70vh;
  overflow-y: auto;
}
.monaco-editor-container {
  width: 100%;
  height: 70vh;
  border-radius: 4px;
}
</style>
