<template>
  <div class="generated_files_area">
    <div v-if="$store.state.general.pluginName !== ''" class="tree-container">
      <ul class="tree-list">
        <tree-item
          v-for="(item, index) in $store.state.fileArchitecture"
          :key="index"
          :item="item"
          @item-click="itemClick"
        />
      </ul>
    </div>

    <p v-else><i>No Preview Available</i></p>

    <code-modal v-if="$store.state.general.pluginName !== ''" />
  </div>
</template>

<script>
import CodeModal from "./codemodal.vue";
import TreeItem from "./TreeItem.vue";
import { Modal } from 'bootstrap';

export default {
  components: {
    CodeModal,
    TreeItem
  },
  mounted() {
    this.$store.dispatch("setFileArchitecture", true);
  },
  methods: {
    itemClick(item) {
      this.$store.dispatch("setFileArchitecture", true).then(() => {
        if (item.file) {
          if (item.value) {
            this.$store.dispatch("setActiveFileName", item.text);
            this.$store.dispatch("setActiveFileCodes", item.value);
          }
          const modalElement = document.getElementById('codeModal');
          if (modalElement) {
            const modal = Modal.getOrCreateInstance(modalElement);
            modal.show();
          }
        }
      });
    },
  },
};
</script>

<style scoped>
.generated_files_area {
  padding: 30px 20px;
  background: #f1f1f1;
  border-radius: 3px;
  max-height: 80vh;
  overflow-y: auto;
}
.tree-container {
  text-align: left;
}
.tree-list {
  list-style: none;
  padding-left: 0;
}
</style>
