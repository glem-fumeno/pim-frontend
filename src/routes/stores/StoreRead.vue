<script setup lang="ts">
import type { APIError } from "@/api/agent";
import { deleteStore, fetchStore, updateStore, type Store } from "@/api/stores";
import Button from "@/components/Button.vue";
import Icon from "@/components/Icon.vue";
import Input from "@/components/Input.vue";
import { timeToString } from "@/time";
import { onMounted, ref } from "vue";

const props = defineProps<{
  storeId: string;
}>();

const emit = defineEmits<{
  delete: [];
  update: [];
  close: [];
}>();

const confirmDelete = ref<boolean>(false);

const name = ref<string>("");
const nameError = ref<string>("");
const platform = ref<string>("");
const language = ref<string>("");
const channel = ref<string>("");
const createdAt = ref<string>("");
const updatedAt = ref<string>("");

function loadData(store: Store) {
  name.value = store.name;
  language.value = store.language;
  platform.value = store.platform;
  channel.value = store.channel;
  createdAt.value = timeToString(store.created_at);
  updatedAt.value = timeToString(store.updated_at);
}

onMounted(() => {
  fetchStore(props.storeId).then(loadData);
});

function remove() {
  if (confirmDelete.value) {
    deleteStore(props.storeId);
    emit("delete");
  } else {
    confirmDelete.value = true;
  }
}

function update() {
  updateStore(props.storeId, { name: name.value })
    .then((store) => {
      loadData(store);
      emit("update");
    })
    .catch((e) => {
      if (e.detail === "name already exists") {
        nameError.value = e.detail;
      } else if (e[0].location !== undefined) {
        e.forEach((err: APIError) => {
          if (err.location === "name") {
            nameError.value = err.detail.replace("String", "name");
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
      <h1>{{ name }}</h1>
      <button @click="$emit('close')">
        <Icon icon="xmark" />
      </button>
    </div>
    <form @submit.prevent="update">
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
        error-message=""
        disabled
        class="input" />
      <Input
        v-model="language"
        label="Language"
        placeholder="Language"
        error-message=""
        disabled
        class="input" />
      <Input
        v-model="channel"
        label="Channel"
        placeholder="Channel"
        error-message=""
        disabled
        class="input" />
      <span class="date">
        <span class="label">Created at:</span>
        <span class="value">{{ createdAt }}</span>
      </span>
      <span class="date">
        <span class="label">Updated at:</span>
        <span class="value">{{ updatedAt }}</span>
      </span>
      <span class="buttons">
        <Button
          icon="trash-can"
          variant="secondary"
          color="var(--color-error)"
          @click.prevent="remove">
          <span v-if="confirmDelete">Confirm</span>
          <span v-else>Delete</span>
        </Button>
        <Button>Update</Button>
      </span>
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
.buttons {
  margin-top: 8px;
  display: flex;
  justify-content: space-between;
}
.error {
  color: var(--color-error);
  background-color: var(--color-surface-0);
  border: 2px solid var(--color-error);
  border-radius: 8px;
  padding: 4px;
}

.date {
  display: flex;
  width: 100%;
  justify-content: space-between;
}
.date .value {
  color: var(--color-text-dim);
}
</style>
