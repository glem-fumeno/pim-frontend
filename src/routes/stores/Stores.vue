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
</style>
