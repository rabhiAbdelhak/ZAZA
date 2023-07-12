import CommuneAutocomplete from '@/components/CommuneAutocomplete'
import { InputField } from '@/components/input-field'
import {
  BoxProps,
  Button,
  Card,
  CardActionArea,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Box,
} from '@mui/material'
import { useFormik } from 'formik'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import AddIcon from '@mui/icons-material/Add'
import { MouseEvent, useState } from 'react'
import * as Yup from 'yup'
import { useTranslation } from 'react-i18next'
import { Scrollbar } from '@/components/scrollbar'
import SupplierEnhancedToolbar from './SupplierEnhancedToolbar'
import { ResourceUnavailable } from '@/components/resource-unavailable'
import {
  useAddAddressSupplierMutation,
  useRemoveAddressSupplierMutation,
} from '@/queries/supplier'
import toast from 'react-hot-toast'

type SupplierAddress = {
  id?: number
  commune?: Commune
  street?: string
}
type SupplierAddressFormProps = {
  initialValues?: SupplierAddress
  onSubmit: (data: SupplierAddress) => void
  formId?: string
  editMode?: boolean
}

function SupplierAddressForm({
  initialValues,
  onSubmit,
  formId,
  editMode = false,
}: SupplierAddressFormProps) {
  const { t } = useTranslation()
  const formik = useFormik({
    initialValues: {
      commune: initialValues?.commune || undefined,
      street: initialValues?.street || '',
    },
    validationSchema: Yup.object({
      commune: Yup.mixed().required(t('form.FieldRequired')),
      street: Yup.string()
        .min(3, t('form.MinLength', { min: 3 }))
        .required(t('form.FieldRequired')),
    }),
    onSubmit,
  })

  return (
    <form id={formId} onSubmit={formik.handleSubmit}>
      <CommuneAutocomplete
        value={formik.values?.commune}
        onChange={(t, v) => {
          formik.setFieldValue('commune', v)
        }}
        label="Commune"
        error={Boolean(formik.touched.commune && formik.errors.commune)}
        helperText={formik.touched.commune && formik.errors.commune}
      />
      <InputField
        sx={{ mt: 2 }}
        error={Boolean(formik.touched.street && formik.errors.street)}
        fullWidth
        helperText={formik.touched.street && formik.errors.street}
        label="street"
        name="street"
        value={formik.values?.street}
        onChange={formik.handleChange}
      />
    </form>
  )
}

type AddressCardProps = {
  address: Partial<SupplierAddress>
  onRemove?: () => void
  onClick?: () => void
}
function AddressCard({ address, onRemove, onClick }: AddressCardProps) {
  return (
    <Card>
      <CardActionArea
        onClick={onClick}
        sx={{ display: 'flex', gap: 1, alignItems: 'flex-start', p: 1 }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="body2">{`${address?.commune?.name}, ${address?.commune?.wilaya?.name}`}</Typography>
          <Typography variant="body2" color="text.secondary">
            {address?.street}
          </Typography>
        </Box>
        <IconButton
          onClick={(event) => {
            event.stopPropagation()
            onRemove && onRemove()
          }}
        >
          <DeleteOutlineIcon fontSize="small" />
        </IconButton>
      </CardActionArea>
    </Card>
  )
}

type SupplierAddressListProps = {
  addresses?: Partial<SupplierAddress>[]
  onChange?: (addresses: Partial<SupplierAddress>[]) => void
  editMode?: boolean
  disabled?: boolean
  supplierId?: number
} & BoxProps

function SupplierAddressList({
  addresses = [],
  onChange,
  editMode = false,
  disabled = false,
  supplierId,
  ...boxProps
}: SupplierAddressListProps) {
  const [selectedAddress, setSelectedAddress] =
    useState<Partial<SupplierAddress>>()

  const [open, setOpen] = useState(false)
  const [selectedItems, setSelectItems] = useState<Partial<SupplierAddress>[]>(
    [],
  )
  const addMutation = useAddAddressSupplierMutation()
  const removeMutation = useRemoveAddressSupplierMutation()
  const { t } = useTranslation()

  const onOpen = (item?: Partial<SupplierAddress>) => {
    setOpen(true)
    setSelectedAddress(item || undefined)
  }

  const onClose = () => {
    setOpen(false)
    setSelectedAddress(undefined)
  }

  const onSubmit = async (value: SupplierAddress) => {
    if (!onChange) {
      return
    }

    if (!editMode) {
      const data = selectedAddress
        ? addresses.map((el) =>
            el.id === selectedAddress.id ? { ...el, ...value } : el,
          )
        : [value, ...addresses]

      onChange(data)
      onClose()
      return
    }

    if (!value.commune || !value.street || !supplierId) {
      return
    }

    toast.promise(
      addMutation.mutateAsync({
        address: { commune: value.commune, street: value.street },
        supplierId,
      }),
      {
        loading: t('toast.Creating'),
        success: (data) => {
          onChange(data.addresses || [])
          onClose()
          return t('toast.CreatedSuccessfully')
        },
        error: (err: any) => {
          return err?.response?.data?.message || ''
        },
      },
    )
  }

  const isItemChecked = (item: Partial<SupplierAddress>) => {
    return selectedItems.includes(item)
  }

  const removeAddresses = () => {
    if (!onChange) {
      return
    }

    if (!editMode) {
      onChange(addresses.filter((el) => !isItemChecked(el)))
      setSelectItems([])
      return
    }

    if (!supplierId) {
      return
    }

    const addressToRemove = addresses
      .filter((el) => isItemChecked(el) && el.id)
      .map((el) => el.id as number)

    toast.promise(
      removeMutation.mutateAsync({
        addressIds: addressToRemove,
        supplierId,
      }),
      {
        loading: t('toast.Removing'),
        success: (data) => {
          setSelectItems([])
          onChange(data.addresses || [])
          return t('toast.RemovedSuccessfully')
        },
        error: (err: any) => {
          return err?.response?.data?.message || ''
        },
      },
    )
  }

  const onCheckItem = (item: Partial<SupplierAddress>) => {
    setSelectItems(
      isItemChecked(item)
        ? selectedItems.filter((el) => el !== item)
        : [...selectedItems, item],
    )
  }

  const onCheckAllToggle = () => {
    setSelectItems(selectedItems.length < addresses.length ? addresses : [])
  }

  return (
    <Box {...boxProps}>
      <SupplierEnhancedToolbar
        disabled={disabled}
        title="Addresses"
        onRemove={removeAddresses}
        onAdd={() => onOpen()}
        numSelected={selectedItems.length}
      />
      <Scrollbar>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  disabled={disabled}
                  onClick={() => onCheckAllToggle()}
                  color="primary"
                  indeterminate={
                    selectedItems.length < addresses.length &&
                    selectedItems.length > 0
                  }
                  checked={selectedItems.length > 0}
                />
              </TableCell>
              <TableCell>Street</TableCell>
              <TableCell>Commune</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {addresses.map((el, index) => (
              <TableRow
                sx={{ cursor: disabled ? 'auto' : 'pointer' }}
                hover={disabled}
                selected={isItemChecked(el)}
                onClick={() => !disabled && onCheckItem(el)}
                key={`${String(el.id)}-${index}`}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    disabled={disabled}
                    onClick={() => onCheckItem(el)}
                    color="primary"
                    checked={isItemChecked(el)}
                  />
                </TableCell>

                <TableCell>
                  <Typography color="text.secondary" fontSize="inherit">
                    {el.street}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="inherit" fontSize="inherit">
                    {`${el.commune?.name}, ${el.commune?.wilaya?.name}`}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Scrollbar>

      {!addresses.length && <ResourceUnavailable />}

      <Dialog open={open} fullWidth>
        <DialogTitle>
          {selectedAddress ? 'Edit Address' : 'Add Address'}
        </DialogTitle>
        <DialogContent>
          <SupplierAddressForm
            formId="supplier-form-address"
            initialValues={selectedAddress}
            onSubmit={onSubmit}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="inherit">
            Cancel
          </Button>
          <Button
            type="submit"
            form="supplier-form-address"
            variant="contained"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default SupplierAddressList
