type ServerListMeta = {
  current_page: number
  per_page: number
  last_page: number
  total: number
}

type ServerListResponse<T> = {
  meta: ServerListMeta
  data: T[]
}
