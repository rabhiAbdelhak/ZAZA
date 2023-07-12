import { useState } from 'react'
import NextLink from 'next/link'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'
import useMediaQuery from '@mui/material/useMediaQuery'
import {
  AppBar,
  Box,
  Button,
  Divider,
  IconButton,
  Toolbar,
  Badge,
} from '@mui/material'
import { useSettings } from '../../contexts/settings-context'
import { ChevronDown as ChevronDownIcon } from '../../icons/chevron-down'
import { Moon as MoonIcon } from '../../icons/moon'
import { Sun as SunIcon } from '../../icons/sun'
import { AccountPopover } from './account-popover'
// import { OrganizationPopover } from './organization-popover';
import { Logo } from '../logo'
import { DashboardNavbarMenu } from './dashboard-navbar-menu'
import { NotificationsPopover } from './notifications-popover'
import { LanguagePopover } from './language-popover'
import { ShoppingCart } from '@mui/icons-material'
import { useRouter } from 'next/router'
import { useGlobaleStateContext } from '../../contexts/global context/Provider'

const organizations = [
  {
    id: '6039124832',
    name: 'ACME LTD.',
  },
  {
    id: '3828312374',
    name: 'Division LTD.',
  },
]

export const DashboardNavbar = () => {
  const mdDown = useMediaQuery((theme) => theme.breakpoints.down('md'))
  const { i18n, t } = useTranslation()
  const { settings, saveSettings } = useSettings()
  const [openMenu, setOpenMenu] = useState(false)
  const [darkMode, setDarkMode] = useState(settings.theme === 'dark')
  const [rtlDirection, setRtlDirection] = useState(settings.direction === 'rtl')
  const [currentOrganization, setCurrentOrganization] = useState(
    organizations[0],
  )
  const router = useRouter()
  const {
    cartState: { totalItems },
  } = useGlobaleStateContext()

  const handleLanguageChange = (language) => {
    i18n.changeLanguage(language)
    saveSettings({
      ...settings,
      language,
      direction: language === 'ar' ? 'rtl' : 'ltr',
    })
    toast.success(t('Language changed'))
  }

  const handleSwitchTheme = () => {
    saveSettings({
      ...settings,
      theme: settings.theme === 'light' ? 'dark' : 'light',
    })

    setDarkMode(settings.theme === 'light')
  }

  const handleSwitchDirection = () => {
    saveSettings({
      ...settings,
      direction: settings.direction === 'ltr' ? 'rtl' : 'ltr',
    })

    setRtlDirection(settings.direction === 'rtl')
  }

  const handleOrganizationChange = (organizationId) => {
    const newOrganization = organizations.find(
      (organization) => organization.id === organizationId,
    )

    if (!newOrganization) {
      return
    }

    setCurrentOrganization(newOrganization)
  }

  return (
    <AppBar
      elevation={0}
      sx={{
        backgroundColor: 'primary.contrast',
        height: '68px',
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          alignItems: 'center',
          display: 'flex',
          minHeight: 68,
          px: 4,
          py: 2,
        }}
      >
        <NextLink href="/dashboard/products/shop" passHref>
          <Box
            component="a"
            sx={{
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Logo emblemOnly variant="light" />
          </Box>
        </NextLink>
        <Divider
          flexItem
          orientation="vertical"
          sx={{
            borderColor: '#CDD0DB',
            mx: 3,
          }}
        />
        {/* <OrganizationPopover
          currentOrganization={currentOrganization}
          onOrganizationChange={handleOrganizationChange}
          organizations={organizations}
          sx={{
            display: {
              md: 'flex',
              xs: 'none'
            }
          }}
        /> */}
        <DashboardNavbarMenu
          onClose={() => setOpenMenu(false)}
          open={mdDown && openMenu}
        />
        <Button
          endIcon={
            <ChevronDownIcon
              fontSize="small"
              sx={{
                ml: 2,
                transition: 'transform 250ms',
                transform: openMenu ? 'rotate(180deg)' : 'none',
              }}
            />
          }
          onClick={() => setOpenMenu(true)}
          sx={{
            color: 'primary',
            display: {
              md: 'none',
              xs: 'flex',
            },
          }}
          variant="text"
        >
          Menu
        </Button>
        <Box sx={{ flexGrow: 1 }} />
        <LanguagePopover
          language={settings.language}
          onLanguageChange={handleLanguageChange}
          sx={{
            display: {
              md: 'inline-flex',
              xs: 'none',
            },
          }}
        />
        <IconButton
          onClick={handleSwitchTheme}
          sx={{
            mx: 1,
            color: 'text.primary',
            display: {
              md: 'inline-flex',
              xs: 'flex',
            },
          }}
        >
          {darkMode ? <SunIcon /> : <MoonIcon />}
        </IconButton>
        <Badge
          badgeContent={totalItems > 99 ? '99+' : totalItems}
          color="warning"
          sx={{
            color: 'primary.contrastText',
            mr: 2,
          }}
        >
          <IconButton
            sx={{ color: 'text.primary', linHeight: 0, minWidth: 0, p: '10px' }}
            onClick={() => router.push('/dashboard/products/shop/cart')}
          >
            <ShoppingCart />
          </IconButton>
        </Badge>
        <NotificationsPopover sx={{ mr: 1, color: 'text.primary' }} />
        <AccountPopover
          currentOrganization={currentOrganization}
          darkMode={darkMode}
          onLanguageChange={handleLanguageChange}
          onOrganizationChange={handleOrganizationChange}
          onSwitchDirection={handleSwitchDirection}
          onSwitchTheme={handleSwitchTheme}
          organizations={organizations}
          rtlDirection={rtlDirection}
        />
      </Toolbar>
    </AppBar>
  )
}
