import { Box, BoxProps, Slide, SlideProps } from '@mui/material'
import { Scrollbar } from './scrollbar'

export type InternalDrawerProps = Omit<BoxProps, 'component'> & {
  open?: boolean
  direction?: SlideProps['direction']
  contentSx?: BoxProps['sx']
}

function InternalDrawer({
  open = false,
  children,
  direction = 'left',
  contentSx,
  ...otherProps
}: InternalDrawerProps) {
  return (
    <Slide direction={direction} in={open} mountOnEnter unmountOnExit>
      <Box
        {...otherProps}
        sx={{
          boxShadow: 2,
          ...otherProps.sx,
        }}
      >
        <Box
          component={Scrollbar}
          sx={{
            ...contentSx,
            height: '100%',
            width: '100%',
          }}
        >
          {children}
        </Box>
      </Box>
    </Slide>
  )
}

export default InternalDrawer
