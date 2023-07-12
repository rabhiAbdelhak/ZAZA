import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useGetCategoriesQuery } from '../../queries/category'
import { InputField } from '../input-field'

const ProductsFilter = ({
  isFilterOpen,
  handleChange,
  values,
  setFieldValue,
  filter,
}) => {
  const { t } = useTranslation()

  const {
    data: categories,
    isLoading,
    isError,
    error,
  } = useGetCategoriesQuery()

  const setCategoryChange = (id, name) => (e) => {
    const { checked } = e.target
    if (checked) {
      setFieldValue('category', [...values.category, { id, name }])
    } else {
      setFieldValue(
        'category',
        values.category.filter((v) => v.id !== id),
      )
    }
  }
  const categorySelected = (category) => {
    return values.category.map((cat) => cat.id).includes(category.id)
  }
  return (
    <Box
      sx={{
        alignSelf: 'flex-start',
        ml: !isFilterOpen ? '-300px' : '0',
        width: '300px',
        transition: '500ms',
        pr: 5,
      }}
    >
      <Box>
        <Typography variant="h5" color="text.primary" mb={1}>
          {t('Filters.Order By')}
        </Typography>
        <ButtonGroup
          color="secondary"
          size="small"
          sx={{ mb: 1, width: '100%' }}
        >
          <Button
            variant={values.sortBy === 'asc' ? 'contained' : 'outlined'}
            onClick={() => setFieldValue('sortBy', 'asc')}
            sx={{ width: '50%' }}
          >
            {t('Attributes.Ascending')}
          </Button>
          <Button
            variant={values.sortBy === 'desc' ? 'contained' : 'outlined'}
            onClick={() => setFieldValue('sortBy', 'desc')}
            sx={{ width: '50%' }}
          >
            {t('Attributes.Descending')}
          </Button>
        </ButtonGroup>
        <FormControl>
          <RadioGroup name="sort" value={values.sort} onChange={handleChange}>
            <FormControlLabel
              value="name"
              control={<Radio />}
              label={t('Attributes.Product Name')}
            />
            <FormControlLabel
              value="id"
              control={<Radio />}
              label={t('Attributes.Product ID')}
            />
            <FormControlLabel
              value="price"
              control={<Radio />}
              label={t('Attributes.Price')}
            />
            <FormControlLabel
              value="quantity"
              control={<Radio />}
              label={t('Attributes.Quantity')}
            />
          </RadioGroup>
        </FormControl>
      </Box>
      <Box my={3}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="h5" color="text.primary">
            {t('Filters.Categories')}
          </Typography>
          <Button
            size="small"
            color="primary"
            sx={{ minWidth: 0, pr: 0, minHeight: 0, py: 0 }}
          >
            {t('show all')}
          </Button>
        </Box>
        <FormGroup name="category">
          {categories?.map((cat) => {
            return (
              <FormControlLabel
                key={cat.id}
                control={<Checkbox />}
                label={t(`categories.${cat.name}`)}
                checked={categorySelected(cat)}
                onChange={setCategoryChange(cat.id, cat.name)}
              />
            )
          })}
        </FormGroup>
        <Button
          disabled={!values.category.length}
          size="small"
          color="primary"
          sx={{ minWidth: 0, pr: 0, minHeight: 0, py: 0, float: 'right' }}
          onClick={() => setFieldValue('category', [])}
        >
          {t('Clear')}
        </Button>
      </Box>
      <Box mb={3}>
        <Typography variant="h5" color="text.primary" mb={1}>
          {t('Attributes.Quantity')}
        </Typography>
        <FormControl
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <InputField
            type="number"
            sx={{ width: '100px' }}
            label={t('Attributes.Minimum')}
            name="min_quantity"
            value={values.min_quantity}
            onChange={handleChange}
          />
          <InputField
            type="number"
            sx={{ width: '100px' }}
            label={t('Attributes.Maximum')}
            name="max_quantity"
            value={
              values.max_quantity !== Infinity ? values.max_quantity : undefined
            }
            onChange={handleChange}
          />
        </FormControl>
        <Button
          disabled={
            values.min_quantity === 0 && values.max_quantity === Infinity
          }
          onClick={() => {
            setFieldValue('max_quantity', Infinity)
            setFieldValue('min_quantity', 0)
          }}
          size="small"
          color="primary"
          sx={{ minWidth: 0, pr: 0, minHeight: 0, py: 0, float: 'right' }}
        >
          {t('Clear')}
        </Button>
      </Box>
      <Box>
        <Typography variant="h5" color="text.primary" mb={1}>
          {t('Attributes.Price')}
        </Typography>
        <FormControl
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <InputField
            type="number"
            sx={{ width: '100px' }}
            label={t('Attributes.Minimum')}
            name="min_price"
            value={values.min_price}
            onChange={handleChange}
          />
          <InputField
            type="number"
            sx={{ width: '100px' }}
            label={t('Attributes.Maximum')}
            name="max_price"
            value={values.max_price !== Infinity ? values.max_price : undefined}
            onChange={handleChange}
          />
        </FormControl>
        <Button
          disabled={values.min_price === 0 && values.max_price === Infinity}
          onClick={() => {
            setFieldValue('max_price', Infinity)
            setFieldValue('min_price', 0)
          }}
          size="small"
          color="primary"
          sx={{ minWidth: 0, pr: 0, minHeight: 0, py: 0, float: 'right' }}
        >
          {t('Clear')}
        </Button>
      </Box>
    </Box>
  )
}

export default ProductsFilter
