import { Download, FileDownloadOutlined } from '@mui/icons-material'
import { Box, Grid, Typography, Button } from '@mui/material'
import { useGlobaleStateContext } from '../../contexts/global context/Provider'
import ProductImagesGallery from './product-images-gallery'

const ProductImages = ({ changeCurrentImage, product }) => {
  const { images } = product
  return (
    <Box sx={{ p: 3, bgcolor: 'grey.50', borderRadius: '16px' }}>
      <Typography variant="h5" color="text.primary">
        Images
      </Typography>
      <Typography variant="subtitle2" color="text.primary" mb={2}>
        Select the image to preview it or download it
      </Typography>
      <ProductImagesGallery
        images={images}
        changeCurrentImage={changeCurrentImage}
      />
    </Box>
  )
}

export default ProductImages
