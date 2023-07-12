import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import { Box, Divider, Drawer, IconButton, List } from '@mui/material'
import { DashboardSidebarItem } from './dashboard-sidebar-item'
import { Scrollbar } from '../scrollbar'
import { ChevronLeft as ChevronLeftIcon } from '../../icons/chevron-left'
import CorporateFareIcon from '@mui/icons-material/CorporateFare'
import { ChevronRight as ChevronRightIcon } from '../../icons/chevron-right'
import { Cog as CogIcon } from '../../icons/cog'
import { ColorSwatch as ColorSwatchIcon } from '../../icons/color-swatch'
import { CustomChartPie as ChartPieIcon } from '../../icons/custom-chart-pie'
import { CustomCube as CubeIcon } from '../../icons/custom-cube'
import { CustomShoppingCart as ShoppingCartIcon } from '../../icons/custom-shopping-cart'
import { CustomUsers as UsersIcon } from '../../icons/custom-users'
import { DocumentText as DocumentTextIcon } from '../../icons/document-text'
import { OfficeBuilding as OfficeBuildingIcon } from '../../icons/office-building'
import {
  AllInbox,
  Collections,
  StoreRounded,
  Warehouse,
} from '@mui/icons-material'
import { useAuth } from '../../providers/AuthProvider'
import { useSettings } from '../../contexts/settings-context'
import { ExternalLink } from '@/icons/external-link'
import { useTranslation } from 'react-i18next'

export const DashboardSidebar = (props) => {
  const { user } = useAuth()
  const { t } = useTranslation()

  const isEmployee = user?.roles === 'employe'

  const items = useMemo(
    () => [
      {
        icon: CubeIcon,
        title: 'Orders',
        items: [
          {
            href: '/dashboard/orders',
            title: 'My orders',
          },
          {
            href: '/dashboard/orders/new-ec-order',
            title: 'New Order',
          },
        ],
      },
      {
        icon: ShoppingCartIcon,
        title: 'Products',
        items: [
          {
            href: '/dashboard/products',
            title: 'My products',
          },
          {
            href: '/dashboard/products/new',
            title: 'New',
          },
        ],
      },
      {
        icon: Warehouse,
        title: 'Stocks',
        items: [
          {
            href: '/dashboard/stocks/warehouses',
            title: 'My Warehouses',
          },
          {
            href: '/dashboard/products/enters',
            title: 'Enter Vouchers',
          },
          {
            href: '/dashboard/products/exits',
            title: 'Exit Vouchers',
          },
          {
            href: '/dashboard/products/stocks',
            title: 'Stock Management',
          },
        ],
      },
      {
        icon: UsersIcon,
        title: 'Suppliers',
        items: [
          {
            href: '/dashboard/suppliers',
            title: 'My Suppliers',
          },
          {
            href: '/dashboard/purchase-orders',
            title: 'My Purchases',
          },
          {
            href: '/dashboard/suppliers-payments',
            title: 'My Payments',
          },
        ],
      },
      {
        icon: Collections,
        title: 'Landing pages',
        items: [
          {
            href: '/dashboard/landing',
            title: 'My landing pages',
          },
          {
            href: '/dashboard/landing/new',
            title: 'New',
          },
        ],
      },
      {
        icon: AllInbox,
        title: 'Packages',
        items: [
          {
            href: '/dashboard/packages',
            title: 'My packages',
          },
          {
            href: '/dashboard/packages/new-package',
            title: 'New',
          },
          {
            href: '/dashboard/packages/payments',
            title: 'Payments',
          },
          {
            href: '/dashboard/packages/importations',
            title: 'Importations',
          },
        ],
      },
      {
        icon: CorporateFareIcon,
        title: 'Delivery Companies',
        items: [
          {
            href: '/dashboard/s-partners',
            title: 'Delivery Companies',
          },
          {
            href: '/dashboard/s-partners/new-partner-company',
            title: 'New Delivery Company',
          },
        ],
      },
      {
        icon: OfficeBuildingIcon,
        title: 'Organization',
        items: [
          {
            href: '/dashboard/organization/importation',
            title: 'importations (test)',
          },
          ...(!isEmployee
            ? [
                {
                  href: '/dashboard/organization/team',
                  title: 'Team',
                },
                {
                  href: '/dashboard/organization/domains',
                  title: 'Domains',
                },
              ]
            : []),
        ],
      },
      {
        icon: StoreRounded,
        title: 'Dropship',
        items: [
          {
            href: '/dashboard/products/shop',
            title: 'Shop',
          },
        ],
      },
      {
        icon: ExternalLink,
        title: 'Importations',
        items: [
          {
            href: '/dashboard/importation',
            title: 'importations csv/excel (test)',
          },
        ],
      },
    ],
    [isEmployee],
  )
  const { onPin, pinned } = props
  const router = useRouter()
  const [openedItem, setOpenedItem] = useState(null)
  const [activeItem, setActiveItem] = useState(null)
  const [activeHref, setActiveHref] = useState('')
  const [hovered, setHovered] = useState(false)
  const {
    settings: { direction },
  } = useSettings()
  const handleOpenItem = (item) => {
    if (openedItem === item) {
      setOpenedItem(null)
      return
    }

    setOpenedItem(item)
  }

  useEffect(() => {
    items.forEach((item) => {
      if (item.items) {
        for (let index = 0; index < item.items.length; index++) {
          const active = item.items[index].partialMatch
            ? router.asPath.startsWith(item.items[index].href)
            : router.asPath === item.items[index].href

          if (active) {
            setActiveItem(item)
            setActiveHref(item.items[index].href)
            setOpenedItem(item)
            break
          }
        }
      } else {
        const active = item.partialMatch
          ? router.asPath.startsWith(item.href)
          : router.asPath === item.href

        if (active) {
          setActiveItem(item)
          setOpenedItem(item)
        }
      }
    })
  }, [items, router.asPath])

  return (
    <Drawer
      open
      sx={{ zIndex: 900 }}
      variant="permanent"
      PaperProps={{
        onMouseOver: () => {
          setHovered(true)
        },
        onMouseLeave: () => {
          setHovered(false)
        },
        sx: {
          backgroundColor: (theme) =>
            theme.palette.mode === 'light' ? 'neutral.50' : 'neutral.900',
          height: `calc(100vh - 148px)`,
          overflowX: 'hidden',
          top: 148,
          transition: 'width 250ms ease-in-out',
          width: pinned ? 270 : 73,
          '& .simplebar-content': {
            height: '100%',
          },
          '&:hover': {
            width: 270,
            '& span, p': {
              display: 'flex',
            },
          },
        },
      }}
    >
      <Scrollbar
        style={{
          display: 'flex',
          flex: 1,
          overflowX: 'hidden',
          overflowY: 'auto',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            px: 2,
            pt: 5,
            pb: 2,
          }}
        >
          <List disablePadding>
            {items.map((item) => (
              <DashboardSidebarItem
                active={activeItem?.title === item.title}
                activeHref={activeHref}
                key={item.title}
                onOpen={() => handleOpenItem(item)}
                open={openedItem?.title === item.title && (hovered || pinned)}
                pinned={pinned}
                {...item}
              />
            ))}
          </List>
          <Box sx={{ flexGrow: 1 }} />
          <Divider />
          <Box sx={{ pt: 1 }}>
            <IconButton onClick={onPin}>
              {pinned ? (
                <ChevronLeftIcon
                  color="action"
                  sx={{
                    transform: direction === 'rtl' ? 'rotate(180deg)' : null,
                  }}
                />
              ) : (
                <ChevronRightIcon
                  color="action"
                  sx={{
                    transform: direction === 'rtl' ? 'rotate(180deg)' : null,
                  }}
                />
              )}
            </IconButton>
          </Box>
        </Box>
      </Scrollbar>
    </Drawer>
  )
}

DashboardSidebar.propTypes = {
  onPin: PropTypes.func,
  pinned: PropTypes.bool,
}
