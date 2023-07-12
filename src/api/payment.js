import { dropshipFetch, dropshipFetchTEST } from './axios'

let situations = [
  {
    id: 1,
    name: {
      ar: '',
      fr: 'Préparation',
      en: 'Preparation',
    },
    payments_count: 105,
    icon: '',
    statues: [
      {
        id: 1,
        payments_count: 30,
      },
      {
        id: 2,
        payments_count: 40,
      },
      {
        id: 3,
        payments_count: 10,
      },
      {
        id: 4,
        payments_count: 25,
      },
    ],
  },
  {
    id: 2,
    name: {
      ar: '',
      fr: '',
      en: 'Delivery',
    },
    payments_count: 30,
    icon: '',
    statues: [
      {
        id: 1,
        payments_count: 5,
      },
      {
        id: 2,
        payments_count: 15,
      },
      {
        id: 3,
        payments_count: 2,
      },
      {
        id: 4,
        payments_count: 8,
      },
    ],
  },
  {
    id: 3,
    name: {
      ar: '',
      fr: '',
      en: 'Return',
    },
    payments_count: 17,
    icon: '',
    statues: [
      {
        id: 1,
        payments_count: 0,
      },
      {
        id: 2,
        payments_count: 3,
      },
      {
        id: 3,
        payments_count: 4,
      },
      {
        id: 4,
        payments_count: 10,
      },
    ],
  },
  {
    id: 4,
    name: {
      ar: '',
      fr: 'Retournée',
      en: 'Failed',
    },
    payments_count: 2,
    icon: '',
    statues: [
      {
        id: 1,
        payments_count: 0,
      },
      {
        id: 2,
        payments_count: 0,
      },
      {
        id: 3,
        payments_count: 0,
      },
      {
        id: 4,
        payments_count: 2,
      },
    ],
  },
]

let pack = {
  order_id: '322',
  created_at: '20-12-2022',
  client_first_name: 'Rabhi',
  client_last_name: 'abdelhak',
  client_address: 'cite n°01 oued fodda chlef',
  wilaya_id: '02',
  commune_id: '03',
  client_phone: '0542002523',
  client_phone2: '',
  tracking_code: '456789',
  quantity: 200,
  name: 'Watch Apple 456',
  price: 25000,
  amount_charge: 30000,
  type: 'Express',
  weight: 100,
  delivery_cost: 2000,
  cost_extra_weight: 0.0,
  can_be_opened: true,
  notes: '',
  history: [
    {
      id: 1,
      description: 'Order status changed from Pending payment to Completed',
      created_at: '08-11-2022',
    },
    {
      id: 2,
      description: 'Order status changed from Pending payment to Failed',
      reason: "Buyer don't pick up the phone",
      created_at: '10-11-2022',
    },
  ],
}

class PaymentApi {
  async getPayments(filter) {
    const { page, per_page, query } = filter
    let url = '/payments?'
    if (query) {
      url += `filter[query]=${query}`
    }

    const { data } = await dropshipFetch(url)

    return data
  }

  async getPayment(id) {
    let data = null
    let error = null
    try {
      //const { data: result } = await dropshipFetch(`/payments/${id}`);
      //data = result;
    } catch (err) {
      //error = err.response.data;
    }
    return { error: null, data: pack }
  }

  async getPaymentsStatusStats(id) {
    let data = null
    let error = null
    let situations = []
    try {
      const { data: result } = await dropshipFetch(`/payments/stats/by-status`)
      data = result.data.sort((s1, s2) => s1.status_id - s2.status_id)
    } catch (err) {
      error = err.response.data
    }
    return { error, data }
  }

  async getPaymentsVerificationState({
    amount,
    delivered_packages,
    returned_packages,
  }) {
    let data = null
    let error = null
    try {
      const { data: data_check_amount } = await dropshipFetch.post(
        `/delivery/check_amount`,
        {
          amount,
          delivered_packages,
          returned_packages,
        },
      )
      data = data_check_amount
    } catch (err) {
      error = err.response.data
    }

    return {
      data,
      error,
    }
  }

  async getPaymentsConfirmation({ total, package_ids }) {
    let data = null
    let error = null
    try {
      data = await dropshipFetch.post(`/payments`, {
        total,
        package_ids,
      })
    } catch (err) {
      error = err.response.data
    }

    return {
      data,
      error,
    }
  }

  // async getPaymentsConfirmation({ total, package_ids }) {
  //   const { data } = dropshipFetch.post(`/payments`, {
  //     total,
  //     package_ids,
  //   })
  //   return { data }
  // }

  async getPayementAgregations() {
    const { data } = await dropshipFetch('/payments/stats/by-package-status')
    return data.data
  }

  async confirmPayment(id) {
    const { data } = await dropshipFetch.put(`payments/${id}/confirmation`)
    return data.data
  }
}

export const paymentApi = new PaymentApi()
