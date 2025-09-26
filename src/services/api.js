const BASE_URL = 'http://109.73.206.144:6969/api'
const API_KEY = 'E6kUTYrYwZq2tN4QEtyzsbEBk3ie'

function buildQuery(params) {
  return new URLSearchParams(params).toString()
}

async function fetchData(endpoint, params = {}) {
  // Добавляем ключ в параметры
  const queryParams = { ...params, key: API_KEY }
  const url = `${BASE_URL}/${endpoint}?${buildQuery(queryParams)}`

  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`Ошибка загрузки ${endpoint}: ${res.statusText}`)
  }
  return res.json()
}

export default {
  getIncomes(params) {
    // Пример params: { dateFrom, dateTo, page, limit }
    return fetchData('incomes', {
      dateFrom: params.fromDate,
      dateTo: params.toDate,
      page: params.page,
      limit: params.limit
    })
  },
  getOrders(params) {
    return fetchData('orders', {
      dateFrom: params.fromDate,
      dateTo: params.toDate,
      page: params.page,
      limit: params.limit
    })
  },
  getSales(params) {
    return fetchData('sales', {
      dateFrom: params.fromDate,
      dateTo: params.toDate,
      page: params.page,
      limit: params.limit
    })
  },
  getStocks(params) {
    return fetchData('stocks', {
      dateFrom: params.fromDate,
      dateTo: params.toDate,
      page: params.page,
      limit: params.limit
    })
  }
}

