<!-- src/pages/IncomesPage.vue -->
<template>
  <DataPage
    title="Incomes"
    :data="data"
    :columns="columns"
    x-field="date"
    y-field="quantity"
    chart-label="Income Quantity"
    :filters="filters"
    :page="page"
    :totalPages="totalPages"
    :loading="loading"
    :error="error"
    :applyFilters="applyFilters"
    :nextPage="nextPage"
    :prevPage="prevPage"
    :goToPage="goToPage"
    :selectedPageSize="selectedPageSize"
    :setPageSize="setPageSize"
  >
    <template #filters="{ filters }">
      <label>
        From:
        <input type="date" v-model="filters.fromDate" />
      </label>
      <label>
        To:
        <input type="date" v-model="filters.toDate" />
      </label>
      <label>
        Process from DB rows per page:
        <select v-model="selectedPageSize">
          <option v-for="size in pageSizeOptions" :key="size" :value="size">
            {{ size }}
          </option>
        </select>
      </label>
      <label>
        Barcode:
        <input type="text" v-model="filters.barcode" />
      </label>
      <label>
        Quantity:
        <input type="text" v-model="filters.quantity" />
      </label>
      <label>
        Warehouse:
        <input type="text" v-model="filters.warehouse_name" />
      </label>
    </template>
  </DataPage>
</template>

<script setup>
import { ref } from 'vue'
import { usePaginatedApi } from '../composables/usePaginatedApi'
import api from '../services/api'
import DataPage from '../components/DataPage.vue'

const {
  data,
  filters,
  page,
  totalPages,
  loading,
  error,
  applyFilters,
  nextPage,
  prevPage,
  goToPage,
  setPageSize,
  pageSize, 
  pageSizeOptions
} = usePaginatedApi(api.getIncomes, {
  fromDate: new Date(Date.now() - 7 * 24 * 3600 * 1000).toISOString().split('T')[0],
  toDate: new Date().toISOString().split('T')[0],
  barcode: '',
  quantity: '',
  warehouse_name: ''
})
const selectedPageSize = ref(pageSize.value)

// Отразить колонки таблицы (выборочно)
const columns = ['date', 'date', 'barcode', 'quantity', 'warehouse_name']
</script>

