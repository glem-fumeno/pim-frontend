<script setup lang="ts">
import Icon from "@/components/Icon.vue";

defineProps<{
  expanded: boolean;
  icon: string;
  to: string;
}>();
</script>

<template>
  <router-link
    :to="$route.name === to ? $route : { name: to }"
    active-class="active">
    <Icon :icon />
    <span v-if="expanded">
      <slot></slot>
    </span>
  </router-link>
</template>

<style scoped>
a {
  color: var(--color-text);
  text-decoration: none;
  padding: 12px 16px;
  display: flex;
  place-items: center;
  gap: 8px;
}

a:hover {
  background-color: var(--color-surface-2);
}

a.active {
  background-color: var(--color-primary);
  color: var(--color-surface-1);
}
</style>
