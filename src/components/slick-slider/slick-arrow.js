import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material'
import { useState } from 'react'

const SlickArrow = ({ goTo, onClick, className, style, centered }) => {
  const [isHover, setIsHover] = useState(false)
  const handleHover = () => setIsHover(true)
  const handleMouseLeave = () => setIsHover(false)

  const arrowStyle = {
    display: 'block',
    position: 'absolute',
    top: centered ? '50%' : '30%',
    transform: 'translateY(-50%)',
    background: 'rgb(0 0 0 / 0.9)',
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    zIndex: 3,
    cursor: 'pointer',
    transition: '0.5s',
  }

  return (
    <div
      onMouseEnter={handleHover}
      onMouseLeave={handleMouseLeave}
      style={{
        ...arrowStyle,
        left: goTo === 'prev' ? (centered ? '15px' : '5px') : 'unset',
        right: goTo === 'next' ? (centered ? '15px' : '5px') : 'unset',
        opacity: isHover ? '1' : '0.5',
      }}
      onClick={onClick}
    >
      {goTo === 'prev' ? (
        <ArrowBackIosNew sx={{ fontSize: '14px' }} />
      ) : (
        <ArrowForwardIos sx={{ fontSize: '14px' }} />
      )}
    </div>
  )
}

export default SlickArrow
