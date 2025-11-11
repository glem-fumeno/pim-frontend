<script setup lang="ts">
import type { Ref } from "vue";
import { onMounted, ref } from "vue";

const spinnerShown: Ref<boolean> = ref(false);

onMounted(() => {
  setTimeout(() => {
    spinnerShown.value = true;
  }, 200);
});
</script>
<template>
  <div :class="{ hidden: !spinnerShown }"></div>
</template>
<style scoped>

.hidden {
  opacity: 0;
}
div {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background:
    radial-gradient(farthest-side, var(--color-primary) 94%, #0000) top/8px 8px
      no-repeat,
    conic-gradient(#0000 30%, var(--color-primary));
  mask: radial-gradient(farthest-side, #0000 calc(100% - 8px), #000 0);
  animation: s3 1s infinite linear;
}

@keyframes s3 {
  100% {
    transform: rotate(1turn);
  }
}
</style>
