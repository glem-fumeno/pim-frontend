<script setup lang="ts">
import Icon from "@/components/Icon.vue";
import type { RouteLocationAsRelativeGeneric } from "vue-router";

const {
  disabled = false,
  variant = "primary",
  icon,
} = defineProps<{
  disabled?: boolean;
  variant?: "primary" | "secondary";
  icon?: string;
  color?: string;
  to?: RouteLocationAsRelativeGeneric;
}>();

const className = {
  primary: variant === "primary",
  secondary: variant === "secondary",
  iconbutton: icon !== undefined,
};
</script>

<template>
  <button
    v-if="to === undefined"
    class="button"
    :disabled
    :class="className"
    :style="color === undefined ? undefined : { border: `2px solid ${color}` }">
    <Icon v-if="icon !== undefined" :icon variant="solid" />
    <slot></slot>
  </button>
  <router-link v-else class="button" :to="to" :disabled :class="className">
    <Icon v-if="icon !== undefined" :icon variant="solid" />
    <slot></slot>
  </router-link>
</template>

<style scoped>
.button {
  font: unset;
  border-radius: 8px;
  padding: 12px;
  border: 2px solid var(--color-primary);
  background-color: var(--button-normal);
  cursor: pointer;
  text-decoration: none;
  color: unset;
}
.button.primary {
  --button-normal: var(--color-primary);
  --button-hover: var(--color-primary-shade);
  --button-active: var(--color-primary-shadier);
  --button-disabled: var(--color-primary-disabled);

  color: var(--color-surface-1);
}

.button.secondary {
  --button-normal: var(--color-surface-0);
  --button-hover: var(--color-surface-1);
  --button-active: var(--color-surface-2);
  --button-disabled: var(--color-surface-0);
}

.button:hover {
  background-color: var(--button-hover);
  border: 2px solid var(--color-primary-shade);
}

.button:active {
  background-color: var(--button-active);
  border: 2px solid var(--color-primary-shadier);
}

.button:disabled {
  background-color: var(--button-disabled);
  border: 2px solid var(--color-primary-disabled);
  cursor: not-allowed;
}

.button.secondary:disabled {
  color: var(--color-text-dim);
}

.button.iconbutton {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}
</style>
