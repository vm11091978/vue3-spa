<!-- src/components/ChartBlock.vue -->
<template>
  <canvas ref="canvas"></canvas>
</template>

<script setup>
import { onMounted, ref, watch, computed } from 'vue'
import Chart from 'chart.js/auto'

const props = defineProps({
  data: {
    type: Array,
    required: true
  },
  xField: {
    type: String,
    required: true
  },
  yField: {
    type: String,
    required: true
  },
  label: {
    type: String,
    default: 'Chart'
  }
})

const canvas = ref(null)
let chartInstance = null

// Создаём chart.js-совместимый объект данных
const chartData = computed(() => ({
  labels: props.data.map(item => item[props.xField]),
  datasets: [
    {
      label: props.label,
      data: props.data.map(item => item[props.yField]),
      backgroundColor: 'rgba(75, 192, 192, 0.5)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1
    }
  ]
}))

// Создаём график при монтировании
onMounted(() => {
  if (canvas.value) {
    chartInstance = new Chart(canvas.value, {
      type: 'bar',
      data: chartData.value,
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: props.label
          },
          legend: {
            display: true
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    })
  }
})

// Обновляем график при изменении данных
watch(chartData, (newData) => {
  if (chartInstance) {
    chartInstance.data = newData
    chartInstance.update()
  }
})
</script>

