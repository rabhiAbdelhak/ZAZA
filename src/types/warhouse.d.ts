type Warhouse = {
  id: number
  name: string
  location: string
  products?: any[]
  created_at?: date
  updated_at?: date
  note?: string
}

type WarhouseProduct = {
  id: number
  name: string
  price: number
  images?: string[]
}

type WarehouseListFilter = {
  page?: number
  include?: string
  'filter[name]'?: string
  'filter[location]'?: string
}

type WarehouseFormData = {
  name: string
  location: string
  note?: string
}
