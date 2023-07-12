import { Grid, List, ListItem, ListItemText, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

const CategoriesMenu = ({ categories }) => {
  const router = useRouter()
  const { t } = useTranslation()

  const handleCategoryClick = (category) => {
    const { id, name } = category
    router.push('/dashboard/products/shop/search?category=' + `${id}/${name}`)
  }

  return (
    <Grid item md={3}>
      <Typography variant="h4">{t('shop_page.Categories')}</Typography>
      <List>
        {categories.map((cat) => {
          const { name, id } = cat
          return (
            <ListItem
              key={id}
              sx={{
                mb: 0,
                p: '3px 0px 3px 20px',
                borderRadius: '40px',
                '&:hover': { bgcolor: 'neutral.100' },
                cursor: 'pointer',
              }}
              onClick={() => handleCategoryClick(cat)}
            >
              <ListItemText>
                <Typography color="text.primary">
                  {t(`categories.${name}`)}
                </Typography>
              </ListItemText>
            </ListItem>
          )
        })}
      </List>
    </Grid>
  )
}

export default CategoriesMenu
