import {
  FormControl,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Tooltip,
  Typography,
} from '@mui/material'
import { useFormik } from 'formik'
import { settings } from 'nprogress'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import {
  usePerformSettingMutation,
  useSettingsQuery,
} from '../../../queries/settings'
import { InputField } from '../../input-field'

const convertionTypes = [
  {
    id: 1,
    label: 'Automatic Transformation',
    value: 1,
    description:
      'The order will be converted to a package imediately after it is confirmed',
  },
  {
    id: 2,
    label: 'Never Transform order to package',
    value: 2,
    description: "The order can't be transformed to package",
  },
  {
    id: 3,
    label: 'Ask before order transformation',
    value: 3,
    description: 'Always ask about the order to be transformed or not',
  },
]
const OrderConfigurations = () => {
  const { t } = useTranslation()
  const formik = useFormik({
    initialValues: {
      convertion_type: 1,
    },
  })

  const { data: settings, isLoading } = useSettingsQuery()

  const mutation = usePerformSettingMutation()

  const handlePerformSetting = ({ key, value }) => {
    return toast.promise(mutation.mutateAsync({ key, value }), {
      loading: t('toast.Saving'),
      success: () => {
        return t('toast.SavedSuccessfully')
      },
      error: (err) => {
        return JSON.stringify(err)
      },
    })
  }

  return (
    <form>
      <InputField
        fullWidth
        select
        label={t('Order Transformation')}
        name="convertion_type"
        value={
          settings?.find((set) => set.key === 'order_package_auto_creation')
            ?.value || 2
        }
        onChange={(e) =>
          handlePerformSetting({
            key: 'order_package_auto_creation',
            value: e.target.value,
          })
        }
        onBlur={formik.handleBlur}
      >
        {convertionTypes.map((type) => {
          return (
            <MenuItem key={type.id} value={type.value}>
              {type.label}
            </MenuItem>
          )
        })}
      </InputField>
    </form>
  )
}

export default OrderConfigurations
