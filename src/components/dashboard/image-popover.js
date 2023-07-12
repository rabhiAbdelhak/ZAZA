import { Box, Card } from '@mui/material'
import { useEffect, useState } from 'react'

const ImagePopOver = ({ open, image, anchorRf }) => {
  const [client, setClient] = useState({
    top: anchorRf?.clientTop,
    left: anchorRf?.clientLeft,
  })

  useEffect(() => {
    const boundaries = anchorRf?.getBoundingClientRect()
    setClient({ top: boundaries?.top, left: boundaries?.left })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])
  return (
    <Box
      sx={{
        bgcolor: 'white',
        position: 'fixed',
        height: '450px',
        width: '600px',
        top: open ? `${client.top - 10}px` : `${client.top + 25}px`,
        left: !open ? `${client.left + 25}px` : `${client.left - 10}px`,
        transformOrigin: 'bottom left',
        transform: `translateY(-100%) scale(${open ? 1 : 0})`,
        zIndex: 1010,
        transition: 'top 250ms, left 250ms, transform 500ms',
        boxShadow: 20,
      }}
    >
      <img
        src={image}
        style={{ width: '100%', height: '100%', borderRadius: '5px' }}
        alt="popupimage"
      />
    </Box>
  )
}

export default ImagePopOver
