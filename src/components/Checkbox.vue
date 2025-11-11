<script setup lang="ts">
import { computed, type ModelRef } from "vue";

const props = defineProps<{
  value?: string;
  label?: string;
  disabled?: boolean;
}>();

const model: ModelRef<string[] | boolean> = defineModel({ required: true });
const selected = computed(() => {
  return typeof model.value === "boolean"
    ? model.value
    : model.value.includes(props.value!);
});
</script>

<template>
  <label :class="{ disabled, selected }">
    <div class="icon">
      <div></div>
    </div>
    <input type="checkbox" v-model="model" :value :disabled />
    {{ label }}
  </label>
</template>

<style scoped>
.input-group {
  display: grid;
  gap: 4px;
}

input {
  opacity: 0;
  height: 0;
  width: 0;
}

label {
  display: flex;
  align-items: center;
  cursor: pointer;
  max-width: fit-content;
}

.disabled {
  color: var(--color-text-dim);
  cursor: not-allowed;
}

.selected {
  color: var(--color-primary);
}

.disabled .icon {
  border: 2px solid var(--color-text-dim);
}

.icon {
  border: 2px solid var(--color-text);
  width: 16px;
  height: 16px;
  padding: 2px;
  border-radius: 2px;
}

.icon div {
  width: 100%;
  height: 100%;
}

.selected .icon div {
  background-color: var(--color-primary);
}
</style>
