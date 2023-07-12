import { format, formatISO } from 'date-fns'
import { dropshipFetch } from './axios'

export const getLandings = async (filter) => {
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
  const { data } = await dropshipFetch(`/landings${query}`)
  return { landings: data.data, meta: data.meta }
}

export const deleteLanding = async (id) => {
  const { data } = await dropshipFetch.delete('/landings/' + id)
  return data.data
}

export const getLandingDetails = async (id) => {
  const { data } = await dropshipFetch(`/landings/${id}`)
  return data.data
}

const createFormData = (data) => {
  const formData = new FormData()
  const startDate = data?.start_date
    ? formatISO(new Date(data.start_date), { representation: 'date' })
    : ''
  const endDate = data?.end_date
    ? formatISO(new Date(data.end_date), { representation: 'date' })
    : ''

  formData.append('name', data?.name)
  formData.append('price', data?.price)
  formData.append('promo_price', data?.promo_price)
  formData.append('delivery_type_id', data?.delivery_type_id)
  formData.append('free_delivery', Number(data?.free_delivery))
  formData.append('can_be_opened', Number(data?.can_be_opened))
  formData.append('note', data?.note)
  formData.append('social_media[instagram]', data?.instagram)
  formData.append('social_media[tiktok]', data?.tiktok)
  formData.append('social_media[snapchat]', data?.snapchat)
  formData.append('social_media[youtube]', data?.youtube)
  formData.append('social_media[facebook]', data?.facebook)
  formData.append('google_tag_ids', data?.google_tag_ids)
  formData.append('facebook_pixel_ids', data?.facebook_pixel_ids)
  formData.append('phone', data?.phone)
  formData.append('whatsapp', data?.whatsapp)
  formData.append(
    'is_whatsapp_confirmation_shown',
    Number(data?.is_whatsapp_confirmation_shown),
  )

  formData.append('email', data?.email)
  formData.append('main_color', data?.main_color)
  formData.append('template_id', data?.template_id)
  formData.append('short_description', data?.short_description)
  formData.append('description', data?.description)
  formData.append('thank_you_message', data?.thank_you_message)
  formData.append('start_date', startDate)
  formData.append('end_date', endDate)

  data?.domains?.forEach((el) => {
    formData.append('domains[]', el.id)
  })

  if (data?.image instanceof File) {
    formData.append('image[]', data?.image)
  }

  data?.products?.forEach((el, index) => {
    formData.append(`products[${index}][product_id]`, el.id)
    formData.append(`products[${index}][quantity]`, el.selectedQty)
  })

  return formData
}

export const updateLanding = async (landingId, landingData) => {
  const formData = createFormData(landingData)
  formData.append('_method', 'PUT')
  const { data } = await dropshipFetch.post(`/landings/${landingId}`, formData)
  return data.data
}

export const createLanding = async (data) => {
  const formData = createFormData(data)
  await dropshipFetch.post('/landings', formData)
}
