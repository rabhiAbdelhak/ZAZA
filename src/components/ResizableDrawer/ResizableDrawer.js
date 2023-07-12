import { Drawer } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

function ResizableDrawer({
  children,
  minDrawerWidth = 500,
  maxDrawerWidth = 1000,
  ...otherProps
}) {
  const [width, setWidth] = useState(minDrawerWidth)
  const isResizing = useRef(false)

  const onMouseDown = (e) => {
    isResizing.current = true
  }

  useEffect(() => {
    const onMouseUp = (e) => {
      isResizing.current = false
    }

    const onMouseMove = (e) => {
      if (isResizing.current) {
        let offsetRight =
          document.body.offsetWidth - (e.clientX - document.body.offsetLeft)
        if (offsetRight > minDrawerWidth && offsetRight < maxDrawerWidth) {
          setWidth(offsetRight)
        }
      }
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
    }
  }, [maxDrawerWidth, minDrawerWidth])

  return (
    <Drawer
      PaperProps={{ sx: { width: width } }}
      sx={{ position: 'relative' }}
      anchor="right"
      hideBackdrop
      {...otherProps}
    >
      <div
        onMouseDown={onMouseDown}
        style={{
          width: '5px',
          cursor: 'ew-resize',
          position: 'fixed',
          top: 0,
          right: width - 5,
          bottom: 0,
          zIndex: 100,
          backgroundColor: 'rgba(0,0,0,0.1)',
        }}
      />
      {children}
    </Drawer>
  )
}

ResizableDrawer.propTypes = {
  children: PropTypes.node,
  minDrawerWidth: PropTypes.number,
  maxDrawerWidth: PropTypes.number,
}

export default ResizableDrawer
