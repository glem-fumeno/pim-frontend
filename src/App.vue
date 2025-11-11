<script setup lang="ts">
import Icon from "@/components/Icon.vue";
import { ref } from "vue";
import SidebarItem from "./components/SidebarItem.vue";

const expanded = ref(true);

function toggleSidebar() {
  expanded.value = !expanded.value;
}
</script>

<template>
  <div class="app">
    <div class="sidebar" :class="{ expanded }">
      <h1>
        <span v-if="expanded">
          <img src="/favicon.svg" alt="" />
          PIM
        </span>
        <button @click="toggleSidebar">
          <Icon icon="bars" />
        </button>
      </h1>
      <SidebarItem to="attributes" icon="expand" :expanded>
        Attributes
      </SidebarItem>
      <SidebarItem to="templates" icon="layer-group" :expanded>
        Templates
      </SidebarItem>
      <SidebarItem to="products" icon="wrench" :expanded>
        Products
      </SidebarItem>
      <SidebarItem to="categories" icon="bars-staggered" :expanded>
        Categories
      </SidebarItem>
      <SidebarItem to="stores" icon="store" :expanded> Stores </SidebarItem>
    </div>
    <router-view />
  </div>
</template>

<style scoped>

.sidebar {
  background-color: var(--color-surface-1);
  height: 100%;
  width: 52px;
  transition: width 100ms ease-out;
}

.sidebar.expanded {
  width: 256px;
}

.sidebar h1 {
  background-color: var(--color-surface-1);
  margin: 0;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.sidebar h1 span {
  gap: 8px;
  display: flex;
  place-items: center;
}

.sidebar h1 button {
  border: none;
  background-color: transparent;
  border-radius: 50%;
  padding: 10px;
  cursor: pointer;
}

.sidebar h1 button:hover {
  background-color: var(--color-surface-2);
}

.app {
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>
