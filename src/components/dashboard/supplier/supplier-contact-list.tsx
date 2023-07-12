import { InputField } from '@/components/input-field'
import {
  Avatar,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Checkbox,
  Box,
  BoxProps,
} from '@mui/material'
import { useFormik } from 'formik'

import { MouseEvent, useState } from 'react'
import * as Yup from 'yup'
import { useTranslation } from 'react-i18next'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import EmailIcon from '@mui/icons-material/Email'
import { getInitials } from '@/components/CustomAvatar'
import { Scrollbar } from '@/components/scrollbar'
import SupplierEnhancedToolbar from './SupplierEnhancedToolbar'
import { ResourceUnavailable } from '@/components/resource-unavailable'
import toast from 'react-hot-toast'
import {
  useAddContactSupplierMutation,
  useRemoveContactSupplierMutation,
} from '@/queries/supplier'

type SupplierContact = {
  id?: number
  name: string
  phone: string
  email?: string
}

type SupplierContactFormProps = {
  initialValues?: Partial<SupplierContact>
  onSubmit: (data: SupplierContact) => void
  formId?: string
}

function SupplierContactForm({
  initialValues,
  onSubmit,
  formId,
}: SupplierContactFormProps) {
  const { t } = useTranslation()
  const formik = useFormik({
    initialValues: {
      name: initialValues?.name || '',
      phone: initialValues?.phone || '',
      email: initialValues?.email || '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, t('form.MinLength', { min: 2 }))
        .required(t('form.FieldRequired')),
      phone: Yup.string()
        .min(8, t('form.MinLength', { min: 8 }))
        .required(t('form.FieldRequired')),
      email: Yup.string().email(t('form.MustBeAvalidEmail')),
    }),
    onSubmit,
  })
  return (
    <form id={formId} onSubmit={formik.handleSubmit}>
      <InputField
        error={Boolean(formik.touched.name && formik.errors.name)}
        fullWidth
        helperText={formik.touched.name && formik.errors.name}
        label={t('form.FullName')}
        name="name"
        value={formik.values?.name}
        onChange={formik.handleChange}
      />

      <InputField
        sx={{ mt: 2 }}
        error={Boolean(formik.touched.phone && formik.errors.phone)}
        fullWidth
        helperText={formik.touched.phone && formik.errors.phone}
        label={t('form.PhoneNumber')}
        name="phone"
        value={formik.values?.phone}
        onChange={formik.handleChange}
      />

      <InputField
        sx={{ mt: 2 }}
        error={Boolean(formik.touched.email && formik.errors.email)}
        fullWidth
        helperText={formik.touched.email && formik.errors.email}
        label={t('form.EmailAddress')}
        name="email"
        value={formik.values?.email}
        onChange={formik.handleChange}
      />
    </form>
  )
}

type SupplierContactListProps = {
  contacts?: Partial<SupplierContact>[]
  onChange?: (addreses: Partial<SupplierContact>[]) => void
  sx?: BoxProps['sx']
  disabled?: boolean
  editMode?: boolean
  supplierId?: number
}

function SupplierContactList({
  contacts = [],
  sx,
  onChange,
  disabled = false,
  editMode = false,
  supplierId,
}: SupplierContactListProps) {
  const [selectedAddress, setSelectedAddress] =
    useState<Partial<SupplierContact>>()

  const [open, setOpen] = useState(false)
  const [selectedItems, setSelectItems] = useState<Partial<SupplierContact>[]>(
    [],
  )

  const { t } = useTranslation()
  const addMutation = useAddContactSupplierMutation()
  const removeMutation = useRemoveContactSupplierMutation()

  const onOpen = (item?: Partial<SupplierContact>) => {
    setOpen(true)
    setSelectedAddress(item || undefined)
  }

  const onClose = () => {
    setOpen(false)
  }

  const onSubmit = (value: SupplierContact) => {
    if (!onChange) {
      return
    }

    if (!editMode) {
      const data = selectedAddress
        ? contacts.map((el) =>
            el.id === selectedAddress.id ? { ...el, ...value } : el,
          )
        : [value, ...contacts]

      onChange(data)
      onClose()
      return
    }

    if (!supplierId || !value.name || !value.phone) {
      return
    }

    toast.promise(
      addMutation.mutateAsync({
        contact: { name: value.name, email: value.email, phone: value.phone },
        supplierId,
      }),
      {
        loading: t('toast.Creating'),
        success: (data) => {
          onChange(data.contacts || [])
          onClose()
          return t('toast.CreatedSuccessfully')
        },
        error: (err: any) => {
          return err?.response?.data?.message || ''
        },
      },
    )
  }
  const isItemChecked = (item: Partial<SupplierContact>) => {
    return selectedItems.includes(item)
  }

  const removeContacts = () => {
    if (!onChange) {
      return
    }
    if (!editMode) {
      onChange(contacts.filter((el) => !isItemChecked(el)))
      setSelectItems([])
      return
    }

    if (!supplierId) {
      return
    }

    const contactsToRemove = contacts
      .filter((el) => isItemChecked(el) && el.id)
      .map((el) => el.id as number)

    toast.promise(
      removeMutation.mutateAsync({
        contactIds: contactsToRemove,
        supplierId,
      }),
      {
        loading: t('toast.Removing'),
        success: (data) => {
          setSelectItems([])
          onChange(data.contacts || [])
          return t('toast.RemovedSuccessfully')
        },
        error: (err: any) => {
          return err?.response?.data?.message || ''
        },
      },
    )
  }

  const onCheckItem = (item: Partial<SupplierContact>) => {
    setSelectItems(
      isItemChecked(item)
        ? selectedItems.filter((el) => el !== item)
        : [...selectedItems, item],
    )
  }

  const onCheckAllToggle = () => {
    setSelectItems(selectedItems.length < contacts.length ? contacts : [])
  }
  return (
    <Box sx={sx}>
      <SupplierEnhancedToolbar
        title="Contacts"
        onRemove={removeContacts}
        onAdd={() => onOpen()}
        numSelected={selectedItems.length}
        disabled={disabled}
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
                    selectedItems.length < contacts.length &&
                    selectedItems.length > 0
                  }
                  checked={selectedItems.length > 0}
                />
              </TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contacts.map((el, index) => (
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

                <TableCell
                  sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                >
                  <Avatar sx={{ width: 32, height: 32 }}>
                    {getInitials(el?.name)}
                  </Avatar>
                  <Typography color="inherit" fontSize="inherit">
                    {el.name}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    component={Link}
                    href={`tel:${el.phone}`}
                    size="small"
                    icon={<LocalPhoneIcon sx={{ fontSize: 18 }} />}
                    onClick={(e) => e.stopPropagation()}
                    sx={{ color: 'text.primary' }}
                    label={el.phone}
                  />
                </TableCell>
                <TableCell>
                  {Boolean(el?.email) ? (
                    <Chip
                      component={Link}
                      target="_blank"
                      href={`mailto:${el.email}`}
                      size="small"
                      icon={<EmailIcon sx={{ fontSize: 18 }} />}
                      onClick={(e) => e.stopPropagation()}
                      sx={{ color: 'text.primary' }}
                      label={el.email}
                    />
                  ) : (
                    '-'
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Scrollbar>

      {!contacts.length && <ResourceUnavailable />}

      <Dialog open={open} fullWidth>
        <DialogTitle>
          {selectedAddress ? 'Edit contact' : 'Add contact'}
        </DialogTitle>
        <DialogContent>
          <SupplierContactForm
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

export default SupplierContactList
