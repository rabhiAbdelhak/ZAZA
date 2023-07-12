import { ArrowForwardIos, ArrowBackIosNew } from '@mui/icons-material'
import { Box } from '@mui/material'
import { useState } from 'react'
import Slider from 'react-slick'

//local imports
import SlickArrow from '../slick-slider/slick-arrow'

const pubs = [
  {
    id: 1,
    image: '/static/add1.webp',
  },
  {
    id: 2,
    image: '/static/add2.webp',
  },
  {
    id: 3,
    image: '/static/add3.webp',
  },
]

const settings = {
  dots: true,
  infinite: true,
  speed: 800,
  slidesToShow: 1,
  slidesToScroll: 1,
  fade: true,
  adaptiveHeight: true,
  className: 'pub-slider',
  pauseOnFocus: true,
  autoplay: true,
  autoplaySpeed: 5000,
  useCss: true,
  accessibility: true,
  nextArrow: <SlickArrow goTo="next" centered />,
  prevArrow: <SlickArrow goTo="prev" centered />,
  appendDots: (dots) => (
    <ul style={{ margin: '0px', bottom: '25px' }}> {dots} </ul>
  ),
  customPaging: (i) => (
    <Box
      sx={{
        width: '10px',
        height: '10px',
        borderRadius: '50%',
        background: '#212831',
        margin: '0 5px',
      }}
    ></Box>
  ),
}

const activeDotbeforeStyle = {
  content: "''",
  position: 'absolute',
  width: '14px',
  height: '14px',
  border: '1px solid',
  borderColor: (theme) => theme.palette.primary.main,
  borderRadius: '50%',
  bottom: '50%',
  left: '50%',
  transform: 'translate(-50%, 15%)',
}

const PubSlider = () => {
  const [currentSlide, setCurrentSlide] = useState()

  const SliderCustomPaging = (i) => (
    <Box
      bgcolor={currentSlide == i ? 'primary.main' : 'text.primary'}
      sx={{
        width: '10px',
        height: '10px',
        borderRadius: '50%',
        margin: '0 5px',
        '&::before': currentSlide == i ? { ...activeDotbeforeStyle } : null,
      }}
    ></Box>
  )
  return (
    <Box
      bgcolor="neutral.100"
      sx={{ padding: 2, mb: 3, '& .pub-slider': { overflow: 'visible' } }}
    >
      <Slider
        {...settings}
        afterChange={(current) => setCurrentSlide(current)}
        customPaging={SliderCustomPaging}
      >
        {pubs.map((pub) => {
          return (
            <Box
              key={pub.id}
              sx={{
                width: '100%',
                height: '400px',
                top: 0,
                left: 0,
              }}
            >
              <img
                src={pub.image}
                alt="kako"
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '15px',
                  border: 0,
                }}
              />
            </Box>
          )
        })}
      </Slider>
    </Box>
  )
}

export default PubSlider
