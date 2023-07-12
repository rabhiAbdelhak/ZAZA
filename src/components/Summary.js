import { ArrowRightAltOutlined } from '@mui/icons-material'
import { Box, Button, Card, Grid, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { useSettings } from '../contexts/settings-context'

const Summary = ({ title, items, link, sx }) => {
  const router = useRouter()
  const { t } = useTranslation()
  const { settings } = useSettings()
  return (
    <Box sx={{ ...sx, width: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h6" sx={{ fontSize: '15px' }}>
          {t('statistics_bar.' + title)}
        </Typography>
        <Button
          color="primary"
          size="small"
          onClick={() => router.push(link.url)}
        >
          {t('statistics_bar.' + link.text)}{' '}
          <ArrowRightAltOutlined
            sx={{
              transform: settings.direction === 'rtl' ? 'rotate(180deg)' : null,
            }}
          />
        </Button>
      </Box>
      <Card>
        <Grid container>
          {items.map((item, index) => {
            const { icon: Icon, label, content } = item
            return (
              <Grid
                item
                key={item.label}
                md={12 / items.length}
                sm={6}
                xs={12}
                sx={{
                  borderRight: (theme) => ({
                    md:
                      items.length > index + 1
                        ? `1px solid ${theme.palette.divider}`
                        : 0,
                  }),
                }}
              >
                <Box
                  sx={{
                    p: '8px 6px',
                    borderRadius: 1,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Icon
                    sx={{
                      color: item.iconColor || 'text.secondary',
                      fontSize: '17px',
                    }}
                  />
                  <Box
                    sx={{
                      ml: 0.5,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 0.5,
                      trasnsition: '0.5s',
                    }}
                  >
                    <Typography
                      color="textSecondary"
                      variant="overline"
                      sx={{
                        fontSize: '10px',
                        trasnsition: '0.5s',
                      }}
                      noWrap
                    >
                      {t(label)}
                    </Typography>
                    <Typography
                      color="textPrimary"
                      variant="h6"
                      sx={{
                        fontSize: '12px',
                        trasnsition: '0.5s',
                      }}
                    >
                      {content}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            )
          })}
        </Grid>
      </Card>
    </Box>
  )
}

export default Summary
