<template>
  <div class="form-group mb-3">
    <label v-if="label">{{ label }}</label>
    <span class="form-text d-block mb-1" v-if="helptext !== ''">{{ helptext }}</span>
    <input
      type="text"
      class="form-control"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :disabled="disabled"
      autocomplete="off"
    />
  </div>
</template>

<script>
export default {
  props: {
    label: { type: String, default: "" },
    placeholder: { type: String, default: "" },
    modelValue: { type: [String, Number], default: "" },
    disabled: { type: Boolean, default: false },
    helptext: { type: String, default: "" },
  },
  emits: ['update:modelValue']
};
</script>
