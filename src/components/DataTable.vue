<!-- src/components/DataTable.vue -->
<template>
  <table class="data-table">
    <thead>
      <tr>
        <th>№</th>
        <th v-for="col in columns" :key="col">
          {{ formatHeader(col) }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in items" :key="index">
        <td>{{ index + 1 }}</td>
        <td v-for="col in columns" :key="col">
          {{ item[col] }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
defineProps({
  items: Array,
  columns: Array
})

// Функция для красивого отображения заголовков
function formatHeader(key) {
  return key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
}
</script>

<style scoped>
.data-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

.data-table th,
.data-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.data-table th {
  background-color: #f2f2f2;
  font-weight: bold;
}
</style>

