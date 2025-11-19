<script setup lang="ts">
import { h, ref, type Component } from "vue";
import {
  darkTheme,
  NConfigProvider,
  NH1,
  NIcon,
  NLayout,
  NLayoutSider,
  NModalProvider,
  type GlobalThemeOverrides,
  type MenuOption,
} from "naive-ui";
import { RouterLink, useRoute } from "vue-router";
import { Bars, Expand, LayerGroup, Store, Stream, Wrench } from "@vicons/fa";

const route = useRoute();

const overrides: GlobalThemeOverrides = {
  common: {
    fontFamily: "Lexend",
    borderRadius: "4px",
    primaryColor: "#8cbf70",
    primaryColorHover: "#7daf61",
    primaryColorPressed: "#6e9f52",
    inputColor: "#d8e1d422",
    textColorBase: "#d8e1d4",
    popoverColor: "#151714",
    cardColor: "#151714",
    modalColor: "#151714",
    bodyColor: "#101210"
  },
  PageHeader: {
    titleFontSize: "24px",
  },
  Card: {
    titleFontSizeMedium: "20px",
    closeIconSize: "20px",
  },
  DataTable: {
    thIconColorActive: "#7daf61",
    thColorSorting: "#00000000",
    tdColorSorting: "#151714",
  },
};

function getMenuOption(
  key: string,
  label: string,
  icon: Component,
): MenuOption {
  return {
    label: () => h(RouterLink, { to: { name: key } }, { default: () => label }),
    key: key,
    icon: () => h(NIcon, null, { default: () => h(icon) }),
  };
}

const menuOptions: MenuOption[] = [
  getMenuOption("attributes", "Attributes", Expand),
  getMenuOption("templates", "Templates", LayerGroup),
  getMenuOption("products", "Products", Wrench),
  getMenuOption("categories", "Categories", Stream),
  getMenuOption("stores", "Stores", Store),
];

const menuOpen = ref<boolean>(true);
</script>

<template>
  <n-config-provider :theme="darkTheme" :theme-overrides="overrides">
    <n-modal-provider>
      <n-dialog-provider>
        <n-layout has-sider class="app">
          <n-layout-sider :collapsed="!menuOpen" collapse-mode="width">
            <n-h1>
              <img src="/favicon.svg" alt="" v-if="menuOpen" />
              <span v-if="menuOpen">PIM</span>
              <n-button quaternary circle @click.prevent="menuOpen = !menuOpen">
                <template #icon>
                  <n-icon size="20px"><Bars /></n-icon>
                </template>
              </n-button>
            </n-h1>
            <n-menu :options="menuOptions" bordered :value="route.name" />
          </n-layout-sider>
          <router-view />
        </n-layout>
      </n-dialog-provider>
    </n-modal-provider>
  </n-config-provider>
</template>

<style scoped>
.app {
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
h1 {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  padding: 8px;
  gap: 8px;
  margin: 0;
}
</style>
