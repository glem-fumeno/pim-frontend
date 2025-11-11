<script setup lang="ts">
import Button from "@/components/Button.vue";
import Checkbox from "@/components/Checkbox.vue";
import Multiselect from "@/components/dropdown/Multiselect.vue";
import Select from "@/components/dropdown/Select.vue";
import Input from "@/components/Input.vue";
import Radio from "@/components/Radio.vue";
import { ref } from "vue";

const radio = ref("foo");
const checkboxes = ref([]);
const checkbox = ref(true);
</script>

<template>
  <div class="main">
    <div class="outer buttons">
      <div class="buttons">
        <Button>Primary</Button>
        <Button disabled>Primary Disabled</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="secondary" disabled>Secondary Disabled</Button>
      </div>
      <div class="buttons">
        <Button icon="floppy-disk">Primary</Button>
        <Button icon="floppy-disk" disabled>Primary Disabled</Button>
        <Button icon="floppy-disk" variant="secondary">Secondary</Button>
        <Button icon="floppy-disk" variant="secondary" disabled
          >Secondary Disabled</Button
        >
      </div>
      <div class="buttons">
        <Button icon="floppy-disk" />
        <Button icon="floppy-disk" disabled />
        <Button icon="floppy-disk" variant="secondary" />
        <Button icon="floppy-disk" variant="secondary" disabled />
      </div>
      <div>
        <Checkbox v-model="checkboxes" value="foo" label="Foo" />
        <Checkbox v-model="checkboxes" value="bar" label="Bar" disabled />
        <Checkbox v-model="checkboxes" value="baz" label="Baz" />
        <Checkbox v-model="checkbox" label="Qux" />
      </div>
      <div>
        <Radio v-model="radio" value="foo" label="Foo" />
        <Radio v-model="radio" value="bar" label="Bar" disabled />
        <Radio v-model="radio" value="baz" label="Baz" />
        <Radio v-model="radio" value="qux" label="Qux" />
      </div>
      <Input label="Input" placeholder="Input" />
      <Input label="Error" placeholder="Error" error-message="error" />
      <Select
        placeholder="Select"
        :options="['Option 1', 'Option 2', 'Option 3']" />
      <Multiselect
        placeholder="Multiselect"
        :options="['Option 1', 'Option 2', 'Option 3']" />
    </div>
  </div>
</template>

<style scoped>
.main {
  background-color: var(--color-surface-0);
  border-radius: 1rem;
  max-width: fit-content;
  padding: 1rem;
}

.buttons {
  display: flex;
  gap: 0.5rem;
}

.outer {
  flex-direction: column;
}

h1 {
  display: flex;
  align-items: center;
}
</style>
