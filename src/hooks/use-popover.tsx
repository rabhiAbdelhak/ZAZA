import { useRef, useState } from 'react'

export const usePopover = () => {
  const anchorRef = useRef(null) as any
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return [anchorRef, open, handleOpen, handleClose]
}
