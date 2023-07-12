import { filterToQueryParameters } from '../utils/formats'
import { dropshipFetch } from './axios'

class PackageApi {
  async getPackages(filter) {
    const {
      page,
      perPage,
      query,
      created_from,
      created_to,
      updated_from,
      updated_to,
      commune_id,
      wilaya_id,
      type,
      delivery_type_id,
      store_payment_status,
      situation,
      status,
    } = filter

    let url = '/packages?include=status,commune.wilaya,delivery_type&'

    if (page) {
      url += `page=${page}&`
    }

    if (perPage) {
      url += `per_page=${perPage}&`
    }

    if (query) {
      url += `filter[query]=${query}&`
    }

    if (situation !== 'all') {
      url += `filter[situation_id]=${situation}&`
    }

    if (status !== 'all') {
      url += `filter[status_id]=${status}&`
    }

    if (created_from) {
      url += `filter[created_from]=${created_from}&`
    }

    if (created_to) {
      url += `filter[created_to]=${created_to}&`
    }

    if (updated_from) {
      url += `filter[updated_from]=${updated_from}&`
    }

    if (updated_to) {
      url += `filter[updated_to]=${updated_to}&`
    }

    if (commune_id) {
      url += `filter[commune_id]=${commune_id}&`
    }

    if (wilaya_id) {
      url += `filter[wilaya_id]=${wilaya_id}&`
    }

    if (type) {
      url += `filter[type]=${type}&`
    }

    if (delivery_type_id) {
      url += `filter[delivery_type_id]=${delivery_type_id}&`
    }

    if (store_payment_status && store_payment_status !== 0) {
      url += `filter[store_payment_status]=${store_payment_status}&`
    }

    const { data } = await dropshipFetch(url)

    return data
  }

  async getPackage(id) {
    const { data } = await dropshipFetch(
      `/packages/?include=status.situation,commune,commune.wilaya,delivery_type&filter[id]=${id}`,
    )
    return data.data?.[0]
  }

  async getPackagesStatusStats(id) {
    let data = null
    let error = null
    try {
      const { data: result } = await dropshipFetch(`/packages/stats/by-status`)
      data = result.data.sort((s1, s2) => s1.status_id - s2.status_id)
    } catch (err) {
      error = err.response.data
    }
    return { error, data }
  }

  async getPackagesSituationStats(id) {
    let data = null
    let error = null
    try {
      const { data: result } = await dropshipFetch(
        `/packages/stats/by-situation`,
      )
      data = result.data.sort((s1, s2) => s1.id - s2.id)
    } catch (err) {
      error = err.response.data
    }
    return { error, data }
  }

  async updatePackageStatus({ package_ids, status }) {
    let error = null
    let data = null
    try {
      const { data: result } = await dropshipFetch.put(`/packages/status`, {
        package_ids,
        status,
      })
      data = result
    } catch (err) {
      error = err.response.data
    }

    return { error, data }
  }

  async importPackages(formData) {
    let error = null
    let data = null
    try {
      const { data: result } = await dropshipFetch.post(
        '/package-importations',
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

  async getPackageHistory(id) {
    const { data } = await dropshipFetch(`packages/${id}/histories`)
    return data.data
  }

  async createPackage(pack) {
    const { data } = await dropshipFetch.post(`/packages`, pack)
    return data
  }
}

export async function getPackagesTypes() {
  const { data } = await dropshipFetch('/helpers/package-types')
  return data.data
}

export async function getPackages(filter, axiosOptions) {
  const query = filterToQueryParameters(filter)
  const { data } = await dropshipFetch(`/packages${query}`, axiosOptions)
  return { data: data.data, meta: data.meta }
}

export async function getPackagesSituation() {
  const { data } = await dropshipFetch(`/packages/stats/by-situation`)
  return data?.data?.sort((s1, s2) => s1.id - s2.id) || []
}

export const packageApi = new PackageApi()
