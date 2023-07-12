export const initialPayementsFilters = {}

export const paymentsInitialState = {
  payments: [],
  loading: false,
  isError: false,
  errors: null,
  pagination: { page: 1, totalPages: 0, perPage: 10 },
  query: '',
  totalPayements: 0,
  sort: 'desc',
  sortBy: 'createdAt',
  filters: initialPayementsFilters,
}
