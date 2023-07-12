import { dropshipFetch } from './axios'

let prevOptions = null

class OrderApi {
  async getOrders(filter, { signal }) {
    const {
      page,
      per_page,
      query,
      status,
      client_phone,
      created_from,
      created_to,
      client_first_name,
      client_last_name,
      min_price,
      max_price,
      commune_id,
      wilaya_id,
      statuses,
      assigned_users,
      source,
      product,
      tracking_code,
    } = filter

    let data = null
    let error = null
    let url =
      '/orders?include=wilaya,commune,products,assigned_users,delivery_type&'

    if (page) {
      url += `page=${page}&`
    }

    if (per_page) {
      url += `per_page=${per_page}&`
    }
    if (query) {
      url += `filter[query]=${query}&`
    }

    if (status !== 'all') {
      url += `filter[status]=${status}&`
    }

    if (tracking_code) {
      url += `filter[tracking_code]=${tracking_code}&`
    }

    if (source) {
      url += `filter[source]=${source}&`
    }

    if (product) {
      url += `filter[product]=${product}&`
    }

    if (statuses.length) {
      url += `filter[status]=${statuses.join(',')}&`
    }

    if (assigned_users.length) {
      url += `filter[assigned_users]=${assigned_users.join(',')}&`
    }

    if (wilaya_id) {
      url += `filter[wilaya_id]=${wilaya_id}&`
    }

    if (commune_id) {
      url += `filter[commune_id]=${commune_id}&`
    }

    if (client_first_name) {
      url += `filter[client_first_name]=${client_first_name}&`
    }

    if (client_last_name) {
      url += `filter[client_last_name]=${client_last_name}&`
    }

    if (client_phone) {
      url += `filter[client_phone]=${client_phone}&`
    }

    if (commune_id) {
      url += `filter[commune_id]=${commune_id}&`
    }

    if (created_from) {
      url += `filter[created_from]=${created_from}&`
    }

    if (created_to) {
      url += `filter[created_to]=${created_to}&`
    }

    if (min_price) {
      url += `filter[min_price]=${min_price}&`
    }

    if (max_price && max_price !== Infinity) {
      url += `filter[max_price]=${max_price}&`
    }

    const { data: result } = await dropshipFetch(url)
    data = result
    return data
  }

  async getOrder(id) {
    const { data } = await dropshipFetch(
      `/orders?include=wilaya,commune,products,assigned_users,delivery_type,delivery_company&filter[id]=${id}`,
    )
    return data?.data[0]
  }

  async createOrder(orderInfo) {
    let data = null
    let error = null
    let order = { ...orderInfo }
    delete order.commune
    delete order.wilaya
    try {
      const { data: createdOrder } = await dropshipFetch.post('orders/', order)
      data = createdOrder
    } catch (err) {
      error = err.response.data
    }

    return { data, error }
  }

  async updateOrderStatus({ order_ids, status }) {
    let error = null
    let data = null
    try {
      const { data: result } = await dropshipFetch.put(`/orders/status`, {
        order_ids,
        status,
      })
      data = result
    } catch (err) {
      error = err.response.data
    }

    return { error, data }
  }

  async getOrderComments(id) {
    const { data: result } = await dropshipFetch(`/orders/${id}/comments`)
    return result.data
  }

  async getOrderHistory(id) {
    const { data: result } = await dropshipFetch(`/orders/${id}/histories`)
    return result.data
  }

  async addOrderComment({ id, description }) {
    const { data: result } = await dropshipFetch.post(
      `/orders/${id}/comments`,
      { description },
    )

    return result.data
  }

  async importOrders(formData) {
    let error = null
    let data = null
    try {
      const { data: result } = await dropshipFetch.post(
        '/order-importations',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      )
      data = result ? result : null
      if (!result) {
        error = { message: 'The file you uploaded is damaged' }
      }
    } catch (err) {
      error = err.response.data
    }
    return { error, data }
  }

  async AssignToUser({ order_ids, assigned_users }) {
    const { data } = await dropshipFetch.put(
      `/orders/assign`,
      { order_ids, assigned_users },
      { responseType: 'blob', headers: { Accept: 'multipart/form-data' } },
    )
    return data
  }

  async UnAssignUser({ order_ids, unassigned_users }) {
    const { data } = await dropshipFetch.delete(`/orders/assign`, {
      params: { order_ids, unassigned_users },
      responseType: 'blob',
      headers: { Accept: 'multipart/form-data' },
    })
    return data
  }

  async updateOrder(id, infoToUpdate) {
    const order = { ...infoToUpdate }
    delete order.wilaya
    delete order.commune
    delete order.delivery_type_name
    delete order.delivery_price
    const { data: result } = await dropshipFetch.patch(`/orders/${id}`, order)
    return result.data
  }

  async updateOrderProducts(id, products) {
    const { data: result } = await dropshipFetch.put(`/orders/${id}`, {
      products,
    })
    return result.data
  }

  async getOrdersByStatusStats() {
    const { data } = await dropshipFetch.get('/orders/stats/by-status')
    return data.data
  }

  async exportOrders(order_ids) {
    const { data } = await dropshipFetch('/order-export', {
      responseType: 'blob',
      params: { order_ids },
    })
    return data
  }

  async transformOrderToPackage(id) {
    const { data } = await dropshipFetch.post(`/orders/${id}/to-package`)
    return data
  }
}

export const orderApi = new OrderApi()
