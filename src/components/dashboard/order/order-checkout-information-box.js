import { Call } from '@mui/icons-material'
import {
  Box,
  IconButton,
  Link,
  MenuItem,
  Skeleton,
  Switch,
  Tooltip,
  Typography,
} from '@mui/material'
import { useFormik } from 'formik'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

//local imports
import { InputField } from '../../input-field'

const OrderCheckoutInformationBox = ({
  type,
  label,
  name,
  value,
  loading,
  sx,
  onUpdate,
  Editable,
  call,
}) => {
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
        onUpdate({ [name]: values[name] }, helpers)
      }
      setIsEditing(false)
    },
  })

  const renderForm = () => {
    return (
      <form onSubmit={formik.handleSubmit}>
        {!type && (
          <InputField
            fullWidth
            autoFocus
            error={Boolean(formik.touched[name] && formik.errors[name])}
            helperText={formik.touched[name] && formik.errors[name]}
            onBlur={formik.handleSubmit}
            type="text"
            name={name}
            value={formik.values[name]}
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
        minWidth: '180px',
        cursor: Editable ? 'url(/static/pencil.svg), pointer' : 'unset',
        '&:hover': { bgcolor: Editable && 'neutral.50' },
        p: 1,
        borderRadius: '5px',
      }}
      onClick={() =>
        Editable && onUpdate && type !== 'boolean' && setIsEditing(true)
      }
    >
      <Typography variant="subtitle2" color="text.primary">
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
        <Box>
          {type === 'boolean' ? (
            Editable ? (
              <Switch
                size="small"
                sx={{ m: 0 }}
                checked={formik.values[name]}
                onChange={() => {
                  formik.setFieldValue([name], !formik.values[name])
                  formik.handleSubmit()
                }}
              />
            ) : value ? (
              'YES'
            ) : (
              'NO'
            )
          ) : (
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <Typography variant="subtitle3" color="text.secondary">
                {value ? value : '-'}
              </Typography>
              {call && value && Editable && (
                <Tooltip title={t('Call')}>
                  <IconButton
                    color="success"
                    size="small"
                    LinkComponent={Link}
                    href={`tel:${value}`}
                    onClick={(e) => {
                      e.stopPropagation()
                    }}
                  >
                    <Call
                      sx={{ fontSize: '20px', transform: 'rotate(220deg)' }}
                    />
                  </IconButton>
                </Tooltip>
              )}
            </Box>
          )}
        </Box>
      )}
    </Box>
  )
}

export default OrderCheckoutInformationBox
