<script setup lang="ts">
import { ref } from "vue";
import Icon from "@/components/Icon.vue";

defineProps<{
  options: string[];
  placeholder?: string;
}>();

const emit = defineEmits<{
  select: [];
}>();

const open = ref<boolean>(false);

const selected = defineModel<string>();

function toggle() {
  open.value = !open.value;
}

function select(value: string) {
  selected.value = value;
  open.value = false;
  emit("select");
}
</script>

<template>
  <div class="select">
    <div class="fake-length">
      <div v-for="option in options">
        {{ option }}
        <span class="arrow">
          <Icon icon="chevron-down" />
        </span>
      </div>
      <div>
        {{ placeholder }}
      </div>
    </div>
    <button class="select-button" :class="{ open, selected }" @click="toggle">
      <span v-if="selected === undefined" class="selected-value">
        {{ placeholder }}
      </span>
      <span v-else class="selected-value">
        {{ selected }}
      </span>
      <Icon icon="chevron-down" :size="16" />
    </button>
    <ul class="select-dropdown" :class="{ open }">
      <li
        v-for="option in options"
        class="select-option"
        :class="{ active: selected === option }"
        @click="select(option)">
        {{ option }}
      </li>
    </ul>
  </div>
</template>

<style>
.select {
  position: relative;
  display: inline-block;

  --_btn-padding-inline: 8px;
  --_dropdown-padding-inline: 2px;
  --_option-padding-inline: 4px;
  --_btn-gap: 8px;
}

.fake-length {
  height: 0px;
  visibility: hidden;
  padding-inline: max(
    var(--_btn-gap) + 2 * var(--_btn-padding-inline),
    2 * var(--_dropdown-padding-inline) + 2 * var(--_option-padding-inline)
  );
}

.select-button {
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--_btn-gap);
  width: 100%;
  padding: 12px var(--_btn-padding-inline);
  font: var(--font-content);
  background-color: var(--color-surface-1);
  border: 0;
  border-bottom: 2px solid var(--color-text-dim);
  border-radius: 2px;
  cursor: pointer;
  color: var(--color-text-dim);
}

.select-button.open {
  border-color: var(--color-primary);
}

.select-button.selected {
  color: inherit;
}

.select-dropdown {
  box-sizing: border-box;
  display: none;
  position: absolute;
  z-index: 1;
  left: 0;
  top: 100%;
  list-style-type: none;
  width: 100%;
  padding: 2px var(--_dropdown-padding-inline);
  border-radius: 2px;
  margin: 0;
  background-color: var(--color-surface-2);
}

.select-dropdown.open {
  display: initial;
}

.select-option {
  cursor: pointer;
  padding: 8px var(--_option-padding-inline);
  user-select: none;
}

.select-option:hover {
  background-color: var(--color-surface-3);
}

.select-option.active {
  background-color: var(--color-primary) !important;
  color: var(--color-surface-2);
}
</style>
