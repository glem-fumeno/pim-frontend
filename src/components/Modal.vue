<script setup lang="ts">
import { ref } from "vue";

const dialog = ref<HTMLDialogElement>();

const visible = ref(false);

const showModal = () => {
  dialog.value?.showModal();
  visible.value = true;
};

defineExpose({
  show: showModal,
  close: (): void => dialog.value?.close(),
  visible,
});
</script>

<template>
  <dialog ref="dialog" @close="visible = false" closedby="any">
    <slot />
  </dialog>
</template>
<style scoped>
dialog {
  background-color: var(--color-surface-0);
  z-index: var(--z-modal-content);
  border-radius: 8px;
  padding: 16px;
  border: 2px solid var(--color-primary);
  overflow: visible;
}

dialog::backdrop {
  background-color: var(--color-background);
  opacity: 50%;
}
</style>
