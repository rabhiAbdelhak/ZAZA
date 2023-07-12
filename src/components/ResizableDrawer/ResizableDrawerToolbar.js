import { AppBar, Box, IconButton, Toolbar } from '@mui/material'
import {
  Close,
  KeyboardArrowDown,
  KeyboardArrowUp,
  OpenInNew,
} from '@mui/icons-material'
import PropTypes from 'prop-types'
import Link from 'next/link'

function ResizableDrawerToolbar({
  actions,
  fullScreenPath,
  onGoNext,
  onGoPrev,
  onClose,
  sx,
  disabled,
  ...otherProps
}) {
  return (
    <Toolbar
      sx={{
        position: 'sticky',
        top: 0,
        backgroundColor: 'white',
        zIndex: 99,
        ...sx,
      }}
      {...otherProps}
    >
      {Boolean(fullScreenPath) && (
        <Link href={fullScreenPath}>
          <IconButton disabled={disabled}>
            <OpenInNew />
          </IconButton>
        </Link>
      )}
      <IconButton onClick={onGoNext} disabled={disabled}>
        <KeyboardArrowDown />
      </IconButton>
      <IconButton onClick={onGoPrev} disabled={disabled}>
        <KeyboardArrowUp />
      </IconButton>
      {actions}
      <Box sx={{ flexGrow: 1 }} />
      <IconButton onClick={onClose}>
        <Close />
      </IconButton>
    </Toolbar>
  )
}

ResizableDrawerToolbar.propTypes = {
  actions: PropTypes.element,
  disabled: PropTypes.bool,
  fullScreenPath: PropTypes.string,
  onGoNext: PropTypes.func,
  onGoPrev: PropTypes.func,
  onClose: PropTypes.func,
}

export default ResizableDrawerToolbar
