import { useEffect, useState } from 'react'
import {
  useAssignSupplierProductsMutation,
  useSupplierProductQuery,
  useUnassignSupplierProductsMutation,
} from '@/queries/supplier'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import SupplierProductsTable from './supplier-products-table'

type SupplierProductsProps = {
  products?: SupplierProduct[]
  onChange: (products: SupplierProduct[]) => void
  supplierId?: number
  disabled?: boolean
}

function SupplierProducts({
  products = [],
  onChange,
  supplierId,
  disabled = false,
}: SupplierProductsProps) {
  const { t } = useTranslation()
  const { data = [], isLoading } = useSupplierProductQuery(supplierId)
  const assignMutation = useAssignSupplierProductsMutation()
  const unassignMutation = useUnassignSupplierProductsMutation()
  const [selectedIds, setSelectedIds] = useState<number[]>([])

  useEffect(() => {
    if (!supplierId || isLoading) {
      return
    }
    onChange(
      data.map((el) => ({
        id: el.id,
        name: el.name,
        price: el.price,
        selected: false,
      })),
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isLoading, supplierId])

  const removeHandler = (productsIds: number[]) => {
    if (!supplierId) {
      onChange(products.filter((el) => !productsIds.includes(el.id)))
      setSelectedIds([])
      return
    }

    toast.promise(
      unassignMutation.mutateAsync({
        productIds: productsIds,
        supplierId,
      }),
      {
        loading: t('toast.Saving'),
        success: () => {
          setSelectedIds([])
          return t('toast.SavedSuccessfully')
        },
        error: (err: any) => err?.response?.data?.message || '',
      },
    )
  }

  const changeHandler = (data: SupplierProduct[]) => {
    if (!supplierId) {
      onChange(data)
      return
    }
    toast.promise(
      assignMutation.mutateAsync({
        products: data,
        supplierId,
      }),
      {
        loading: t('toast.Saving'),
        success: () => t('toast.SavedSuccessfully'),
        error: (err: any) => err?.response?.data?.message || '',
      },
    )
  }

  const loading = Boolean(supplierId && isLoading)
  const isDisabled =
    disabled || assignMutation.isLoading || unassignMutation.isLoading

  return (
    <SupplierProductsTable
      selectedIds={selectedIds}
      onSelectedIds={setSelectedIds}
      disabled={isDisabled}
      products={products}
      isLoading={loading}
      onChange={changeHandler}
      onRemove={removeHandler}
    />
  )
}

export default SupplierProducts
