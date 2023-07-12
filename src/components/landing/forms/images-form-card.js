import {
  Box,
  Card,
  CardContent,
  CardHeader,
  FormHelperText,
  IconButton,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import { useMemo } from 'react'
import { Trash as TrashIcon } from '../../../icons/trash'
import { ImageDropzone } from '../../image-dropzone'
import Image from 'next/image'

const ImagePreview = ({ url, onRemove }) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Box
      sx={{
        alignItems: 'center',
        borderRadius: 1,
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        position: 'relative',
        '&::before': {
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          borderRadius: 1,
          bottom: 0,
          content: '""',
          display: 'none',
          left: 0,
          position: 'absolute',
          right: 0,
          top: 0,
        },
        '&:hover': {
          boxShadow: (theme) => `0px 0px 0px 1px ${theme.palette.primary.main}`,
          '&::before': {
            display: 'block',
          },
          '& button': {
            display: 'inline-flex',
          },
        },
      }}
    >
      <Image
        style={{ borderRadius: 8 }}
        width={140}
        height={140}
        objectFit={'contain'}
        alt=""
        src={url}
      />
      <IconButton
        onClick={() => onRemove && onRemove(url)}
        sx={{
          bottom: 8,
          color: 'text.secondary',
          display: 'none',
          position: 'absolute',
          right: 8,
        }}
      >
        <TrashIcon />
      </IconButton>
    </Box>
  </Box>
)

export default function ImagesFormCard({ formik }) {
  const { t } = useTranslation()

  const imgUrl = useMemo(
    () =>
      formik?.values?.image &&
      window !== undefined &&
      formik?.values?.image instanceof File
        ? URL.createObjectURL(formik?.values?.image)
        : formik?.values?.image,
    [formik?.values?.image],
  )

  const dropHandler = ([dropImage]) => {
    formik?.setFieldValue('image', dropImage)
  }

  const onRemove = () => {
    formik?.setFieldValue('image', '')
  }

  return (
    <Card>
      <CardHeader title={t('landing.PrincipalImage')} />
      <CardContent>
        <Box
          display="flex"
          gap={4}
          flexWrap="wrap"
          sx={{ width: 140, height: 140 }}
        >
          {!imgUrl && (
            <ImageDropzone
              maxFiles={1}
              accept={{
                'image/jpeg': [],
                'image/png': [],
              }}
              onDrop={dropHandler}
            />
          )}
          {Boolean(imgUrl) && <ImagePreview url={imgUrl} onRemove={onRemove} />}
        </Box>
        <FormHelperText
          sx={{ mt: 2 }}
          error={Boolean(formik?.touched?.image && formik?.errors?.image)}
        >
          {formik?.touched?.image && formik?.errors?.image}
        </FormHelperText>
      </CardContent>
    </Card>
  )
}

ImagesFormCard.propTypes = {
  formik: PropTypes.object,
}
