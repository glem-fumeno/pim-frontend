<script setup lang="ts">
import type { ModelRef } from "vue";

defineProps<{
  value: string;
  disabled?: boolean;
  label?: string;
}>();

const selected: ModelRef<string> = defineModel({ required: true });
</script>

<template>
  <label :class="{ disabled, selected: selected === value }">
    <div class="icon">
      <div></div>
    </div>
    <input type="radio" v-model="selected" :value :disabled />
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
  border-radius: 50%;
}

.icon div {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.selected .icon div {
  background-color: var(--color-primary);
}
</style>
