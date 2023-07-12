import { number } from 'prop-types'
import { OrderProduct, Product } from './product'

export type AssignedUser = {
  id: number
  name: string
  avatar: string
  created_at?: Date
}

export type Order = {
  id: number
  tracking_code: string
  product_name: string
  order_id: number
  status: number
  profit_margin: number
  sub_total_purchase_price: number
  status_name: string
  package_type: number
  package_type_name: string
  delivery_company_name: string
  client_first_name: string
  client_last_name: string
  client_phone: string
  client_phone2: string | null
  client_address: string
  wilaya_id: number
  commune_id: number
  delivery_type_id: number
  store_id: number
  can_be_opened: boolean
  free_delivery: number
  delivery_price: number
  total_price: number
  price: number
  source: string
  notes: string | null
  updated_at: Date
  created_at: Date
  delivery_type_name: string
  commune: string
  wilaya: string
  products: any[]
  assigned_users: AssignedUser[]
}
