import { FileDownloadOutlined } from '@mui/icons-material'
import { Box, Grid } from '@mui/material'
import React from 'react'

const ProductImagesGallery = ({ images, fade, changeCurrentImage }) => {
  return (
    <Grid
      container
      sx={{ gap: 1, justifyContent: 'space-between', maxHeight: '100%' }}
    >
      {images?.map((image, index) => {
        return (
          <Grid
            onClick={() => changeCurrentImage(index)}
            item
            key={image.id}
            md={2.8}
            sm={2.8}
            xs={5.8}
            sx={{
              maxHeight: !fade ? '110px' : '80px',
              position: 'relative',
              cursor: 'pointer',
              transition: 'transform 250ms',
              '&:hover': {
                transform: 'scale(1.05)',
                '& .download-btn': {
                  height: '30px',
                },
              },
            }}
          >
            <img
              src={image.url}
              alt={`im${image.id}`}
              style={{ height: '100%', width: '100%', borderRadius: '12px' }}
            />
            <Box
              variant="rounded"
              size="small"
              className="download-btn"
              sx={{
                bgcolor: 'primary.contrast',
                color: 'text.primary',
                position: 'absolute',
                bottom: 4,
                width: '30px',
                height: '0',
                overflow: 'hidden',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                right: 4,
                transition: 'height 250ms',
              }}
            >
              <FileDownloadOutlined />
            </Box>
          </Grid>
        )
      })}
    </Grid>
  )
}

export default ProductImagesGallery
