import { Button, Grid, Typography } from '@mui/material'

const ProductPagesDescriptionAdd = () => {
  return (
    <Grid container bgcolor="text.primary">
      <Grid item md={6} px={5} py={6}>
        <Typography variant="h3" color="grey.50">
          Drive sales with Product Pages
        </Typography>
        <Typography variant="subtitle1" color="grey.50" sx={{ mb: 3 }}>
          Whether you want to sell products down the street or around the world,
          we have all the tools you need.
        </Typography>
        <Typography
          variant="subtitle2"
          color="primary.contrast"
          sx={{ fontWeight: 100, mb: 1 }}
        >
          Discover why millions of entrepreneurs choose Shopify to build their
          business—from Hello World to IPO.
        </Typography>
        <Typography variant="body2" color="grey.50" sx={{ lineHeight: '150%' }}>
          In 1881, Ives had a flash of insight regarding a better printing
          technique.
          <br />
          <br />
          “While operating my photostereotype process in Ithaca, I studied the
          problem of halftone process,” Ives said. “I went to bed one night in a
          state of brain fog over the problem, and the instant I woke in the
          morning saw before me, apparently projected on the ceiling, the
          completely worked out process and equipment in operation.”
          <br />
          <br />
          Ives quickly translated his vision into reality and patented his
          printing approach in 1881. He spent the remainder of the decade
          improving upon it. By 1885, he had developed a simplified process that
          delivered even better results. The Ives Process, as it came to be
          known, reduced the cost of printing images by 15x and remained the
          standard printing technique for the next 80 years.
          <br />
          <br />
          Alright, now let&apos;s discuss what lessons we can learn from Ives
          about the creative process.
        </Typography>
        <Button
          size="small"
          variant="contained"
          sx={{ color: 'grey.50', mt: 3 }}
        >
          Get started with a product page
        </Button>
      </Grid>
      <Grid
        item
        md={6}
        sx={{ backgroundImage: 'url("/static/addP.webp")' }}
      ></Grid>
    </Grid>
  )
}

export default ProductPagesDescriptionAdd
