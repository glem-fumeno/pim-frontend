<script setup lang="ts">
import Icon from "@/components/Icon.vue";
import { ref, type ModelRef } from "vue";

defineProps<{
  options: string[];
  placeholder?: string;
}>();
const emit = defineEmits<{
  select: [];
}>();

const selected: ModelRef<string | undefined> = defineModel();
const open = ref(false);

function toggleOpen() {
  open.value = !open.value;
}

function selectOption(option: string) {
  selected.value = selected.value === option ? undefined : option;
  toggleOpen();
  emit("select")
}
</script>
<template>
  <div class="wrapper" :class="{ open }">
    <button class="select" @click.prevent="toggleOpen" :class="{ open }">
      <div class="value">
        <span :class="{ hidden: selected === undefined }">
          {{ selected }}
        </span>
        <span class="placeholder" :class="{ hidden: selected !== undefined }">
          {{ placeholder }}
        </span>
      </div>
      <div class="icon-wrapper">
        <Icon :icon="open ? 'chevron-up' : 'chevron-down'" :size="16" />
      </div>
    </button>
    <div class="options">
      <button
        class="option"
        v-for="option in options"
        @click.prevent="selectOption(option)"
        :class="{ active: selected === option }"
        :tabindex="open ? 0 : -1">
        {{ option }}
      </button>
    </div>
    <button @click.prevent="toggleOpen()" v-if="open" class="cancel"></button>
  </div>
</template>
<style scoped src="./dropdown.css" />
