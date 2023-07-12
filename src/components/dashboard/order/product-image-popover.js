import * as React from 'react'
import Popover from '@mui/material/Popover'
import Image from 'next/image'

export default function ProductImagePopover({
  image,
  anchorEl,
  handleClose,
  open,
}) {
  const id = open ? 'simple-popover' : undefined

  return (
    <div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <Image
          src={image}
          width={300}
          height={300}
          style={{ borderRadius: '5px' }}
          alt="productimage"
        />
      </Popover>
    </div>
  )
}
