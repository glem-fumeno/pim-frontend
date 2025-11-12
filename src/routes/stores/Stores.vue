<script setup lang="ts">
import Breadcrumbs from "@/components/Breadcrumbs.vue";
import { ref } from "vue";
import StoreCreate from "./StoreCreate.vue";
import StoreRead from "./StoreRead.vue";
import StoreList from "./StoreList.vue";

const storeRead = ref<InstanceType<typeof StoreRead>>();
const storeCreate = ref<InstanceType<typeof StoreCreate>>();
const storeList = ref<InstanceType<typeof StoreList>>();
</script>

<template>
  <div class="main">
    <div class="header">
      <Breadcrumbs
        :elements="['PIM', 'Stores']"
        :nav="[null, { name: 'stores' }]" />
      <h1>Stores</h1>
    </div>
    <StoreList
      ref="storeList"
      :open-create="storeCreate?.open"
      :open-read="storeRead?.open" />
    <StoreCreate ref="storeCreate" :reload="storeList?.loadData" />
    <StoreRead ref="storeRead" :reload="storeList?.loadData" />
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
  background-color: var(--color-surface-0);
  border-radius: 1rem;
  padding: 1rem;
}

h1 {
  padding: 0;
  margin: 8px 0px;
}

.content {
  background-color: var(--color-surface-0);
  border-radius: 1rem;
  padding: 1rem;
  display: flex;
  gap: 8px;
  flex: 1;
  flex-direction: column;
  overflow: hidden;
}

.search-field {
  display: flex;
  gap: 8px;
  align-items: center;
}
.spinner {
  display: grid;
  place-items: center;
  height: 100%;
}

.filter-modal {
  align-self: normal;
}
.filter-modal form {
  display: grid;
  gap: 8px;
  place-items: start;
  width: 200px;
}

.filter-modal .filter {
  width: 100%;
}

.filter-modal .submit {
  place-self: end;
}
.clear {
  display: flex;
  border: none;
  background-color: transparent;
  font: unset;
  align-items: center;
  justify-items: baseline;
  gap: 4px;
  color: var(--color-error);
  height: 20px;
  cursor: pointer;
}
.clear:hover {
  text-decoration: underline;
}
.filter-button {
  position: relative;
}
.filter-button span {
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: var(--color-primary);
  color: var(--color-surface-1);
  width: 20px;
  height: 20px;
  border-radius: 50%;
}
.content-header {
  display: flex;
  justify-content: space-between;
}
</style>
