import { dropshipFetch } from './axios'

export async function getDeliveryTypes() {
  const { data } = await dropshipFetch('/delivery-types')
  return data.data
}

export async function getDeliveryCostByWilayaId(wilayaId) {
  const { data } = await dropshipFetch(`/delivery-price?wilaya_id=${wilayaId}`)
  return data.data
}

export async function getOfficeDeliveryCost(filter) {
  const params = []
  if (filter) {
    for (const property in filter) {
      const value = filter[property]
      if (value) {
        params.push(`${property}=${value}`)
      }
    }
  }
  const query = params?.length ? `?${params.join('&')}` : ''
  const { data } = await dropshipFetch(`/offices${query}`)
  return data.data
}

export async function AddDeliveryTypeToDeliveryCompany(comingData) {
  const { id, deliveryTypes } = comingData
  const { data } = await dropshipFetch.post(
    `/delivery-companies/${id}/types`,
    deliveryTypes,
  )
  return data
}

export async function getDeliveryTypeByDeliveryCompany(DeliveryCompanyID) {
  if (DeliveryCompanyID) {
    const { data } = await dropshipFetch(
      `/delivery-companies/${DeliveryCompanyID}/types`,
    )
    return data.data
  }
}

export async function getDeliveryCompanies() {
  const { data } = await dropshipFetch(
    `/delivery-companies?include=offices,delivery_types`,
  )
  return data
}

export async function getDeliveryCompaniesOffices(communeId, companyId) {
  const { data } = await dropshipFetch(
    `/delivery-companies/${companyId}/offices?include=commune.wilaya,delivery_company&filter[commune_id]=${communeId}`,
  )
  return data.data
}

export async function useGetDeliveryTypeByDeliveryCompany(
  communeId,
  companyId,
) {
  const { data } = await dropshipFetch(
    `/delivery-companies/${companyId}/prices?include=commune,delivery_type&filter[commune_id]=${communeId}`,
  )
  return data.data
}
