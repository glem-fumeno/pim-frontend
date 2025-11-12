<script setup lang="ts">
import type { APIError } from "@/api/agent";
import { createStore, type StoreCreateRequest } from "@/api/stores";
import Button from "@/components/Button.vue";
import Icon from "@/components/Icon.vue";
import Input from "@/components/Input.vue";
import Modal from "@/components/Modal.vue";
import router from "@/router";
import { computed, reactive, ref } from "vue";

const initialStore: StoreCreateRequest = {
  name: "",
  language: "",
  platform: "",
};

const store: StoreCreateRequest = reactive(structuredClone(initialStore));
const initialErrors = {
  name: "",
  platform: "",
  language: "",
  channel: "",
};
const errors = reactive(structuredClone(initialErrors));
const modal = ref<InstanceType<typeof Modal>>();

const props = defineProps<{
  reload?: () => void;
}>();

function open() {
  Object.assign(store, initialStore);
  Object.assign(errors, initialErrors);
  modal.value?.open();
}

defineExpose({
  open,
});

const header = computed<string>(() => {
  if (store.name === "") {
    return "New Store";
  }
  return store.name;
});

const channel = computed<string>(() => {
  if (store.platform === "" || store.language === "") {
    return "";
  }
  return `${store.platform}_${store.language}`;
});

const submitDisabled = computed<boolean>(() => {
  return store.name === "" || store.platform === "" || store.language === "";
});

function submit() {
  Object.assign(errors, initialErrors);
  createStore(store)
    .then(() => {
      router.push({ name: "stores" });
      modal.value?.close();
      props.reload!();
    })
    .catch((e) => {
      if (e.detail === "name already exists") {
        errors.name = e.detail;
      } else if (e.detail === "channel already exists") {
        errors.channel = e.detail;
      } else if (e[0].location !== undefined) {
        e.forEach((err: APIError) => {
          if (err.location === "name") {
            errors.name = err.detail.replace("String", "name");
          } else if (err.location === "platform") {
            errors.platform = err.detail.replace("String", "platform");
          } else if (err.location === "language") {
            errors.language = err.detail.replace("String", "language");
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
  <Modal centered ref="modal">
    <div class="main">
      <div class="header">
        <h1>{{ header }}</h1>
        <button @click="modal?.close()">
          <Icon icon="xmark" />
        </button>
      </div>
      <form @submit.prevent="submit">
        <Input
          v-model="store.name"
          label="Name"
          :error-message="errors.name"
          class="input" />
        <Input
          v-model="store.platform"
          label="Platform"
          :error-message="errors.platform"
          class="input" />
        <Input
          v-model="store.language"
          label="Language"
          :error-message="errors.language"
          class="input" />
        <Input
          v-model="channel"
          label="Channel"
          :error-message="errors.channel"
          disabled
          class="input" />
        <Button :disabled="submitDisabled">Submit</Button>
      </form>
    </div>
  </Modal>
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
  max-width: 400px;
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
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
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
  gap: 16px;
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
