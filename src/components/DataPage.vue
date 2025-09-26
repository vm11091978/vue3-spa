<!-- src/components/DataPage.vue -->
<template>
  <div>
    <h2>{{ title }}</h2>

    <!-- Фильтры -->
    <div class="filters">
      <div class="filter-inputs">
        <slot name="filters" :filters="filters"></slot>
      </div>
      <!-- <button @click="applyFilters">Apply Filters</button> -->
      <button @click="applyAllFilters">Apply selected filters</button>
    </div>

    <!-- График -->
    <ChartBlock :data="data" :x-field="xField" :y-field="yField" :label="chartLabel" />

    <!-- Таблица -->
    <DataTable :items="data" :columns="columns" />

    <!-- Пагинация -->
    <!-- 
    <div class="pagination">
      <button @click="prevPage" :disabled="page === 1">Prev</button>
      <span>Page {{ page }} / {{ totalPages }}</span>
      <button @click="nextPage" :disabled="page === totalPages">Next</button>
    </div>
    -->
    <div class="pagination">
      <button @click="prevPage" :disabled="page === 1">Prev</button>

      <button
        v-for="n in visiblePages"
        :key="n"
        :class="{ active: n === page }"
        @click="goToPageClick(n)"
      >
        {{ n }}
      </button>

      <button @click="nextPage" :disabled="page === totalPages">Next</button>

      <!-- Выводим информацию о текущей и общей странице -->
      <span class="page-info">Page {{ page }} of {{ totalPages }}</span>
    </div>

    <div v-if="loading">Loading...</div>
    <div v-if="error" class="error">Error: {{ error.message }}</div>
  </div>
</template>

<script setup>
import { toRefs, computed } from 'vue'
import ChartBlock from './ChartBlock.vue'
import DataTable from './DataTable.vue'

const props = defineProps({
  title: String,
  data: Array,
  columns: Array,
  xField: String,
  yField: String,
  chartLabel: String,
  filters: Object,
  page: Number,
  totalPages: Number,
  loading: Boolean,
  error: Object,
  applyFilters: Function,
  nextPage: Function,
  prevPage: Function,
  goToPage: Function,
  selectedPageSize: Number,
  setPageSize: Function
})

function applyAllFilters() {
  // только обновляем pageSize, не вызываем loadData
  if (props.setPageSize && props.selectedPageSize) {
    props.setPageSize(props.selectedPageSize)
  }
  props.applyFilters()
}

// Вычисляем список страниц для отображения
const visiblePages = computed(() => {
  const maxVisible = 7
  const half = Math.floor(maxVisible / 2)
  let start = Math.max(1, props.page - half)
  let end = Math.min(props.totalPages, start + maxVisible - 1)

  if (end - start < maxVisible - 1) {
    start = Math.max(1, end - maxVisible + 1)
  }

  const pages = []
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  return pages
})

// При нажатии на конкретную страницу
function goToPageClick(n) {
  if (n !== props.page && props.goToPage) {
    props.goToPage(n)
  }
}
</script>

<style scoped>
.filters {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  flex-wrap: wrap;
}

.filter-inputs {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.pagination {
  margin-top: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.pagination button {
  padding: 0.3rem 0.6rem;
  border: 1px solid #ccc;
  background: white;
  cursor: pointer;
}

.pagination button.active {
  background: #007bff;
  color: white;
  font-weight: bold;
}

.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.error {
  color: red;
  margin-top: 1rem;
}
</style>

