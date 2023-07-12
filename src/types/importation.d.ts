type PackageImportationListItem = {
  id: number
  type: string
  user_id: number
  packages_count?: number
  created_at: string
  updated_at: string
}

type PackageImportationList = {
  data: PackageImportationListItem[]
  meta: ServerListMeta
}

type PackageImportationListFilter = {
  page?: number
  include?: string
  'filter[user_id]'?: string
  'filter[id]'?: string
  'filter[created_from]'?: string | Date
  'filter[created_to]'?: string | Date
  'filter[updated_from]'?: string | Date
  'filter[updated_to]'?: string | Date
}

type PackageImportationDetail = {
  id: number
  packages: Package[]
  created_at: string
}

type ImportOption = {
  id: 'excel' | 'shopify' | 'wooocommerce' | 'facebook' | 'sheet'
  label: string
  icon: string
}
type MapInnerItem = {
  field: string
  mappedFiled: string
  required: boolean
}

type ImportEntity = {
  id: 'products' | 'orders' | 'clients' | 'suppliers' | 'packages'
  label: string
  link: string
  mapping: MapInnerItem[]
}
type Option = ImportOption | ImportEntity
