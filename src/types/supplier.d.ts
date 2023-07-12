type SupplierAddress = { id: number; commune: Commune; street: string }
type SupplierContact = {
  id: number
  name: string
  phone: string
  email?: string
}
type Supplier = {
  id: number
  name: string
  contacts?: SupplierContact[]
  website?: string
  addresses?: SupplierAddress[]
  comment?: string
  logo?: string
  products?: any[]
  total_purchase_amount?: number
  amount_paid?: number
  rest_to_pay?: number
}

type PostSupplier = Omit<Supplier, 'id'>

type SupplierListFilter = {
  page?: number
  include?: string
  'filter[name]'?: string
  'filter[email]'?: string
  'filter[phone]'?: string
  'filter[website]'?: string
  'filter[commune]'?: string
  'filter[has_payments]'?: number
}

type SupplierProduct = {
  id: number
  name: string
  price: number
  images?: string[]
}

type SupplierPayment = {
  id: number
  date: string
  amount: number
  tracking_code: string
  supplier_id: number
  supplier_name: string
  state: ReceiptStatus
}

type SupplierPaymentsFilter = {
  'filter[tracking_code]'?: string
  'filter[supplier_name]'?: string
  'filter[date_from]'?: string
  'filter[date_to]'?: string
  page?: number
  include?: string
}
