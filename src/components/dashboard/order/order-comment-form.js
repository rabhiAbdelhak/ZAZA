import { Box, Button } from '@mui/material'
import { useFormik } from 'formik'
import { makeStyles } from '@mui/styles'
import * as Yup from 'yup'

//local imports
import { InputField } from '../../input-field'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'
import { useAddOrderCommentMutation } from '../../../queries/order'

const useStyles = makeStyles({
  commentInput: {
    '& input[type=number]': {
      '-moz-appearance': 'textfield',
      padding: 0,
      textAlign: 'center !important',
    },
    '& input[type=number]::-webkit-outer-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0,
      padding: 0,
    },
    '& input[type=number]::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0,
      padding: 0,
    },
  },
})

const OrderCommentForm = ({ orderId }) => {
  const classes = useStyles()
  const { t } = useTranslation()
  const mutation = useAddOrderCommentMutation(orderId)
  const formik = useFormik({
    initialValues: {
      description: '',
    },
    validationSchema: Yup.object({
      description: Yup.string().required('Please Enter a comment !'),
    }),
    onSubmit: (values, helpers) => {
      const { description } = values
      const result = toast.promise(
        mutation.mutateAsync({ id: orderId, description }),
        {
          loading: t('toast.Saving'),
          success: () => {
            helpers.setStatus({ success: true })
            helpers.setSubmitting(false)
            return t('toast.SavedSuccessfully')
          },
          error: (err) => {
            helpers.setStatus({ success: false })
            helpers.setErrors({ submit: err?.response?.data?.message })
            return err?.response?.data?.message
          },
        },
      )
      helpers.setFieldValue('description', '')
      return result
    },
  })
  return (
    <>
      <Box>
        <InputField
          fullWidth
          type="text"
          placeholder={t('orders.Comment text...')}
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          className={classes.commentInput}
          InputProps={{
            sx: {
              border: 'none !important',
              height: 45,
              padding: '0 !important',
              boxShadow: 'none !important',
            },
            disableUnderline: true,
          }}
        />
      </Box>
      <Box
        sx={{
          p: 1,
          bgcolor: 'neutral.100',
          borderTop: '1px solid',
          borderBottom: '1px solid',
          borderColor: 'divider',
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <Button
          size="small"
          variant="contained"
          sx={{ color: 'primary.contrast' }}
          onClick={formik.handleSubmit}
          disabled={!formik.values.description}
        >
          {t('Send')}
        </Button>
      </Box>
    </>
  )
}

export default OrderCommentForm
