import Head from 'next/head'

import {
  AppBar,
  Box,
  Card,
  CardContent,
  Container,
  Toolbar,
} from '@mui/material'
import { JWTLogin } from '../../components/authentication/jwt-login'
import { Logo } from '../../components/logo'
import { useSettings } from '../../contexts/settings-context'
import { gtm } from '../../lib/gtm'
import { GuestGuard } from '../../components/authentication/guest-guard'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import { Alert } from '@mui/material'
import { DangerousOutlined, TimesOneMobiledataSharp } from '@mui/icons-material'

const Login = () => {
  const { settings } = useSettings()
  const router = useRouter()
  const { t } = useTranslation()
  const errQuery = router.query.error

  return (
    <>
      <Head>
        <title>{t('login.Login')}</title>
      </Head>
      <AppBar elevation={0} sx={{ backgroundColor: 'background.paper' }}>
        <Container
          maxWidth="md"
          sx={{
            mt: '64px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Toolbar disableGutters sx={{ height: 64 }}>
            <a>
              <Logo variant={settings.theme === 'dark' ? 'light' : 'dark'} />
            </a>
          </Toolbar>
        </Container>
      </AppBar>
      <Box
        sx={{
          backgroundColor: 'background.paper',
          flexGrow: 1,
          pt: '64px',
        }}
      >
        <Box sx={{ py: 12 }}>
          <Container maxWidth="md">
            <Card sx={{ m: '0 auto', maxWidth: 500 }}>
              <CardContent>
                {errQuery && (
                  <Alert
                    sx={{
                      marginBottom: 1.3,
                    }}
                    icon={<DangerousOutlined />}
                    color="error"
                  >
                    {t('token_errors.error_token_message')}
                  </Alert>
                )}
                <JWTLogin />
              </CardContent>
            </Card>
          </Container>
        </Box>
      </Box>
    </>
  )
}

Login.getLayout = (page) => <GuestGuard>{page}</GuestGuard>

export default Login
