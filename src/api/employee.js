import { dropshipFetch } from './axios'

export async function getEmployees() {
  const { data } = await dropshipFetch.get('/employees')
  return data.data
}

export async function createEmploye(employee) {
  const { data } = await dropshipFetch.post('/employees', employee)
  return data?.data
}

export async function updateEmploye(employee) {
  const { password, ...otherProps } = employee || {}
  const dataToSend = password ? employee : otherProps
  const { data } = await dropshipFetch.put(
    `/employees/${employee.id}`,
    dataToSend,
  )
  return data?.data
}

export async function removeEmploye(employeeId) {
  return dropshipFetch.delete(`/employees/${employeeId}`)
}
