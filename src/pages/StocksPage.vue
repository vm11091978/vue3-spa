<!-- src/pages/StocksPage.vue -->
<template>
  <DataPage
    title="Stocks"
    :data="data"
    :columns="columns"
    x-field="date"
    y-field="price"
    chart-label="Stocks Price"
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
        Warehouse:
        <input type="text" v-model="filters.warehouse_name" />
      </label>
      <label>
        Price:
        <input type="text" v-model="filters.price" />
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
} = usePaginatedApi(api.getStocks, {
  fromDate: new Date().toISOString().split('T')[0], // дата сегодня по UTC
  toDate: '',
  barcode: '',
  warehouse_name: '',
  price: ''
})
const selectedPageSize = ref(pageSize.value)

// Отразить колонки таблицы (выборочно) 
const columns = ['date', 'barcode', 'warehouse_name', 'price']
</script>

