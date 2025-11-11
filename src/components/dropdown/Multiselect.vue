<script setup lang="ts">
import Icon from "@/components/Icon.vue";
import { ref, type ModelRef, type Ref } from "vue";

const props = defineProps<{
  options: string[];
  placeholder?: string;
}>();

const selected: ModelRef<string[]> = defineModel({ default: [] as string[] });
const open = ref(false);
const count = ref(-1);
const optionShown: Ref<string | undefined> = ref(undefined);

function toggleOpen() {
  open.value = !open.value;
}

function selectOption(option: string) {
  if (selected.value.includes(option)) {
    selected.value.splice(selected.value.indexOf(option), 1);
  } else {
    selected.value.push(option);
  }
  selected.value = selected.value.sort(
    (a, b) => props.options.indexOf(a) - props.options.indexOf(b),
  );
  optionShown.value = selected.value[0];
  count.value = selected.value.length - 1;
}
</script>
<template>
  <div class="wrapper" :class="{ open }">
    <button class="select" @click.prevent="toggleOpen" :class="{ open }">
      <div class="value">
        <span :class="{ hidden: selected.length < 1 }">
          {{ optionShown }}
        </span>
        <span class="placeholder" :class="{ hidden: selected.length > 0 }">
          {{ placeholder }}
        </span>
      </div>
      <div class="icon-wrapper">
        <span class="count" :class="{ hidden: count < 0 }">+{{ count }}</span>
        <Icon :icon="open ? 'chevron-up' : 'chevron-down'" :size="16" />
      </div>
    </button>
    <div class="options">
      <button
        class="option"
        v-for="option in options"
        @click.prevent="selectOption(option)"
        :class="{ active: selected.includes(option) }"
        :tabindex="open ? 0 : -1">
        {{ option }}
      </button>
    </div>
    <button @click.prevent="toggleOpen" v-if="open" class="cancel"></button>
  </div>
</template>
<style scoped src="./dropdown.css" />
