import { Call } from '@mui/icons-material'
import { Box, Button, Link, Skeleton, Switch, Typography } from '@mui/material'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

//local imports
import { InputField } from '../../input-field'

type CompProps = {
  type?: 'string' | 'number' | 'boolean'
  label: string
  name?: string
  value: string | number | boolean
  loading?: boolean
  sx?: any
  onUpdate?: (values: any, helpers: any) => any
  Editable?: boolean
  call?: boolean
  last?: boolean
}

const OrderInformationBox = (props: CompProps) => {
  const {
    type,
    label,
    last,
    name = '',
    value,
    loading,
    sx,
    onUpdate,
    Editable,
    call,
  } = props
  const { t } = useTranslation()
  const [isEditing, setIsEditing] = useState(false)
  const formik = useFormik({
    initialValues: {
      [name]: value,
    },
    onSubmit: (values, helpers) => {
      if (!values[name]) {
        setIsEditing(false)
        return
      }

      if (values[name] !== value) {
        onUpdate && onUpdate?.({ [name]: values[name] }, helpers)
      }
      setIsEditing(false)
    },
  })

  const renderForm = () => {
    return (
      <form onSubmit={formik.handleSubmit} style={{ flex: 1 }}>
        {!type && (
          <InputField
            fullWidth
            InputProps={{
              autoFocus: true,
            }}
            error={Boolean(formik.touched[name] && formik.errors[name])}
            helperText={formik.touched[name] && formik.errors[name]}
            onBlur={formik.handleSubmit}
            type="text"
            name={name}
            value={String(formik.values[name])}
            onChange={formik.handleChange}
          />
        )}
      </form>
    )
  }

  return (
    <Box
      sx={{
        ...sx,
        display: 'flex',
        gap: 2,
        borderBottom: !last && 'solid 1px',
        borderColor: 'divider',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        p: 2,
        cursor: 'pointer',
        '&:hover': { bgcolor: Editable && 'neutral.50' },
        borderRadius: '5px',
      }}
      onClick={() => Editable && type !== 'boolean' && setIsEditing(true)}
    >
      <Typography
        variant="subtitle2"
        color="text.secondary"
        sx={{ width: '50%' }}
      >
        {t('Attributes.' + label)}
      </Typography>
      {isEditing ? (
        renderForm()
      ) : loading ? (
        <Skeleton
          variant="text"
          width={139}
          height={20}
          sx={{ borderRadius: '15px' }}
        />
      ) : (
        <Box sx={{ width: '50%' }}>
          {type === 'boolean' ? (
            Editable ? (
              <Switch
                size="small"
                sx={{ m: 0 }}
                checked={Boolean(formik.values[name])}
                onChange={() => {
                  formik.setFieldValue(name, !formik.values[name])
                  formik.handleSubmit()
                }}
              />
            ) : value ? (
              'YES'
            ) : (
              'NO'
            )
          ) : (
            <Box
              sx={{
                display: 'flex',
                gap: 1,
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Typography variant="subtitle2" color="text.primary">
                {value ? value : '-'}
              </Typography>
              {call && value && Editable && (
                <Button
                  color="primary"
                  variant="outlined"
                  size="small"
                  LinkComponent={Link}
                  href={`tel:${value}`}
                  onClick={(e) => {
                    e.stopPropagation()
                  }}
                  startIcon={<Call />}
                >
                  {t('Call')}
                </Button>
              )}
            </Box>
          )}
        </Box>
      )}
    </Box>
  )
}

export default OrderInformationBox
