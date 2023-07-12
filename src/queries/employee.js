import { useQuery } from '@tanstack/react-query'
import * as employeeAPI from '../api/employee'

export const employeeKeys = {
  all: ['employees'],
}

export function useEmployeesQuery(options) {
  return useQuery({
    ...options,
    queryKey: employeeKeys.all,
    queryFn: () => employeeAPI.getEmployees(),
  })
}
