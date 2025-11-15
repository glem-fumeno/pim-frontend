<script setup lang="ts">
import { fetchFilters, fetchStores, type StoreShort } from "@/api/stores";
import Button from "@/components/Button.vue";
import Select from "@/components/dropdown/Select.vue";
import Input from "@/components/Input.vue";
import Modal from "@/components/Modal.vue";
import Spinner from "@/components/Spinner.vue";
import Table from "@/components/table/Table.vue";
import { computed, onMounted, ref, type Ref } from "vue";
import { useRoute, useRouter } from "vue-router";

defineProps<{
  openCreate?: () => void;
  openRead?: (id: string) => void;
}>();

const route = useRoute();
const router = useRouter();
const filterModal = ref<InstanceType<typeof Modal>>();

const searchTerm: Ref<string> = ref("");
const languageFilters: Ref<string[]> = ref([]);
const languageFilter: Ref<string | undefined> = ref();
const platformFilters: Ref<string[]> = ref([]);
const platformFilter: Ref<string | undefined> = ref();
const filterCount = computed(() => {
  const filters = [languageFilter.value, platformFilter.value];
  return filters.filter((value) => value !== undefined).length;
});
const filtersLoaded = ref(false);
const sortColumn = ref("name");

const dataLoaded = ref(false);
const stores: Ref<StoreShort[]> = ref([]);

const columns: Ref<Record<string, Record<string, any>>> = ref({
  name: { name: "Name", sortable: true, sortAsc: true },
  channel: { name: "Channel", sortable: true },
  platform: { name: "Platform" },
  language: { name: "Language" },
  updated_at: { name: "Updated at", type: "date", sortable: true },
});

function sortBy(column: string) {
  let store = columns.value[sortColumn.value]!;
  if (sortColumn.value === column) {
    store.sortAsc = !store.sortAsc;
  } else {
    store.sortAsc = undefined;
    sortColumn.value = column;
    store = columns.value[sortColumn.value]!;
    store.sortAsc = true;
  }
  loadData();
}

function loadData() {
  const query = {
    query: searchTerm.value,
    sort_by: sortColumn.value,
    sort_asc: columns.value[sortColumn.value]!.sortAsc,
    language: languageFilter.value,
    platform: platformFilter.value,
  };
  router.push({ name: "stores", query: query });
  fetchStores(query).then((results) => {
    stores.value = results;
    dataLoaded.value = true;
  });
}

function loadFilters() {
  fetchFilters().then((filters) => {
    languageFilters.value = filters.languages;
    platformFilters.value = filters.platforms;
    filtersLoaded.value = true;
  });
}

onMounted(() => {
  searchTerm.value = (route.query.query as string) ?? "";
  sortColumn.value = (route.query.sort_by as string) ?? "name";
  columns.value[sortColumn.value]!.sortAsc =
    ((route.query.sort_asc as string) ?? "true") === "true";
  languageFilter.value = (route.query.language as string) ?? undefined;
  platformFilter.value = (route.query.platform as string) ?? undefined;
  loadData();
  loadFilters();
});

function clearFilters() {
  searchTerm.value = "";
  languageFilter.value = undefined;
  platformFilter.value = undefined;
  loadData();
}

defineExpose({
  loadData,
});
</script>

<template>
  <div class="content">
    <div class="content-header">
      <div class="search-header">
        <form class="search-field" @submit.prevent="loadData">
          <Input placeholder="Search" v-model="searchTerm" @clear="loadData" />
          <Button icon="magnifying-glass"></Button>
          <Button
            @click.prevent="
              loadFilters();
              filterModal?.open();
            "
            icon="filter"
            variant="secondary"
            class="filter-button">
            <span v-if="filterCount > 0">{{ filterCount }}</span>
          </Button>
          <Select
            :options="platformFilters"
            placeholder="platform"
            v-model="platformFilter"
            @select="loadData()"
            class="filter" />
          <Select
            :options="languageFilters"
            placeholder="language"
            v-model="languageFilter"
            @select="loadData()"
            class="filter" />
          <button
            class="clear"
            v-if="filterCount > 0"
            @click.prevent="clearFilters">
            clear filters
          </button>
        </form>
        <Button icon="plus" variant="secondary" @click.prevent="openCreate!()">
          Add
        </Button>
      </div>
    </div>
    <Table
      v-if="dataLoaded"
      :columns="columns"
      :data="stores"
      id-field="store_id"
      @select="openRead"
      :sort-by="sortBy" />
    <div class="spinner" v-else>
      <Spinner />
    </div>
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
.content-header {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.search-header {
  display: flex;
  justify-content: space-between;
}

.filters {
  display: flex;
  gap: 16px;
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
</style>
