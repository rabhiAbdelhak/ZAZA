import {
  ArrowCircleDownOutlined,
  ArrowCircleUpOutlined,
  Comment,
  CommentOutlined,
  KeyboardArrowDown,
  KeyboardArrowUp,
  OpenInNew,
} from '@mui/icons-material'
import { IconButton, Tooltip } from '@mui/material'
import { Box } from '@mui/system'
import { useTranslation } from 'react-i18next'
import { X } from '../icons/x'

const DrawerToolbar = (props) => {
  const {
    isLoading,
    onClickNext,
    onClickPrevious,
    onClickFull,
    onClose,
    scrollToComments,
  } = props
  const { t } = useTranslation()

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        p: 1,
        width: '100%',
        position: 'sticky',
        top: -5,
        bgcolor: 'white',
        zIndex: 10,
      }}
    >
      <Box sx={{ display: 'flex' }}>
        <Tooltip title={t('Full Screen')}>
          <IconButton onClick={() => onClickFull?.()} disabled={isLoading}>
            <OpenInNew sx={{ fontSize: '30px' }} />
          </IconButton>
        </Tooltip>
        <Tooltip title={t('Next')} arrow>
          <IconButton onClick={() => onClickNext?.()} disabled={isLoading}>
            <ArrowCircleDownOutlined sx={{ fontSize: '30px' }} />
          </IconButton>
        </Tooltip>
        <Tooltip title={t('Previous')} arrow>
          <IconButton onClick={() => onClickPrevious?.()} disabled={isLoading}>
            <ArrowCircleUpOutlined sx={{ fontSize: '30px' }} />
          </IconButton>
        </Tooltip>
        <IconButton onClick={() => scrollToComments?.()} disabled={isLoading}>
          <CommentOutlined sx={{ fontSize: '30px' }} />
        </IconButton>
      </Box>
      <Box>
        <Tooltip title={t('Close')} arrow>
          <IconButton onClick={() => onClose?.()}>
            <X sx={{ fontSize: '30px' }} />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  )
}

export default DrawerToolbar
