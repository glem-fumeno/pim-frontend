<script setup lang="ts">
import { ref } from "vue";
import StoreCreate from "./StoreCreate.vue";
import StoreRead from "./StoreRead.vue";
import StoreList from "./StoreList.vue";
import { NBreadcrumb, NBreadcrumbItem, NPageHeader } from "naive-ui";
import { CaretRight } from "@vicons/fa";

const storeRead = ref<InstanceType<typeof StoreRead>>();
const storeCreate = ref<InstanceType<typeof StoreCreate>>();
const storeList = ref<InstanceType<typeof StoreList>>();
</script>

<template>
  <div class="main">
    <n-page-header title="Stores">
      <template #header>
        <n-breadcrumb>
          <n-breadcrumb-item :clickable="false">
            <template #separator>
              <n-icon><CaretRight /></n-icon>
            </template>
            PIM
          </n-breadcrumb-item>
          <n-breadcrumb-item>Stores</n-breadcrumb-item>
        </n-breadcrumb>
      </template>
    </n-page-header>
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
  padding: 16px;
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
</style>
