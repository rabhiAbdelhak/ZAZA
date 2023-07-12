import { Avatar, Box, Card, Typography } from '@mui/material'

//local imports
import ProductImagesGallery from './product-images-gallery'

const ProductPreview = ({ current, product, changeCurrentImage }) => {
  const { images } = product
  return (
    <Box sx={{ bgcolor: 'grey.50', p: 3, borderRadius: '16px' }}>
      <Typography variant="h5" color="text.primary" mb={2}>
        Preview
      </Typography>
      <Card sx={{ p: 3, border: 0, borderRadius: '16px' }}>
        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <Avatar />
          <Box>
            <Typography variant="h6" color="text.primary">
              Your Brand
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">
              Sponsored
            </Typography>
          </Box>
        </Box>
        <Typography variant="body2" color="text.primary" mb={2}>
          “While operating my photostereotype process in Ithaca, I studied the
          problem of halftone process,” Ives said. “I went to bed one night in a
          state of brain fog over the problem, and the instant I woke in the
          morning saw before me, apparently projected on the ceiling, the
          completely worked out process and equipment in operation.”
        </Typography>
        <Box
          sx={{
            bgcolor: 'grey.50',
            p: 2,
            borderRadius: '16px',
            overflow: 'hidden',
            height: '400px',
            position: 'relative',
            '&:hover': {
              '& .gallery': {
                transform: 'scale(1)',
              },
            },
          }}
        >
          <img
            src={images?.[current].url}
            alt="preview"
            style={{
              height: '80%',
              width: '100%',
              position: 'absolute',
              top: 0,
              left: 0,
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: '0',
              p: 2,
              zIndex: 2,
              bgcolor: 'grey.50',
            }}
          >
            <Typography variant="h6" color="text.primary" mb={2}>
              Get it 18% off
            </Typography>
            <Typography variant="body2" color="text.primary">
              I woke in the morning saw before me, apparently projected on the
              ceiling, the completely worked out process and equipment in
              operation.”
            </Typography>
          </Box>
          <Box
            className="gallery"
            sx={{
              width: '100%',
              transition: 'transform 500ms',
              transform: 'scale(0)',
              height: '70%',
              position: 'absolute',
              top: 0,
              left: 0,
              p: 4,
              bgcolor: 'rgb(0 0 0/0.4)',
            }}
          >
            <Typography
              variant="subtitle2"
              color="primary.contrast"
              textAlign="center"
              mb={1}
            >
              Select an image from the gallery to preview it
            </Typography>
            <Box sx={{ height: '200px', overflow: 'hidden' }}>
              <ProductImagesGallery
                fade={true}
                images={images}
                changeCurrentImage={changeCurrentImage}
              />
            </Box>
          </Box>
        </Box>
      </Card>
    </Box>
  )
}

export default ProductPreview
