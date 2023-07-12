import { Box, FormHelperText, Grid, IconButton } from '@mui/material'
import PropTypes, { instanceOf } from 'prop-types'
import { ImageDropzone } from '../../image-dropzone'
import { Trash as TrashIcon } from '../../../icons/trash'
import { memo, useEffect, useState } from 'react'

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
      <img alt="" src={url} />
      <IconButton
        color="primary"
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

function ProductProductImagesForm({ formik }) {
  const [imgs, setImgs] = useState(() => {
    const allImages = Array.isArray(formik?.values?.images)
      ? formik?.values?.images
      : []
    return allImages.map((img) =>
      img instanceof File ? URL.createObjectURL(img) : img,
    )
  })

  //  clear photo url if images dosen't exist in formik
  useEffect(() => {
    if (!formik?.values?.images?.length) {
      setImgs([])
    }
  }, [formik?.values?.images?.length])

  const dropHandler = (dropImages) => {
    const oldImages = formik?.values?.images || []
    const urls = dropImages.map((el) => URL.createObjectURL(el))
    setImgs((prev) => [...urls, ...prev])
    formik?.setFieldValue('images', [...dropImages, ...oldImages])
  }

  const onRemove = (url) => {
    const index = imgs.indexOf(url)
    if (index === -1) {
      return
    }
    const newImagesUrl = imgs.slice(0, index).concat(imgs.slice(index + 1))
    const newImages = formik?.values?.images
      .slice(0, index)
      .concat(formik?.values?.images.slice(index + 1))
    setImgs(newImagesUrl)
    formik?.setFieldValue('images', newImages)
  }

  return (
    <Box>
      <Box
        sx={{
          display: 'grid',
          gap: 2,
          gridTemplateColumns: !imgs.length
            ? '1fr'
            : {
                md: 'repeat(auto-fill, 140px)',
                sm: 'repeat(4, 1fr)',
                xs: 'repeat(2, 1fr)',
              },
          '& img': {
            borderRadius: 1,
            maxWidth: '100%',
          },
        }}
      >
        <ImageDropzone
          accept={{
            'image/jpeg': [],
            'image/png': [],
          }}
          onDrop={dropHandler}
        />
        {imgs.map((image) => (
          <ImagePreview key={image} url={image} onRemove={onRemove} />
        ))}
      </Box>
      <FormHelperText
        sx={{ pl: 2 }}
        error={Boolean(formik.touched.images && formik.errors.images)}
      >
        {formik.touched.images && formik.errors.images}
      </FormHelperText>
    </Box>
  )
}

ProductProductImagesForm.propTypes = {
  formik: PropTypes.object,
}

export default ProductProductImagesForm
