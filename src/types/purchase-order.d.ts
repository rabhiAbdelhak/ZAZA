type PurchaseOrderFilter = {
  include?: string
  page?: number
  'filter[supplier_name]'?: string
  'filter[date_between]'?: string
  'filter[tracking_code]'?: string
  'filter[origin]'?: string
}

type PurchaseOrder = {
  id: number
  supplier: Supplier
  products: PurchaseOrderProduct[]
  comment?: string
  origin?: string
  date: string
  total_price: number
  tracking_code: string
  state?: ReceiptStatus
}

type PurchaseOrderProduct = {
  id?: number
  product_id: number
  quantity: number
  unit_price: number
  name: string
  images?: string[]
}

type PurchaseOrderFormData = {
  supplier_id?: number
  origin?: string
  products: PurchaseOrderProduct[]
  comment?: string
  date: string
}
