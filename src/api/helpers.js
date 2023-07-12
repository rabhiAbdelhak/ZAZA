import { dropshipFetch } from './axios'

export async function getHelpers() {
  let data = null
  let error = null
  try {
    const {
      data: { data: wilayas },
    } = await dropshipFetch('/helpers/wilayas')

    const {
      data: { data: storePaymentSatuses },
    } = await dropshipFetch('/helpers/store-payment-statuses')

    const {
      data: { data: packageTypes },
    } = await dropshipFetch('/helpers/package-types')

    const {
      data: { data: deliveryTypes },
    } = await dropshipFetch('/delivery-types')
    data = { wilayas, deliveryTypes, storePaymentSatuses, packageTypes }
  } catch (err) {
    error = err.response.data
  }

  return { error, data }
}

export async function getWlayaCommunes(id) {
  const {
    data: { data: communes },
  } = await dropshipFetch('/helpers/communes')
  return communes.filter((commune) => commune.wilaya.id === id)
}

export async function getWilayasDeliveryPrices(id) {
  const { data: result } = await dropshipFetch(
    '/delivery-price?wilaya_id=' + id,
  )
  return { data: result.data }
}

export async function getWilayas() {
  const { data } = await dropshipFetch('/helpers/wilayas')
  return data?.data
}

export async function getCommunes() {
  const { data } = await dropshipFetch('/helpers/communes')
  return data?.data
}

export async function getPackageTypes() {
  const { data } = await dropshipFetch('/helpers/package-types')
  return data.data
}

export async function getStorePaymentStatuses() {
  const { data } = await dropshipFetch('/helpers/store-payment-statuses')
  return data.data
}
