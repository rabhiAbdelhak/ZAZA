import { Menu, MenuItem, Popover } from '@mui/material'
import Typography from '@mui/material/Typography'
import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'

//local imports
import { StatusBadge } from '../../status-badge'
import {
  useOrderToPackageMutaion,
  useUpdateOrderStatusMutation,
} from '../../../queries/order'
import toast from 'react-hot-toast'
import { useState } from 'react'
import OrderConfirmationDialog from './order-confirmation-dialog'
import OrderSuccessOperation from './order-seccess-operation'

const statusList = [
  {
    id: 0,
    name: 'New',
    color: 'info.main',
  },
  {
    id: 1,
    name: 'Confirmed',
    color: 'success.main',
  },
  {
    id: 2,
    name: 'Canceled',
    color: 'error.main',
  },
  {
    id: 3,
    name: 'Failed',
    color: 'warning.main',
  },
]

export default function StatusPoper(props) {
  const { orderid, anchorEl, handleClose, open, settings, currentStatus } =
    props
  const [openTransformationDialog, setOpenTransformationDialog] =
    useState(false)
  const [packageCreated, setPackageCreated] = useState(false)
  const { t } = useTranslation()
  const mutation = useUpdateOrderStatusMutation(orderid)
  const formik = useFormik({
    initialValues: {
      status: '',
      create_package: false,
    },
    onSubmit: (values, helpers) => {
      const packageAutoCreationConfigValue =
        settings?.find((set) => set.key === 'order_package_auto_creation')
          ?.value || 2

      if (values.status === 1) {
        if (packageAutoCreationConfigValue === 1) {
          values.create_package = true
        }

        if (packageAutoCreationConfigValue === 3) {
          setOpenTransformationDialog(true)
          return
        }
      } else {
        values.create_package = false
      }
      handleSetStatus(values)
    },
  })

  const orderToPackageMutation = useOrderToPackageMutaion()

  const transfromToPackage = (id) => {
    return toast.promise(
      orderToPackageMutation.mutateAsync({
        id,
      }),
      {
        loading: 'Transforming this order to a package ...',
        success: () => {
          setPackageCreated(true)
          return 'Package Created'
        },
        error: (err) => {
          let error = 'Transformation failed'
          console.log(err.response.data)
          if (err?.response?.data?.data?.message) {
            error = err.response.data?.data?.message
          }
          return error
        },
      },
    )
  }

  const handleSetStatus = (values) => {
    const result = toast.promise(
      mutation.mutateAsync({
        order_ids: [orderid],
        status: values.status,
        create_package: values.create_package,
      }),
      {
        loading: t('toast.Saving'),
        success: () => {
          if (values.create_package) {
            transfromToPackage(orderid)
          }
          return t('toast.SavedSuccessfully')
        },
        error: (err) => {
          return err?.response?.data?.message
        },
      },
    )
    handleClose()
    return result
  }

  const handleStatusChange = (id) => {
    formik.setFieldValue('status', id)
    formik.handleSubmit()
  }

  return (
    <>
      <Popover
        anchorEl={anchorEl}
        open={open}
        onClose={() => {
          handleClose()
        }}
        disableAutoFocus={true}
        disableEnforceFocus={true}
        disableRestoreFocus={true}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        {statusList.map((status, index) => {
          return (
            index > 0 && (
              <MenuItem
                key={status.id}
                disabled={status.id === currentStatus && status.id < 3}
                sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                onClick={() => handleStatusChange(status.id)}
              >
                <StatusBadge color={status.color} />
                <Typography variant="subtitle2" color={status.color}>
                  {t(status.name)}
                </Typography>
              </MenuItem>
            )
          )
        })}
      </Popover>
      <OrderConfirmationDialog
        open={openTransformationDialog}
        onClose={() => setOpenTransformationDialog(false)}
        message={t('orders.Do you want to transfrorm this order to package ?')}
        title={'orders.Transform order to package'}
        onConfirm={() => {
          handleSetStatus({ status: 1, create_package: true })
          setOpenTransformationDialog(false)
        }}
        onCancel={() => {
          setOpenTransformationDialog(false)
          handleSetStatus({ status: 1, create_package: false })
        }}
      />
      <OrderSuccessOperation
        open={packageCreated}
        message={t('orders.CreationAfterConfirmMsg')}
        onClose={() => setPackageCreated(false)}
      />
    </>
  )
}
