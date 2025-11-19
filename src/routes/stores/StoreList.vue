<script setup lang="ts">
import {
  fetchFilters,
  fetchStores,
  type StoreColumn,
  type StoreShort,
} from "@/api/stores";
import { timeToString } from "@/time";
import { Plus, Search } from "@vicons/fa";
import { NButton, NDataTable, NIcon, NInput } from "naive-ui";
import type {
  FilterState,
  SortState,
  TableBaseColumn,
} from "naive-ui/es/data-table/src/interface";
import { onMounted, ref, type Ref } from "vue";
import { useRoute, useRouter } from "vue-router";
const props = defineProps<{
  openCreate?: () => void;
  openRead?: (id: string) => void;
}>();

const route = useRoute();
const router = useRouter();

const sortBy: Ref<StoreColumn> = ref("name");
const sortAsc: Ref<boolean> = ref(true);
const searchTerm: Ref<string> = ref("");
const languageFilter: Ref<string | null> = ref(null);
const platformFilter: Ref<string | null> = ref(null);

const dataLoaded = ref(false);
const stores: Ref<StoreShort[]> = ref([]);

const columns: Ref<TableBaseColumn<StoreShort>[]> = ref<
  TableBaseColumn<StoreShort>[]
>([
  { key: "name", title: "Name", sorter: true, defaultSortOrder: "ascend" },
  { key: "channel", title: "Channel", sorter: true },
  { key: "platform", title: "Platform", filterMultiple: false },
  { key: "language", title: "Language", filterMultiple: false },
  {
    key: "updated_at",
    title: "Updated at",
    sorter: true,
    render: (row: StoreShort) => timeToString(row.updated_at),
  },
]);
const invertedsort: StoreColumn[] = ["name", "channel", "updated_at"];
const columnmap: Record<StoreColumn, number | undefined> = {
  store_id: undefined,
  name: 0,
  channel: 1,
  platform: 2,
  language: 3,
  updated_at: 4,
};

function rowProps(row: StoreShort) {
  return {
    style: "cursor: pointer;",
    onClick: () => {
      props.openRead!(row.store_id);
    },
  };
}

function loadData() {
  const query = {
    query: searchTerm.value,
    language: languageFilter.value ?? undefined,
    sort_by: sortBy.value,
    sort_asc: sortAsc.value.toString(),
    platform: platformFilter.value ?? undefined,
  };
  columns.value[columnmap[sortBy.value]!]!.sortOrder = sortAsc.value
    ? "ascend"
    : "descend";
  router.push({ name: "stores", query: query });
  fetchStores(query).then((results) => {
    stores.value = results;
    dataLoaded.value = true;
  });
}

function loadFilters() {
  fetchFilters().then((filters) => {
    columns.value[columnmap.language!]!.filter = true;
    columns.value[columnmap.language!]!.filterOptionValue =
      languageFilter.value;
    columns.value[columnmap.language!]!.filterOptions = filters.languages.map(
      (l) => ({ label: l, value: l }),
    );
    columns.value[columnmap.platform!]!.filter = true;
    columns.value[columnmap.platform!]!.filterOptionValue =
      platformFilter.value;
    columns.value[columnmap.platform!]!.filterOptions = filters.platforms.map(
      (l) => ({ label: l, value: l }),
    );
  });
}

onMounted(() => {
  searchTerm.value = (route.query.query as string) ?? "";
  sortAsc.value = (route.query.sort_asc as string) === "true";
  sortBy.value = (route.query.sort_by as StoreColumn) ?? "name";
  languageFilter.value = (route.query.language as string) ?? null;
  platformFilter.value = (route.query.platform as string) ?? null;
  loadData();
  loadFilters();
});

function clearSearch() {
  searchTerm.value = "";
  loadData();
}

function onsort(state: SortState) {
  const column: StoreColumn = state.columnKey as StoreColumn;
  columns.value[columnmap[sortBy.value]!]!.sortOrder = false;
  if (state.order === "descend" && invertedsort.includes(column))
    state.order = "ascend";
  sortBy.value = column;
  sortAsc.value = state.order === "ascend";
  loadData();
}
function onfilter(state: FilterState) {
  languageFilter.value = (state["language"] as string) ?? null;
  columns.value[columnmap.language!]!.filterOptionValue = languageFilter.value;
  platformFilter.value = (state["platform"] as string) ?? null;
  columns.value[columnmap.platform!]!.filterOptionValue = platformFilter.value;
  loadData();
}

defineExpose({
  loadData,
});
</script>

<template>
  <div class="content-header">
    <div class="search-header">
      <form class="search-field" @submit.prevent="loadData">
        <n-input-group>
          <n-input
            placeholder="Search"
            v-model:value="searchTerm"
            clearable
            @clear="clearSearch"
            size="large" />
          <n-button type="primary" primary attr-type="submit" size="large">
            <template #icon>
              <n-icon :size="16"><Search /></n-icon>
            </template>
          </n-button>
        </n-input-group>
      </form>
      <n-button @click.prevent="openCreate!()" size="large">
        <template #icon>
          <n-icon :size="16"> <Plus /></n-icon>
        </template>
        Add
      </n-button>
    </div>
  </div>
  <n-data-table
    :columns="columns"
    :data="stores"
    :row-props="rowProps"
    @update:sorter="onsort"
    @update:filters="onfilter" />
</template>

<style scoped>
.content-header {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.search-header {
  display: flex;
  justify-content: space-between;
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
</style>
