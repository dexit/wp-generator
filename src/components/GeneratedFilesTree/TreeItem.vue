<template>
  <li class="tree-item">
    <div
      class="tree-anchor"
      :class="{ 'tree-selected': isSelected }"
      @click="onClick"
    >
      <i v-if="item.opened" class="far fa-folder-open me-1"></i>
      <i v-else-if="item.children" class="far fa-folder me-1"></i>
      <i v-else-if="item.icon" :class="item.icon + ' me-1'"></i>
      <i v-else class="far fa-file me-1"></i>
      {{ item.text }}
    </div>
    <ul v-if="item.children && item.children.length" class="tree-list">
      <tree-item
        v-for="(child, index) in item.children"
        :key="index"
        :item="child"
        @item-click="$emit('item-click', $event)"
      />
    </ul>
  </li>
</template>

<script>
export default {
  name: 'TreeItem',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  emits: ['item-click'],
  computed: {
    isSelected() {
      return this.$store.state.activeFileName === this.item.text;
    }
  },
  methods: {
    onClick() {
      this.$emit('item-click', this.item);
    }
  }
}
</script>

<style scoped>
.tree-item {
  list-style: none;
  margin: 0;
  padding: 0;
}
.tree-list {
  padding-left: 1.5rem;
}
.tree-anchor {
  display: block;
  padding: 0.25rem 0.5rem;
  cursor: pointer;
  font-size: 13px;
  white-space: nowrap;
}
.tree-anchor:hover {
  background-color: rgba(0, 0, 0, 0.05);
}
.tree-selected {
  background-color: #e1e1e1;
}
</style>
