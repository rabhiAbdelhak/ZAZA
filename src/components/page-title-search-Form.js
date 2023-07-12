import { ArrowBack } from '@mui/icons-material'
import { Button, Container, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import SearchProductsForm from './product/search-products-form'

const PageTitleSearchForm = ({ pageTitle, back, number }) => {
  const router = useRouter()
  const { t } = useTranslation()

  return (
    <Container
      maxWidth={false}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        pt: 1,
      }}
    >
      {back && (
        <Button
          size="small"
          color="primary"
          startIcon={<ArrowBack />}
          sx={{ width: '100px', pr: 0, minwidth: 0, px: 0 }}
          onClick={() => router.back()}
        >
          {t('Back')}
        </Button>
      )}
      <Typography variant="h3">
        {t(pageTitle)}
        {number && <Typography>{number}</Typography>}
      </Typography>
      <SearchProductsForm />
    </Container>
  )
}

export default PageTitleSearchForm
