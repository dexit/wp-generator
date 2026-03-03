<template>
  <card sectionName="Custom Post Types">
    <div v-for="(pt, index) in postTypes" :key="index" class="border-bottom mb-2 pb-2">
      <div class="row">
        <div class="col-md-4">
          <form-text-input label="Post Type Key" v-model="pt.name" placeholder="book" />
        </div>
        <div class="col-md-4">
          <form-text-input label="Singular Name" v-model="pt.singular" placeholder="Book" />
        </div>
        <div class="col-md-4">
          <form-text-input label="Plural Name" v-model="pt.plural" placeholder="Books" />
        </div>
      </div>
      <button class="btn btn-danger btn-sm mb-2" @click="remove(index)">Remove</button>
    </div>
    <button class="btn btn-primary btn-sm" @click="add">Add Post Type</button>
  </card>
</template>

<script>
import FormTextInput from "@/components/Common/FormTextInput.vue";
import card from "../card.vue";

export default {
  components: { FormTextInput, card },
  computed: {
    postTypes() { return this.$store.state.postTypes; }
  },
  methods: {
    add() { this.$store.dispatch("addPostType"); },
    remove(index) { this.$store.dispatch("removePostType", index); }
  }
};
</script>
