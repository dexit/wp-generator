<template>
  <div class="d-flex justify-content-between">
    <button class="btn btn-outline-primary mb-2 btn-sm" @click="downloadFile">
      Download File
    </button>

    <button
      class="btn btn-outline-primary mb-2 btn-sm"
      :class="{ 'btn-success': copy }"
      @click="copyToClipboard"
    >
      {{ copyText }}
    </button>
  </div>
</template>

<script>
import useClipboard from 'vue-clipboard3';

export default {
  data() {
    return {
      copy: false,
      copyText: "Copy To Clipboard",
    };
  },
  setup() {
    const { toClipboard } = useClipboard();
    return { toClipboard };
  },
  computed: {
    activeCode() {
      return this.$store.getters.activeFileCodes;
    },
  },
  methods: {
    async copyToClipboard() {
      try {
        await this.toClipboard(this.activeCode);
        this.copy = true;
        this.copyText = "Copied to clipboard";

        setTimeout(() => {
          this.copyText = "Copy To Clipboard";
          this.copy = false;
        }, 1000);
      } catch (e) {
        console.error(e);
      }
    },
    downloadFile() {
      const element = document.createElement("a");
      element.setAttribute(
        "href",
        "data:text/plain;charset=utf-8," +
          encodeURIComponent(this.$store.getters.activeFileCodes)
      );
      element.setAttribute("download", this.$store.getters.activeFileName);

      element.style.display = "none";
      document.body.appendChild(element);

      element.click();

      document.body.removeChild(element);
    },
  },
};
</script>

<style scoped>
</style>
