import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import { Box, Container, Divider, Tab, Tabs, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

export const AccountLayout = (props) => {
  const { children } = props
  const router = useRouter()
  const { t } = useTranslation()

  const tabs = [
    {
      href: '/dashboard/account',
      label: t('accountPage.General'),
    },
    {
      href: '/dashboard/account/notifications',
      label: t('accountPage.Notifications'),
    },
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
              {t('accountPage.AccountSettings')}
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

AccountLayout.propTypes = {
  children: PropTypes.node,
}
