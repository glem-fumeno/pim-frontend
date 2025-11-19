<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
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

const selectElement = ref<HTMLDivElement>();

function toggle() {
  open.value = !open.value;
}

function select(value: string) {
  selected.value = value;
  open.value = false;
  emit("select");
}

const closeWhenClickedOutside = (e: MouseEvent) => {
  if (e.target instanceof Node && !selectElement.value?.contains(e.target)) {
    open.value = false;
  }
};
onMounted(() => document.addEventListener("click", closeWhenClickedOutside));
onUnmounted(() =>
  document.removeEventListener("click", closeWhenClickedOutside),
);
</script>

<template>
  <div class="select" ref="selectElement">
    <div class="fake-length" aria-hidden="true">
      <div v-for="option in options" class="fake-length-item">
        <span>{{ option }}</span>
        <Icon icon="chevron-down" :size="16" />
      </div>
      <div class="fake-length-item">
        <span>{{ placeholder }}</span>
        <span class="arrow">
          <Icon icon="chevron-down" :size="16" />
        </span>
      </div>
    </div>
    <button class="select-button" :class="{ open, selected }" @click="toggle">
      <span v-if="selected === undefined" class="selected-value">
        {{ placeholder }}
      </span>
      <span v-else class="selected-value">
        {{ selected }}
      </span>
      <Icon icon="chevron-up" :size="16" v-if="open" />
      <Icon icon="chevron-down" :size="16" v-else />
    </button>
    <dialog>
      <ul class="select-dropdown" :class="{ open }">
        <li v-for="option in options">
          <button
            class="select-option"
            :class="{ active: selected === option }"
            @click="select(option)">
            {{ option }}
          </button>
        </li>
      </ul>
    </dialog>
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
  --_btn-font: var(--font-content);
}

.fake-length {
  height: 0px;
  visibility: hidden;
  font: var(--_btn-font);
  padding-inline: max(
    var(--_btn-gap) / 2 + var(--_btn-padding-inline),
    var(--_dropdown-padding-inline) + var(--_option-padding-inline)
  );
}

.fake-length-item {
  display: flex;
}

.select-button {
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--_btn-gap);
  width: 100%;
  padding: 12px var(--_btn-padding-inline);
  font: var(--_btn-font);
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
  background-color: transparent;
  width: 100%;
  border: 0;
  text-align: left;
  font: var(--font-content);
}

.select-option:hover {
  background-color: var(--color-surface-3);
}

.select-option.active {
  background-color: var(--color-primary) !important;
  color: var(--color-surface-2);
}
</style>
