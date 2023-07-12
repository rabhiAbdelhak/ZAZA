import {
  Box,
  Typography,
  BoxProps,
  Button,
  ButtonProps,
  IconButton,
} from '@mui/material'
import { ReactNode } from 'react'
import PageStepHeader, { PageStepHeaderProps } from './PageStepHeader'
import { X as XIcon } from '../icons/x'
import { Scrollbar } from './scrollbar'

type PageStepProps = {
  children: ReactNode
  prevTitle?: string
  nextTitle?: string
  nextButtonProps?: ButtonProps
  prevButtonProps?: ButtonProps
  onNext?: () => void
  onPrev?: () => void
  onClose?: () => void
} & PageStepHeaderProps

function PageStep({
  content,
  title,
  step,
  children,
  prevTitle = 'Previous',
  nextTitle = 'Next',
  prevButtonProps,
  onNext,
  onPrev,
  nextButtonProps,
  onClose,
}: PageStepProps) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent={'space-between'}
      gap={3}
      sx={{ position: 'relative', overflow: 'hidden' }}
    >
      <PageStepHeader title={title} step={step} content={content} />
      {children}
      <Box display="flex" justifyContent="center" gap={2} p={2}>
        <Button color="inherit" {...prevButtonProps} onClick={onPrev}>
          {prevTitle}
        </Button>
        <Button variant="contained" {...nextButtonProps} onClick={onNext}>
          {nextTitle}
        </Button>
      </Box>

      {Boolean(onClose) && (
        <IconButton
          sx={{ position: 'absolute', top: -8, right: 8 }}
          onClick={onClose}
        >
          <XIcon />
        </IconButton>
      )}
    </Box>
  )
}
export default PageStep
