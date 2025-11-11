<script setup lang="ts">
import Icon from "@/components/Icon.vue";
import type { RouteLocationAsRelativeGeneric } from "vue-router";

defineProps<{
  elements: string[];
  nav: (RouteLocationAsRelativeGeneric | null)[];
}>();
</script>
<template>
  <nav>
    <template v-for="(element, index) in elements">
      <span class="element" v-if="nav[index] === null">{{ element }}</span>
      <router-link
        class="element"
        v-else
        :to="nav[index] as RouteLocationAsRelativeGeneric">
        {{ element }}
      </router-link>
      <Icon icon="caret-right" :size="12" v-if="index < elements.length - 1" />
    </template>
  </nav>
</template>
<style scoped>
nav {
  display: flex;
  gap: 4px;
}
.element {
  border-radius: 100vw;
  padding: 2px 8px;
  color: var(--color-surface-1);
  font: var(--font-subtitle);
}

span {
  background-color: var(--color-primary-disabled);
}

a {
  background-color: var(--color-primary);
  text-decoration: none;
}

a:hover {
  background-color: var(--color-primary-shade);
}

a:active {
  background-color: var(--color-primary-shadier);
}
</style>
