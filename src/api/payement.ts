import { filterToQueryParameters } from '@/utils/formats'
import { dropshipFetch } from './axios'

export async function validatePayment(paymentId: number): Promise<void> {
  return dropshipFetch.put(`/supplier_payment_journals/${paymentId}/validate`)
}

export async function cancelPayment(paymentId: number): Promise<void> {
  return dropshipFetch.put(`/supplier_payment_journals/${paymentId}/cancel`)
}
