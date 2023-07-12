type StorePartnerCompany = {
  id: number
  name: string
  phones: string
}

type UserPartnerCompany = {
  id: 2714
  name: string
  phone: string
  email?: string
  store: StorePartnerCompany
}

type PartnerCompany = {
  id: number
  name: string
  phone: string
  email?: string
  store?: StorePartnerCompany
  address?: string | null
  avatar?: string
  roles?: string
  commune?: Commune
  societe_partenaire?: any
  delivery_types?: DeliveryType[]
  user?: UserPartnerCompany
  pending_payments: number
  recieved_payments: number
  total_payments: number
  created_at?: date
  updated_at?: date
}

type PartnerCompanyListFilter = {
  page?: number
  include?: string
  'filter[name]'?: string
  'filter[phone]'?: string
  'filter[store_name]': string
}

type PartnerCompanyFormData = {
  name: string
  phone: string
  delivery_types?: DeliveryType[]
  note?: string
}

type PartnerCompanyPricingForm = {
  delivery_type_id: number
  price: number
  cod_price: number
  return_price: number
  commune_ids: number[]
}

type CommunePricesRow = {
  commune_id: number
  commune_name: string
  delivery_type_id?: number
  delivery_type_name: string
  price: number
  cod_price: number
  return_price: number
}

type PartnerCompanyPricingFilter = {
  page?: number
  include: string
  'filter[query]': string
  'filter[wilaya_id]': number
  'filter[delivery_type_id]'?: number
  'filter[commune_name]'?: string
}
