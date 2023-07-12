type EnterVoucherFilter = {
  include?: string
  page?: number
  'filter[warehouse_name]'?: string
  'filter[date_between]'?: string
  'filter[tracking_code]'?: string
}

type EnterVoucher = {
  id: number
  warehouse?: Warhouse
  warehouse_name: string
  warehouse_id: number
  warehouse_location: string
  products: EnterVoucherProduct[]
  comment?: string
  date: string
  ref?: string
  tracking_code: string
  state?: ReceiptStatus
}

type EnterVoucherProduct = {
  id?: number
  product_id?: number
  quantity: number
  reference?: string
  name: string
  images?: string[]
  short_description?: string
}

type EnterVoucherFormData = {
  warehouse_id?: number
  ref?: string
  products: EnterVoucherProduct[]
  comment?: string
  date: string
}
