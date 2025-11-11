<script setup lang="ts">
import { timeToString } from "@/time";
import { computed } from "vue";
import Icon from "../Icon.vue";

type Column = {
  name?: string;
  type?: "text" | "date";
  width?: string;
  sortable?: boolean;
  sortAsc?: boolean;
};
const emit = defineEmits<{
  select: [id: string];
}>();
const props = defineProps<{
  columns: Record<string, Column>;
  data: Record<string, any>[];
  idField?: string;
  sortBy?: (column: string) => void;
}>();
const { sortBy = () => {} } = props;

const typeConverters = {
  text: (v: string) => v,
  date: (v: Date) => timeToString(new Date(v)),
};
const gtc = computed(() => {
  const w = [];
  for (const key in props.columns) {
    w.push(props.columns[key]?.width ?? "1fr");
  }
  return w.join(" ");
});
function selectRow(row: Record<string, any>) {
  if (props.idField === undefined) {
    return;
  }
  emit("select", row[props.idField]);
}
</script>

<template>
  <div class="table" :style="{ gridTemplateColumns: gtc }">
    <div class="row header-row">
      <button
        v-for="(column, key) in columns"
        class="cell header-cell"
        :disabled="!column.sortable"
        @click="sortBy(key)"
        :class="{ sortable: column.sortable }">
        <span>{{ column.name ?? key }}</span>
        <Icon
          icon="sort"
          :size="12"
          v-if="column.sortable && column.sortAsc === undefined" />
        <Icon icon="caret-up" :size="12" v-if="column.sortAsc === true" />
        <Icon icon="caret-down" :size="12" v-if="column.sortAsc === false" />
      </button>
    </div>
    <button
      class="row data-row"
      v-for="row in data"
      @click.prevent="selectRow(row)">
      <div v-for="(column, key) in columns" class="cell data-cell">
        {{ typeConverters[column.type ?? "text"](row[key]) }}
      </div>
    </button>
  </div>
</template>

<style scoped>
.table {
  display: grid;
  overflow: auto;
  border-radius: 8px;
  gap: 1px;
  background-color: var(--color-surface-2);
}
.row {
  display: grid;
  grid-column: 1 / -1;
  grid-template-columns: subgrid;
}

.header-row {
  position: sticky;
  top: 0px;
  background-color: var(--color-primary);
  color: var(--color-surface-1);
  font: var(--font-heading-small);
}

.data-row {
  background-color: var(--color-surface-1);
  cursor: pointer;
  text-align: unset;
  font: unset;
  border: none;
}

.data-row:hover {
  background-color: var(--color-surface-2);
}

.cell {
  padding: 16px;
  text-wrap: nowrap;
}

.header-cell {
  display: flex;
  justify-content: space-between;
  background-color: unset;
  border: none;
  color: inherit;
  font: inherit;
}
.header-cell.sortable {
  cursor: pointer;
}
.header-cell.sortable:hover {
  background-color: var(--color-primary-shade);
}
.header-cell.sortable:active {
  background-color: var(--color-primary-shadier);
}
</style>
