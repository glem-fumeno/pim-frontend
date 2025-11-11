<script setup lang="ts">
const {
  size = 20,
  color = "inherit",
  variant = "solid",
} = defineProps<{
  icon: string;
  size?: number;
  color?: string;
  variant?: "solid" | "regular";
}>();
const fontSize = size + "px";
</script>
<template>
  <i
    :class="`fa-${variant} fa-${icon}`"
    :style="{ fontSize, width: fontSize, minWidth: fontSize, color }"></i>
</template>
<style scoped>
i {
  aspect-ratio: 1;
  display: grid;
  place-items: center;
  padding: 0;
}
</style>
