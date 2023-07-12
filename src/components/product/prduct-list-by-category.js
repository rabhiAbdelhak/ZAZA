import { Typography, Box, Button } from '@mui/material'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import Slider from 'react-slick'
import SlickArrow from '../slick-slider/slick-arrow'
import ProductCard from './Product-card'

const sliderSettings = {
  infinite: true,
  dots: false,
  speed: 800,
  slidesToShow: 4,
  rowToShow: 1,
  slidesToScroll: 1,
  adaptiveHeight: true,
  className: 'products-slider',
  pauseOnFocus: true,
  autoplay: true,
  centerMode: true,
  autoplaySpeed: 3000,
  useCss: true,
  accessibility: true,
  infinite: true,
  nextArrow: <SlickArrow goTo="next" centered={false} />,
  prevArrow: <SlickArrow goTo="prev" centered={false} />,
  responsive: [
    {
      breakpoint: 1400,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 1100,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: true,
      },
    },
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 280,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
}
const ListProduct = ({ category: { id, name, products }, toggleSubscribe }) => {
  const router = useRouter()
  const { t } = useTranslation()

  const handleSeeAllClick = (category) => {
    const { id, name } = category
    router.push('/dashboard/products/shop/search?category=' + `${id}/${name}`)
  }
  return (
    <Box
      sx={{
        '& .products-slider': {
          position: 'relative',
          overflow: 'hidden',
          pt: 3,
          width: '100%',
          pb: 3,
          '& > div': { overflow: 'visible' },
        },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h4">{t(`categories.${name}`)}</Typography>
        <Button
          color="primary"
          size="small"
          sx={{ minWidth: 0, pr: 0, minHeight: 0, py: 0 }}
          onClick={() => handleSeeAllClick({ id, name })}
        >
          {t('shop_page.see all')}
        </Button>
      </Box>
      <Slider {...sliderSettings}>
        {products.map((product) => {
          return (
            <Box sx={{ pl: 3 }} key={product.id}>
              <ProductCard
                product={product}
                toggleSubscribe={toggleSubscribe}
              />
            </Box>
          )
        })}
      </Slider>
    </Box>
  )
}

export default ListProduct
