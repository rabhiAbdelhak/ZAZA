import { useCallback, useEffect, useState } from 'react'
import Summary from './Summary'
import { Box, Container, Grid, Typography } from '@mui/material'
import {
  ArrowCircleLeft,
  Cancel,
  CheckRounded,
  FiberNew,
  HelpRounded,
  LocalShipping,
} from '@mui/icons-material'
import { throttle } from '../utils/throttle'
import { orderApi } from '../api/order'

// NOTE: This should be generated based on products data
const ordersStats = [
  {
    id: 0,
    content: '500',
    icon: FiberNew,
    iconColor: 'info.main',
    label: 'New',
  },
  {
    id: 3,
    content: 0,
    icon: HelpRounded,
    iconColor: 'warning.main',
    label: 'To Confirm',
  },
  {
    id: 1,
    content: 0,
    icon: CheckRounded,
    iconColor: 'success.main',
    label: 'Confirmed',
  },
  {
    id: 2,
    content: 0,
    icon: Cancel,
    iconColor: 'error.main',
    label: 'Canceled',
  },
]

const deliveryStats = [
  {
    content: '500',
    icon: FiberNew,
    iconColor: 'info.main',
    label: 'New',
  },
  {
    content: '15',
    icon: LocalShipping,
    iconColor: 'success.main',
    label: 'Delivering',
  },
  {
    content: '233',
    icon: CheckRounded,
    iconColor: 'success.main',
    label: 'Delivered',
  },
  {
    content: '08',
    icon: ArrowCircleLeft,
    iconColor: 'warning.main',
    label: 'Returning',
  },
  {
    content: '15',
    icon: Cancel,
    iconColor: 'error.main',
    label: 'Returned',
  },
]

const Statistics = () => {
  const [error, setError] = useState(null)
  const [statistics, setStatistics] = useState({
    ordersStats: ordersStats,
    packagesStats: {},
  })

  const getOrdersByStatusStats = useCallback(() => {
    orderApi
      .getOrdersByStatusStats()
      .then((data) => {
        setStatistics((prevState) => {
          const ordersStats = prevState.ordersStats.map((stat) => {
            const orders_count = data.find(
              (s) => s.status_id === stat.id,
            )?.orders_count
            return { ...stat, content: orders_count }
          })
          return { ...prevState, ordersStats }
        })
        setError(null)
      })
      .catch((err) => {
        setError(err.response.data.message)
      })
  }, [])

  useEffect(() => {
    getOrdersByStatusStats()
  }, [getOrdersByStatusStats])

  if (error) {
    return (
      <Box>
        <Typography variant="caption" color="error.main">
          {error}
        </Typography>
      </Box>
    )
  }
  return (
    <Box
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === 'light' ? 'neutral.100' : 'neutral.800',
        py: '0',
        height: '80px',
        display: 'flex',
        alignItems: 'center',
        position: 'sticky',
        top: 68,
        zIndex: 1000,
        transition: '250ms',
        display: {
          lg: 'flex',
          md: 'flex',
          xs: 'none',
          sm: 'none',
        },
      }}
    >
      {' '}
      <Box sx={{ width: '73px', height: '100%' }}></Box>
      <Box sx={{ flexGrow: 1 }}>
        <Container maxWidth={false} sx={{ position: 'relative' }}>
          <Grid container sx={{ justifyContent: 'flex-end' }}>
            <Grid
              item
              md={5.3}
              sx={{
                display: 'flex',
                width: '50%',
                position: 'absolute',
                left: '-55px',
                top: '50%',
                transform: 'translateY(-50%)',
              }}
            >
              <Summary
                title="Orders"
                items={statistics.ordersStats}
                link={{ text: 'Open Orders', url: '/dashboard/orders' }}
              />
            </Grid>
            <Grid item md={6.5}>
              <Summary
                title="Packages & Delivery"
                items={deliveryStats}
                link={{
                  text: 'Open Packages & Delivery',
                  url: '/dashboard/packages',
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  )
}

export default Statistics
