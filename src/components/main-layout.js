import { useState } from 'react'
import PropTypes from 'prop-types'
import { styled } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { MainNavbar } from './main-navbar'
import { MainSidebar } from './main-sidebar'
import { Footer } from './footer'
import { DashboardNavbar } from './dashboard/dashboard-navbar'
import Statistics from './Statistics'

const MainLayoutRoot = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  paddingTop: 64,
}))

export const MainLayout = ({ children }) => {
  const [openSidebar, setOpenSidebar] = useState(false)
  const lgDown = useMediaQuery((theme) => theme.breakpoints.down('lg'))

  return (
    <>
      <MainNavbar onOpenSidebar={() => setOpenSidebar(true)} />
      <Statistics />
      <MainSidebar
        onClose={() => setOpenSidebar(false)}
        open={lgDown && openSidebar}
      />
      {children}
      <Footer />
    </>
  )
}

MainLayout.propTypes = {
  children: PropTypes.node,
}
