import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import { Box, Container, Divider, Tab, Tabs, Typography } from '@mui/material'
import { useAuth } from '../../../providers/AuthProvider'
import { useTranslation } from 'react-i18next'

export const OrganizationLayout = (props) => {
  const { children } = props
  const router = useRouter()
  const { t } = useTranslation()

  const { user } = useAuth()

  const hasAutorization = ['store', 'employe_manager'].includes(user?.roles)

  const tabs = hasAutorization
    ? [
        {
          href: '/dashboard/organization',
          label: t('organisationPage.General'),
        },
        {
          href: '/dashboard/organization/team',
          label: t('organisationPage.Team'),
        },
        {
          href: '/dashboard/organization/domains',
          label: 'Domains',
        },
      ]
    : [
        {
          href: '/dashboard/organization',
          label: t('organisationPage.General'),
        },
        // {
        //   href: "/dashboard/organization/billing",
        //   label: "Billing",
        // },
      ]

  const handleTabsChange = (event, value) => {
    router.push(tabs[value].href)
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Container
        maxWidth={false}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <Box sx={{ py: 4 }}>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
            }}
          >
            <Typography color="textPrimary" variant="h4">
              {t('organisationPage.OrganizationSettings')}
            </Typography>
          </Box>
          <Tabs
            allowScrollButtonsMobile
            sx={{ mt: 2 }}
            value={
              router.isReady
                ? tabs.findIndex((tab) => tab.href === router.asPath)
                : false
            }
            variant="scrollable"
            onChange={handleTabsChange}
            textColor="primary"
          >
            {tabs.map((option, index) => (
              <Tab key={option.href} label={option.label} value={index} />
            ))}
          </Tabs>
          <Divider />
        </Box>
        {children}
      </Container>
    </Box>
  )
}

OrganizationLayout.propTypes = {
  children: PropTypes.node,
}
