<template>
  <card sectionName="Gutenberg Blocks (React)">
    <div class="row">
      <div class="col-md-6">
        <div class="form-check mb-3">
          <input class="form-check-input" type="checkbox" v-model="hasBlocks" id="hasBlocks">
          <label class="form-check-label" for="hasBlocks">
            Include Block Support
          </label>
        </div>
      </div>
    </div>
    <div v-if="hasBlocks">
       <div class="row">
          <div class="col-md-6">
            <form-text-input label="Block Name" v-model="blockName" placeholder="example-block" />
          </div>
          <div class="col-md-6">
            <form-text-input label="Block Title" v-model="blockTitle" placeholder="Example Block" />
          </div>
       </div>
    </div>
  </card>
</template>

<script>
import FormTextInput from "@/components/Common/FormTextInput.vue";
import card from "../card.vue";

export default {
  components: { FormTextInput, card },
  computed: {
    hasBlocks: {
      get() { return this.$store.state.hasBlocks; },
      set(val) { this.$store.dispatch("setHasBlocks", val); }
    },
    blockName: {
      get() { return this.$store.state.blockName; },
      set(val) { this.$store.dispatch("setBlockName", val); }
    },
    blockTitle: {
      get() { return this.$store.state.blockTitle; },
      set(val) { this.$store.dispatch("setBlockTitle", val); }
    }
  }
};
</script>
