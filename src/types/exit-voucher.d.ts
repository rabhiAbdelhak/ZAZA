type ExitVoucherFilter = {
  include?: string
  page?: number
  'filter[warehouse_name]'?: string
  'filter[date_between]'?: string
  'filter[tracking_code]'?: string
}

type ExitVoucher = {
  id: number
  warehouse?: Warhouse
  warehouse_name: string
  warehouse_id: number
  warehouse_location: string
  products: ExitVoucherProduct[]
  comment?: string
  date: string
  ref?: string
  total_price?: number
  tracking_code: string
  state?: ReceiptStatus
}

type ExitVoucherProduct = {
  id?: number
  product_id?: number
  quantity: number
  reference?: string
  name: string
  images?: string[]
  short_description?: string
}

type ExitVoucherFormData = {
  warehouse_id?: number
  ref?: string
  products: ExitVoucherProduct[]
  comment?: string
  date: string
}
