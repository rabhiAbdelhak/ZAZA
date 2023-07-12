import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  ButtonBase,
  Box,
  FormHelperText,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'

const colors = [
  '#FFB300',
  '#1E88E5',
  '#00BCD4',
  '#FF5722',
  '#673AB7',
  '#8BC34A',
  '#E91E63',
  '#26A69A',
  '#9C27B0',
  '#607D8B',
  '#795548',
  '#CDDC39',
]

function ColoredButton({ selected = false, color = '#ddd', onClick }) {
  return (
    <ButtonBase
      onClick={onClick}
      sx={{
        backgroundColor: color,
        height: 48,
        width: 48,
        borderRadius: '50%',
        border: '2px solid',
        boxSizing: 'border-box',
        transition: 'all 0.2s ease',
        borderColor: selected ? '#000' : 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#000',
      }}
    >
      {selected && <CheckCircleRoundedIcon color="inherit" />}
    </ButtonBase>
  )
}

export default function ColorsFormCard({ formik, responsiveByWidth = false }) {
  const { t } = useTranslation()

  const color = formik?.values?.main_color
  const onChangeColor = (selectedColor) => {
    if (color === selectedColor) {
      return
    }
    formik?.setFieldValue('main_color', selectedColor)
  }

  return (
    <Card>
      <CardHeader title={t('landing.ChooseColor')} />
      <CardContent>
        <Box
          sx={{
            display: 'grid',
            gap: 4,
            gridTemplateColumns: responsiveByWidth
              ? 'repeat(auto-fill, 12%)'
              : { xs: 'repeat(4, 1fr)', sm: 'repeat(6, 1fr)' },
          }}
        >
          {colors.map((el) => (
            <ColoredButton
              onClick={() => onChangeColor(el)}
              key={el}
              color={el}
              selected={el === color}
            />
          ))}
        </Box>
        <FormHelperText
          sx={{ mt: 2 }}
          error={Boolean(
            formik?.touched?.main_color && formik?.errors?.main_color,
          )}
        >
          {formik?.touched?.main_color && formik?.errors?.main_color}
        </FormHelperText>
      </CardContent>
    </Card>
  )
}

ColorsFormCard.propTypes = {
  formik: PropTypes.object,
}
