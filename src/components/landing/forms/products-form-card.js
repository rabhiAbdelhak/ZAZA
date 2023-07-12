import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  FormHelperText,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { InputField } from '../../input-field'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { AutocompleteField } from '../../autocomplete-field'
import { useProductsQuery } from '../../../queries/product'
import { Box } from '@mui/system'
import { dinarFormat } from '../../../utils/formats'
import { Scrollbar } from '../../scrollbar'
import Image from 'next/image'
import { getFirstCharacter } from '../../../utils/avatar'
import { ResourceUnavailable } from '../../resource-unavailable'
import QuantityInput from '../../quantity-input'

const defaultFilter = { 'filter[query]': '', 'filter[min_quantity]': 1 }
const staleTime = 3 * 1000 * 60 // 3 minute

export default function ProductsFormCard({ formik }) {
  const { t } = useTranslation()

  const [open, setOpen] = useState(false)
  const [filter, setFilter] = useState(defaultFilter)
  const products = formik?.values?.products || []
  const { data, isLoading } = useProductsQuery({
    filter,
    options: { enabled: open, staleTime },
  })

  const selectedHandler = (event, items) => {
    const newItems =
      items?.map((el) => ({ ...el, selectedQty: el.selectedQty || 1 })) || []
    formik?.setFieldValue('products', newItems)
  }
  const onInputChange = (event, newSearch) => {
    setFilter((prev) => ({ ...prev, 'filter[query]': newSearch }))
  }
  const onDeleteProduct = (product) => {
    const newProducs = products.filter((el) => el.id !== product.id)
    formik?.setFieldValue('products', newProducs)
  }

  const handleProductAmountChange = (product, selectedQty) => {
    const newProducs = products.map((el) =>
      el.id !== product.id ? el : { ...el, selectedQty: selectedQty },
    )
    formik?.setFieldValue('products', newProducs)
  }

  const renderProductAvatar = (product) => {
    const img = product?.images[0]
    return (
      <Box sx={{ flexGrow: 1 }} display="flex" gap={2} alignItems="center">
        <Avatar variant="rounded">
          {!!img && (
            <Image
              width={40}
              height={40}
              objectFit="contain"
              src={img}
              alt={product.name}
            />
          )}
          {!img && getFirstCharacter(product.name)}
        </Avatar>
        <Box>
          <Typography noWrap variant="body2">
            {product.name}
          </Typography>
          <Typography sx={{ color: 'text.secondary' }} variant="body2">
            {dinarFormat(product.price)}
          </Typography>
        </Box>
      </Box>
    )
  }

  return (
    <Card>
      <CardHeader title={t('landing.SelectProduct')} />
      <CardContent>
        <AutocompleteField
          multiple
          value={products}
          onChange={selectedHandler}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          inputValue={filter['filter[query]']}
          onInputChange={onInputChange}
          options={data?.data || []}
          loading={isLoading}
          placeholder={t('landing.Search')}
          getOptionLabel={() => ''}
          renderTags={() => null}
          sx={{ mb: 4 }}
          filterOptions={(x) => x}
          isOptionEqualToValue={(option, value) => option?.id === value?.id}
          renderOption={(props, option) => (
            <MenuItem {...props} key={option.id}>
              {renderProductAvatar(option)}
            </MenuItem>
          )}
        />
        <Scrollbar>
          <Table>
            <TableHead>
              <TableCell sx={{ px: 2, py: 1 }} padding="checkbox">
                {t('landing.Title')}
              </TableCell>
              <TableCell>{t('landing.ID')}</TableCell>
              <TableCell>{t('landing.Qty')}</TableCell>
              <TableCell
                align="right"
                sx={{ px: 2, py: 1 }}
                padding="checkbox"
              />
            </TableHead>
            <TableBody>
              {products.map((el) => (
                <TableRow key={el.id}>
                  <TableCell sx={{ px: 2, py: 1 }} padding="checkbox">
                    {renderProductAvatar(el)}
                  </TableCell>
                  <TableCell>{el.id}</TableCell>
                  <TableCell>
                    <QuantityInput
                      disableText={true}
                      readOnly
                      value={el?.selectedQty || 0}
                      max={el?.quantity || 0}
                      handleAmountChange={(qty) =>
                        handleProductAmountChange(el, qty)
                      }
                    />
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ px: 2, py: 1 }}
                    padding="checkbox"
                  >
                    <Button onClick={() => onDeleteProduct(el)} sx={{ m: 0 }}>
                      {t('landing.Delete')}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Scrollbar>
        {!products.length && <ResourceUnavailable sx={{ flexGrow: 1, m: 2 }} />}
        <FormHelperText
          error={Boolean(formik?.touched?.products && formik?.errors?.products)}
        >
          {formik?.touched?.products && formik?.errors?.products}
        </FormHelperText>
      </CardContent>
    </Card>
  )
}

ProductsFormCard.propTypes = {
  formik: PropTypes.object,
}
