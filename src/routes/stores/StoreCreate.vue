<script setup lang="ts">
import type { APIError } from "@/api/agent";
import { createStore, type StoreCreateRequest } from "@/api/stores";
import router from "@/router";
import { NButton, NForm, NFormItem, NInput, NModal } from "naive-ui";
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
const isOpen = ref<boolean>(false);

const props = defineProps<{
  reload?: () => void;
}>();

function open() {
  Object.assign(store, initialStore);
  Object.assign(errors, initialErrors);
  isOpen.value = true;
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
      isOpen.value = false;
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
  <n-modal
    v-model:show="isOpen"
    preset="card"
    style="width: 500px"
    :title="header">
    <n-form v-model="store">
      <n-form-item
        label="Name"
        path="name"
        :validation-status="errors.name ? 'error' : undefined"
        :feedback="errors.name">
        <n-input v-model:value="store.name" placeholder="Name" />
      </n-form-item>
      <n-form-item
        label="Platform"
        path="platform"
        :validation-status="errors.platform ? 'error' : undefined"
        :feedback="errors.platform">
        <n-input v-model:value="store.platform" placeholder="Platform" />
      </n-form-item>
      <n-form-item
        label="Language"
        path="language"
        :validation-status="errors.language ? 'error' : undefined"
        :feedback="errors.language">
        <n-input v-model:value="store.language" placeholder="Language" />
      </n-form-item>
      <n-form-item
        label="Channel"
        :validation-status="errors.channel ? 'error' : undefined"
        :feedback="errors.channel">
        <n-input v-model:value="channel" placeholder="Channel" disabled />
      </n-form-item>
      <n-form-item class="button-wrapper">
        <n-button
          :disabled="submitDisabled"
          @click.prevent="submit"
          type="primary">
          Submit
        </n-button>
      </n-form-item>
    </n-form>
  </n-modal>
</template>

<style scoped>
.button-wrapper {
  display: flex;
  justify-content: flex-end;
}
</style>
