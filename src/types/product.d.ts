type Product = {
  id: number
  name: sting
  code?: string
  reference?: string
  short_description?: string
  description?: string
  weight?: number
  width?: number
  height?: number
  thickness?: number
  provider?: string | null
  price: number | string
  price_level?: string
  suggested_price?: number
  quantity: number
  quantity_in_confirmation?: number
  quantity_delivery?: number
  quantity_damaged?: number
  buying_price?: number
  price1?: number
  price2?: number
  price3?: number
  images?: string[]
}

type OrderProduct = {
  order_id: number
  product_id: number
  quantity: number
  price: number
}

type SelectedProduct = {
  id: number
  name: string
  image: string
}

export { SelectedProduct, OrderProduct, Product }