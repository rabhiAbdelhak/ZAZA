import { filterToQueryParameters } from '@/utils/formats'
import axios from 'axios'
import { dropshipFetch } from './axios'

export async function getPartnerCompanys(
  filter?: PartnerCompanyListFilter,
): Promise<ServerListResponse<PartnerCompany>> {
  const query = filterToQueryParameters(filter)
  const { data } = await dropshipFetch.get(`/delivery-companies${query}`)
  return { data: data.data, meta: data.meta }
}

export async function getPartnerCompanyDetails(
  partnerCompanyId?: number,
): Promise<PartnerCompany> {
  const { data } = await dropshipFetch.get(
    `/delivery-companies/${partnerCompanyId}`,
  )
  console.log(data.data)
  return data.data
}

export async function getPartnerCompanyPricing(
  filter: PartnerCompanyPricingFilter,
  partnerCompanyId?: number,
): Promise<ServerListResponse<{ pricing?: any[] }>> {
  const query = filterToQueryParameters(filter)
  const pricing: any[] = [
    {
      commune_id: 1,
      commune_name: 'chlef',
      delivery_type_id: 1,
      delivery_type_name: 'type1',
      price: 25,
      cod_price: 50,
      return_price: 100,
    },
    {
      commune_id: 2,
      commune_name: 'oued fodda',
      delivery_type_id: 2,
      delivery_type_name: 'type2',
      price: 25,
      cod_price: 50,
      return_price: 100,
    },
    {
      commune_id: 3,
      commune_name: 'boukadir',
      delivery_type_id: 2,
      delivery_type_name: 'type2',
      price: 25,
      cod_price: 50,
      return_price: 100,
    },
    {
      commune_id: 4,
      commune_name: 'commune4',
      delivery_type_id: 3,
      delivery_type_name: 'type3',
      price: 30,
      cod_price: 60,
      return_price: 120,
    },
    {
      commune_id: 5,
      commune_name: 'commune5',
      delivery_type_id: 1,
      delivery_type_name: 'type1',
      price: 20,
      cod_price: 40,
      return_price: 80,
    },
    {
      commune_id: 6,
      commune_name: 'commune6',
      delivery_type_id: 3,
      delivery_type_name: 'type3',
      price: 35,
      cod_price: 70,
      return_price: 140,
    },
    {
      commune_id: 7,
      commune_name: 'commune7',
      delivery_type_id: 2,
      delivery_type_name: 'type2',
      price: 25,
      cod_price: 50,
      return_price: 100,
    },
    {
      commune_id: 8,
      commune_name: 'commune8',
      delivery_type_id: 1,
      delivery_type_name: 'type1',
      price: 20,
      cod_price: 40,
      return_price: 80,
    },
    {
      commune_id: 9,
      commune_name: 'commune9',
      delivery_type_id: 3,
      delivery_type_name: 'type3',
      price: 35,
      cod_price: 70,
      return_price: 140,
    },
    {
      commune_id: 10,
      commune_name: 'commune10',
      delivery_type_id: 1,
      delivery_type_name: 'type1',
      price: 20,
      cod_price: 40,
      return_price: 80,
    },
    {
      commune_id: 11,
      commune_name: 'commune11',
      delivery_type_id: 2,
      delivery_type_name: 'type2',
      price: 25,
      cod_price: 50,
      return_price: 100,
    },
    {
      commune_id: 12,
      commune_name: 'commune12',
      delivery_type_id: 2,
      delivery_type_name: 'type2',
      price: 25,
      cod_price: 50,
      return_price: 100,
    },
    {
      commune_id: 13,
      commune_name: 'commune13',
      delivery_type_id: 3,
      delivery_type_name: 'type3',
      price: 30,
      cod_price: 60,
      return_price: 120,
    },
    {
      commune_id: 14,
      commune_name: 'commune14',
      delivery_type_id: 1,
      delivery_type_name: 'type1',
      price: 20,
      cod_price: 40,
      return_price: 80,
    },
    {
      commune_id: 15,
      commune_name: 'commune15',
      delivery_type_id: 3,
      delivery_type_name: 'type3',
      price: 35,
      cod_price: 70,
      return_price: 140,
    },
    {
      commune_id: 16,
      commune_name: 'commune16',
      delivery_type_id: 1,
      delivery_type_name: 'type1',
      price: 25,
      cod_price: 50,
      return_price: 100,
    },
    {
      commune_id: 17,
      commune_name: 'commune17',
      delivery_type_id: 2,
      delivery_type_name: 'type2',
      price: 25,
      cod_price: 50,
      return_price: 100,
    },
    {
      commune_id: 18,
      commune_name: 'commune18',
      delivery_type_id: 1,
      delivery_type_name: 'type1',
      price: 20,
      cod_price: 40,
      return_price: 80,
    },
    {
      commune_id: 19,
      commune_name: 'commune19',
      delivery_type_id: 2,
      delivery_type_name: 'type2',
      price: 25,
      cod_price: 50,
      return_price: 100,
    },
    {
      commune_id: 20,
      commune_name: 'commune20',
      delivery_type_id: 3,
      delivery_type_name: 'type3',
      price: 30,
      cod_price: 60,
      return_price: 120,
    },
  ]
  const { data } = await dropshipFetch.get(
    `/delivery-companies/${partnerCompanyId}/prices${query}`,
  )

  return data
}

export async function createPartnerCompany(
  partnerCompany: Partial<PartnerCompany>,
): Promise<PartnerCompany> {
  const { ...others } = partnerCompany
  const { data } = await dropshipFetch.post(`/delivery-companies`, {
    ...others,
  })
  return data.data
}

export async function updatePartnerCompany(
  partnerCompany: Partial<PartnerCompany>,
): Promise<PartnerCompany> {
  const { id, name, email, phone, avatar } = partnerCompany
  const { data } = await dropshipFetch.put(`/delivery-companies/${id}`, {
    name,
    location,
  })
  return data.data
}

export async function AddDeliveryTypeToDeliveryCompany(comingData: {
  id: number
  deliveryTypes: DeliveryType[]
}): Promise<PartnerCompany> {
  const { id, deliveryTypes } = comingData
  const { data } = await dropshipFetch.post(
    `/delivery-companies/${id}/types`,
    deliveryTypes,
  )
  return data
}

export async function addPartnerCompanyPricing(
  pricing: PartnerCompanyPricingForm,
  partnerCompanyId: number,
): Promise<PartnerCompany> {
  const { data } = await dropshipFetch.post(
    `/delivery-companies/${partnerCompanyId}/prices`,
    pricing,
  )
  return data.data
}

export async function removePartnerCompany(
  partnerCompanyId: number,
): Promise<void> {
  return dropshipFetch.delete(`/delivery-companies/${partnerCompanyId}`)
}
