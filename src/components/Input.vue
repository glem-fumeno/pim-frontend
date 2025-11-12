<script setup lang="ts">
import { computed, type ModelRef } from "vue";
import Icon from "@/components/Icon.vue";

const props = defineProps<{
  disabled?: boolean;
  label?: string;
  placeholder?: string;
  errorMessage?: string;
}>();

const emit = defineEmits<{
  clear: [];
}>();

const value: ModelRef<string> = defineModel({ default: "" });

const error = computed(() => {
  if (props.errorMessage === undefined) {
    return false;
  }
  return props.errorMessage.length > 0;
});

function clear() {
  value.value = "";
  emit("clear");
}
</script>

<template>
  <label>
    {{ label }}
    <div class="input-wrapper">
      <input
        :disabled
        :placeholder="placeholder ?? label"
        :class="{ error }"
        v-model="value" />
      <div class="button-wrapper" v-if="value.length > 0 && !disabled">
        <button type="button" @click="clear" tabindex="-1">
          <Icon icon="xmark" :size="16" />
        </button>
      </div>
    </div>
    <span class="error" v-if="errorMessage">{{ errorMessage }}</span>
  </label>
</template>

<style scoped>
label {
  display: grid;
  gap: 4px;
  width: fit-content;
}

input {
  background-color: var(--color-surface-1);
  font: var(--font-content);
  border: none;
  border-bottom: 2px solid var(--color-text-dim);
  padding: 12px 8px;
  border-radius: 2px;
  width: 100%;
}

input:focus {
  outline: none;
  border: none;
  border-bottom: 2px solid var(--color-primary);
}

input.error {
  border-bottom: 2px solid var(--color-error);
}

span.error {
  font: var(--font-subtitle);
  color: var(--color-error);
  height: 1.5em;
}

div.input-wrapper {
  position: relative;
}

button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  display: grid;
  place-items: center;
}

div.button-wrapper {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  display: grid;
  place-items: center;
}
</style>
