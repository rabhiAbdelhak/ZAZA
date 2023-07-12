import { forwardRef } from 'react'
import SimpleBar from 'simplebar-react'
import { Box } from '@mui/material'
import type { ReactNode } from 'react'

type ScrollbarProps = {
  children: ReactNode
  style?: object
}

export const Scrollbar = forwardRef((props: ScrollbarProps, ref: any) => {
  const { children, ...other } = props

  const isMobile =
    typeof window !== 'undefined' &&
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    )

  if (isMobile) {
    return (
      <Box ref={ref} sx={{ overflowX: 'auto' }} {...other}>
        {children}
      </Box>
    )
  }

  return (
    <SimpleBar onScroll={(e) => console.log(e)} ref={ref} {...other}>
      {children}
    </SimpleBar>
  )
})
