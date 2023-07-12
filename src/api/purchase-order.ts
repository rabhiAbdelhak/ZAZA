import PurchaseOrderForm from '@/components/dashboard/pruchase-order/purchase-order-form'
import PurchaseOrderProducts from '@/components/dashboard/pruchase-order/purchase-order-products'
import { filterToQueryParameters } from '@/utils/formats'
import { dropshipFetch } from './axios'

export async function getPurchaseOrders(
  filter?: PurchaseOrderFilter,
): Promise<ServerListResponse<PurchaseOrder>> {
  const query = filterToQueryParameters(filter)
  const { data } = await dropshipFetch.get(`/purchase_orders${query}`)
  return { data: data.data, meta: data.meta }
}

export async function getPurchaseOrderDetails(
  purchaseId?: number,
): Promise<PurchaseOrder> {
  const { data } = await dropshipFetch.get(`/purchase_orders/${purchaseId}`)
  return data.data
}

export async function createPurchaseOrder(
  formData: Partial<PurchaseOrderFormData>,
): Promise<void> {
  const dataToSend = {
    ...formData,
    products: formData?.products?.map(({ name, images, ...el }) => el) || [],
  }
  const { data } = await dropshipFetch.post(`/purchase_orders`, dataToSend)
  return data.data
}

export async function editPurchaseOrder(
  purchaseId: number,
  formData: Partial<PurchaseOrderFormData>,
): Promise<PurchaseOrder> {
  const dataToSend = {
    ...formData,
    products:
      formData?.products?.map((el) => ({
        product_id: el?.id || el?.product_id,
        quantity: el.quantity,
        unit_price: el.unit_price,
      })) || [],
  }
  const { data } = await dropshipFetch.put(
    `/purchase_orders/${purchaseId}`,
    dataToSend,
  )
  return data.data
}

export async function validatePurchaseOrder(
  purchaseId: number,
  isPaid: boolean,
): Promise<void> {
  return dropshipFetch.put(
    `purchase_orders/${purchaseId}/validate`,
    isPaid ? { payment: { action: 'paid' } } : undefined,
  )
}
