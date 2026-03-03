<template>
  <div class="home">
    <section class="center padding">
      <div class="margin-bottom max-width-m text-center">
        <h3>WP GENERATOR</h3>
        <p class="lead">
          Build awesome plugin starter with modern PHP 8.2 & WP 6.9+ structure.
        </p>
      </div>

      <div class="container-fluid p-0">
        <div class="row g-4">
          <div class="col-md-8">
            <div class="form-wpgen text-left">
              <form-inputs />
            </div>
          </div>
          <div class="col-md-4">
            <generated-files-tree />
            <button
              class="btn btn-primary w-100 mt-4"
              @click.prevent="makeZip"
              v-if="$store.state.general.pluginName !== ''"
            >
              Download Plugin ZIP
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import JSZip from "jszip";
import { saveAs } from "file-saver";
import FormInputs from "@/components/FormInputs/index.vue";
import GeneratedFilesTree from "@/components/GeneratedFilesTree/index.vue";
import { buildZipTree } from "../utils/buildtree";
import { slug } from "../utils/helpers";

export default {
  name: "Home",
  components: {
    FormInputs,
    GeneratedFilesTree,
  },
  methods: {
    async makeZip() {
      const zip = new JSZip();
      const zipname = slug(this.$store.getters.pluginName);
      const tree = this.$store.getters.filesTree;
      buildZipTree(tree, zip);

      zip.generateAsync({ type: "blob" }).then(
        (blob) => {
          saveAs(blob, `${zipname}.zip`);
        },
        (err) => {
          console.error(err);
        }
      );
    },
  },
};
</script>

<style scoped></style>
