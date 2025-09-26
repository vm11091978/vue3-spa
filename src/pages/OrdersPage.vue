<!-- src/pages/OrdersPage.vue -->
<template>
  <DataPage
    title="Orders"
    :data="data"
    :columns="columns"
    x-field="date"
    y-field="total_price"
    chart-label="Order Total price"
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
        Total price:
        <input type="text" v-model="filters.total_price" />
      </label>
      <label>
        Warehouse:
        <input type="text" v-model="filters.warehouse_name" />
      </label>
      <label>
        Oblast:
        <input type="text" v-model="filters.oblast" />
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
} = usePaginatedApi(api.getOrders, {
  fromDate: new Date(Date.now() - 6 * 24 * 3600 * 1000).toISOString().split('T')[0],
  toDate: new Date().toISOString().split('T')[0],
  barcode: '',
  total_price: '',
  warehouse_name: '',
  oblast: ''
})
const selectedPageSize = ref(pageSize.value)

// Отразить колонки таблицы (выборочно)
const columns = ['date', 'barcode', 'total_price', 'warehouse_name', 'oblast']
</script>

