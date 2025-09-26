import { ref, reactive } from 'vue'

export function usePaginatedApi(apiMethod, defaultFilters = {}, defaultPageSize = 500) {
  const pageSizeOptions = [50, 100, 200, 300, 400, 500]
  const data = ref([])
  const page = ref(1)
  const totalPages = ref(1)
  const pageSize = ref(defaultPageSize)
  const filters = reactive({ ...defaultFilters })
  const loading = ref(false)
  const error = ref(null)

  async function loadData() {
    loading.value = true
    error.value = null
    try {
      // Берём только нужные фильтры без limit/page
      const { fromDate, toDate, barcode, quantity, total_price, warehouse_name, oblast, price } = filters
      const params = {
        fromDate,
        toDate,
        barcode,
        quantity,
        total_price,
        warehouse_name,
        oblast,
        price,
        page: page.value,
        limit: pageSize.value,
      }

      const res = await apiMethod(params)

      if (Array.isArray(res.data)) {
        data.value = res.data
        totalPages.value = res.meta?.last_page || 1
        applyClientFilters()
      } else {
        throw new Error('Неподдерживаемый формат ответа')
      }
    } catch (e) {
      error.value = e
      console.error(e)
    } finally {
      loading.value = false
    }
  }

  function applyFilters() {
    page.value = 1
    loadData()
  }

  // Клиентская фильтрация
  function applyClientFilters() {
    data.value = data.value.filter(item => {
      const barcode = String(item.barcode || '')
      const quantity = String(item.quantity || '')
      const total_price = String(item.total_price || '')
      const warehouse = String(item.warehouse_name || '').toLowerCase()
      const oblast = String(item.oblast || '').toLowerCase()
      const price = String(item.price || '')

      return (
        (!filters.barcode || barcode.includes(filters.barcode)) &&
        (!filters.quantity || quantity.includes(filters.quantity)) &&
        (!filters.total_price || total_price.includes(filters.total_price)) &&
        (!filters.warehouse_name || warehouse.includes(filters.warehouse_name.toLowerCase())) &&
        (!filters.oblast || oblast.includes(filters.oblast.toLowerCase())) &&
        (!filters.price || price.includes(filters.price))
      )
    })
  }

  function nextPage() {
    if (page.value < totalPages.value) {
      page.value++
      loadData()
    }
  }

  function prevPage() {
    if (page.value > 1) {
      page.value--
      loadData()
    }
  }

  function goToPage(n) {
    if (n >= 1 && n <= totalPages.value) {
      page.value = n
      loadData()
    }
  }

  function setPageSize(newSize) {
    const size = Math.min(Number(newSize) || defaultPageSize)
    pageSize.value = size
    page.value = 1 // возвращаемся на первую страницу
    loadData()
  }

  return {
    data,
    filters,
    page,
    totalPages,
    loading,
    error,
    applyFilters,
    nextPage,
    prevPage,
    setPageSize,
    goToPage,
    pageSize,
    pageSizeOptions
  }
}

