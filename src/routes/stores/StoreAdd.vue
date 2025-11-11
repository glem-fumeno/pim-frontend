<script setup lang="ts">
import type { APIError } from "@/api/agent";
import { createStore } from "@/api/stores";
import Button from "@/components/Button.vue";
import Icon from "@/components/Icon.vue";
import Input from "@/components/Input.vue";
import router from "@/router";
import { computed, ref } from "vue";

const name = ref<string>("");
const nameError = ref<string>("");
const platform = ref<string>("");
const platformError = ref<string>("");
const language = ref<string>("");
const languageError = ref<string>("");
const channelError = ref<string>("");

const emit = defineEmits<{
  create: [id: string];
  close: [];
}>();

const header = computed<string>(() => {
  if (name.value === "") {
    return "New Store";
  }
  return name.value;
});

const channel = computed<string>(() => {
  if (platform.value === "" || language.value === "") {
    return "";
  }
  return `${platform.value}_${language.value}`;
});

const submitDisabled = computed<boolean>(() => {
  return name.value === "" || platform.value === "" || language.value === "";
});

function submit() {
  nameError.value = "";
  platformError.value = "";
  languageError.value = "";
  channelError.value = "";
  createStore({
    name: name.value,
    platform: platform.value,
    language: language.value,
  })
    .then((store) => {
      router.push({ name: "stores" });
      emit("create", store.store_id);
    })
    .catch((e) => {
      if (e.detail === "name already exists") {
        nameError.value = e.detail;
      } else if (e.detail === "channel already exists") {
        channelError.value = e.detail;
      } else if (e[0].location !== undefined) {
        e.forEach((err: APIError) => {
          if (err.location === "name") {
            nameError.value = err.detail.replace("String", "name");
          } else if (err.location === "platform") {
            platformError.value = err.detail.replace("String", "platform");
          } else if (err.location === "language") {
            languageError.value = err.detail.replace("String", "language");
          } else {
            console.error(err);
          }
        });
      } else {
        console.error(e);
      }
    });
}
</script>
<template>
  <div class="main">
    <div class="header">
      <h1>{{ header }}</h1>
      <button @click="$emit('close')">
        <Icon icon="xmark" />
      </button>
    </div>
    <form @submit.prevent="submit">
      <Input
        v-model="name"
        label="Name"
        placeholder="Name"
        :error-message="nameError"
        class="input" />
      <Input
        v-model="platform"
        label="Platform"
        placeholder="Platform"
        :error-message="platformError"
        class="input" />
      <Input
        v-model="language"
        label="Language"
        placeholder="Language"
        :error-message="languageError"
        class="input" />
      <Input
        v-model="channel"
        label="Channel"
        placeholder="Channel"
        :error-message="channelError"
        disabled
        class="input" />
      <Button :disabled="submitDisabled">Submit</Button>
    </form>
  </div>
</template>

<style scoped>
.main {
  padding: 8px;
  flex: 1;
  gap: 8px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header button {
  border: none;
  cursor: pointer;
  border-radius: 4px;
  padding: 8px;
  background-color: var(--color-surface-0);
}
.header button:hover {
  background-color: var(--color-surface-1);
}
.header button:active {
  background-color: var(--color-surface-2);
}

h1 {
  padding: 0;
  margin: 8px 0px;
}

.content {
  gap: 8px;
  display: grid;
  overflow: hidden;
  place-items: center;
  width: 100%;
  flex: 1;
  background-color: var(--color-surface-0);
  border-radius: 1rem;
  padding: 1rem;
}
form {
  width: fit-content;
  display: flex;
  flex-direction: column;
  width: 400px;
  gap: 4px;
}
.input {
  width: 100%;
}
form button {
  place-self: end;
}
.error {
  color: var(--color-error);
  background-color: var(--color-surface-0);
  border: 2px solid var(--color-error);
  border-radius: 8px;
  padding: 4px;
}
</style>
