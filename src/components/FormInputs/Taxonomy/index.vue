<template>
  <card sectionName="Custom Taxonomies">
    <div v-for="(tax, index) in taxonomies" :key="index" class="border-bottom mb-2 pb-2">
      <div class="row">
        <div class="col-md-4">
          <form-text-input label="Taxonomy Key" v-model="tax.name" placeholder="genre" />
        </div>
        <div class="col-md-4">
          <form-text-input label="Singular Name" v-model="tax.singular" placeholder="Genre" />
        </div>
        <div class="col-md-4">
          <form-text-input label="Plural Name" v-model="tax.plural" placeholder="Genres" />
        </div>
      </div>
      <button class="btn btn-danger btn-sm mb-2" @click="remove(index)">Remove</button>
    </div>
    <button class="btn btn-primary btn-sm" @click="add">Add Taxonomy</button>
  </card>
</template>

<script>
import FormTextInput from "@/components/Common/FormTextInput.vue";
import card from "../card.vue";

export default {
  components: { FormTextInput, card },
  computed: {
    taxonomies() { return this.$store.state.taxonomies; }
  },
  methods: {
    add() { this.$store.dispatch("addTaxonomy"); },
    remove(index) { this.$store.dispatch("removeTaxonomy", index); }
  }
};
</script>
