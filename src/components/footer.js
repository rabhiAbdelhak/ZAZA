import { Box, Container, Link, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

const links = [
  {
    label: 'About Us',
    href: 'https://devias.io/about-us',
  },
  {
    label: 'Terms',
    href: 'https://devias.io/legal/tos',
  },
]

export const Footer = () => {
  const { t } = useTranslation()
  return (
    <div>
      <Container
        maxWidth={false}
        sx={{
          display: 'flex',
          flexDirection: {
            sm: 'row',
            xs: 'column',
          },
          py: 3,
          '& a': {
            mt: {
              sm: 0,
              xs: 1,
            },
            '&:not(:last-child)': {
              mr: {
                sm: 5,
                xs: 0,
              },
            },
          },
        }}
      >
        <Typography color="textSecondary" variant="caption">
          © {new Date().getFullYear()} Zimou express
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        {links.map((link) => (
          <Link
            color="textSecondary"
            href={link.href}
            key={link.label}
            target="_blank"
            underline="none"
            variant="body2"
          >
            {t('footer.' + link.label)}
          </Link>
        ))}
      </Container>
    </div>
  )
}
