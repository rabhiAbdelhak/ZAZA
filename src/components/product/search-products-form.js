import { Box, IconButton, InputAdornment } from '@mui/material'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import { X as XIcon } from '../../icons/x'
import {
  useGlobaleDispatchContext,
  useGlobaleStateContext,
} from '../../contexts/global context/Provider'
import { InputField } from '../input-field'
import { Search } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'

const SearchProductsForm = () => {
  const router = useRouter()
  const { t } = useTranslation()

  const formik = useFormik({
    initialValues: {
      query: '',
    },
    onSubmit: (values) => {
      router.push(`/dashboard/products/shop/search?query=${values.query}`)
    },
  })

  return (
    <form
      style={{ margin: '32px auto', width: '100%' }}
      onSubmit={formik.handleSubmit}
    >
      <InputField
        fullWidth
        placeholder={t('products.Global Product Search')}
        InputProps={{
          sx: {
            height: '40px',
          },
          endAdornment: (
            <InputAdornment position="start">
              {formik.values.query ? (
                <IconButton
                  onClick={() => {
                    formik.resetForm()
                    formik.handleSubmit()
                  }}
                >
                  <XIcon
                    style={{ fontSize: '20px', mr: -50, cursor: 'pointer' }}
                  />
                </IconButton>
              ) : (
                <IconButton onClick={formik.handleSubmit}>
                  <Search
                    style={{ fontSize: '20px', mr: -50, cursor: 'pointer' }}
                  />
                </IconButton>
              )}
            </InputAdornment>
          ),
        }}
        name="query"
        value={formik.values.query}
        onChange={formik.handleChange}
      />
    </form>
  )
}

export default SearchProductsForm
