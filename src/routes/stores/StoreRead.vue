<script setup lang="ts">
import type { APIError } from "@/api/agent";
import { deleteStore, fetchStore, updateStore, type Store } from "@/api/stores";
import {
  NButton,
  NForm,
  NFormItem,
  NInput,
  NModal,
  NFlex,
  NTime,
  NTabs,
  NTabPane,
  NSpace,
} from "naive-ui";
import { reactive, ref } from "vue";

const props = defineProps<{
  reload?: () => void;
}>();

const confirmDelete = ref<boolean>(false);
const nameError = ref<string>("");

const store: Store = reactive({
  store_id: "",
  name: "",
  platform: "",
  language: "",
  channel: "",
  created_at: new Date(),
  updated_at: new Date(),
});

const isOpen = ref<boolean>(false);

function loadData(model: Store) {
  Object.assign(store, model);
}

function open(id: string) {
  store.store_id = id;
  fetchStore(store.store_id).then(loadData);
  isOpen.value = true;
  nameError.value = "";
  confirmDelete.value = false;
}

defineExpose({
  open,
});

function remove() {
  if (confirmDelete.value) {
    deleteStore(store.store_id);
    isOpen.value = false;
    props.reload!();
  } else {
    confirmDelete.value = true;
  }
}

function update() {
  updateStore(store.store_id, { name: store.name })
    .then((store) => {
      loadData(store);
      props.reload!();
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
  <n-modal
    v-model:show="isOpen"
    preset="card"
    style="width: 500px"
    :title="store.name">
    <n-tabs animated>
      <n-tab-pane name="General">
        <n-form v-model="store">
          <n-form-item
            label="Name"
            path="name"
            :validation-status="nameError ? 'error' : undefined"
            :feedback="nameError">
            <n-input v-model:value="store.name" placeholder="Name" />
          </n-form-item>
          <n-form-item label="Platform">
            <n-input
              v-model:value="store.platform"
              placeholder="Platform"
              disabled />
          </n-form-item>
          <n-form-item label="Language">
            <n-input
              v-model:value="store.language"
              placeholder="Language"
              disabled />
          </n-form-item>
          <n-form-item label="Channel">
            <n-input
              v-model:value="store.channel"
              placeholder="Channel"
              disabled />
          </n-form-item>
          <n-flex justify="flex-end">
            <n-button size="large" @click.prevent="update" type="primary">
              Update
            </n-button>
          </n-flex>
        </n-form>
      </n-tab-pane>
      <n-tab-pane name="Settings">
        <n-space vertical>
          <n-flex justify="space-between">
            <strong>Created at</strong>
            <n-time :time="store.created_at" />
          </n-flex>
          <n-flex justify="space-between">
            <strong>Updated at</strong>
            <n-time :time="store.updated_at" />
          </n-flex>
          <n-flex justify="flex-end">
            <n-button
              size="large"
              @click.prevent="remove"
              type="error"
              :ghost="!confirmDelete">
              {{ confirmDelete ? "Confirm?" : "Delete" }}
            </n-button>
          </n-flex>
        </n-space>
      </n-tab-pane>
    </n-tabs>
  </n-modal>
</template>
<style scoped></style>
