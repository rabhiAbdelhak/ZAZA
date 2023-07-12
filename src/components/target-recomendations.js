import { Group, LocationOn, PregnantWoman } from '@mui/icons-material'
import { Box, Grid, Typography } from '@mui/material'

//local imports
import Recomendation from './recomendation'

const recomendations = [
  {
    id: 1,
    value: '20-30',
    label: 'Age Group',
    color: '#311B92',
    bgcolor: '#EDE7F6',
    Icon: Group,
  },
  {
    id: 2,
    value: 'North',
    label: 'Region',
    color: '#D84315',
    bgcolor: '#FBE9E7',
    Icon: LocationOn,
  },
  {
    id: 3,
    value: 'Women',
    label: 'Audience',
    color: '#1B5E20',
    bgcolor: '#E8F5E9',
    Icon: PregnantWoman,
  },
  {
    id: 4,
    value: '20-30',
    label: 'Age Group',
    color: '#311B92',
    bgcolor: '#EDE7F6',
    Icon: Group,
  },
  {
    id: 5,
    value: 'North',
    label: 'Region',
    color: '#D84315',
    bgcolor: '#FBE9E7',
    Icon: LocationOn,
  },
  {
    id: 6,
    value: 'Women',
    label: 'Audience',
    color: '#1B5E20',
    bgcolor: '#E8F5E9',
    Icon: PregnantWoman,
  },
]

const TargetRecomendations = () => {
  return (
    <Box>
      <Box sx={{ textAlign: 'center', mb: 5 }}>
        <Typography variant="h4" color="text.primary">
          Targeting Recommendations
        </Typography>
        <Typography variant="subtitle3" color="text.primary">
          Whether you want to sell products down the street or around the world,
          we have all the tools you need.
        </Typography>
      </Box>
      <Grid container sx={{ justifyContent: 'center', gap: 6 }}>
        {recomendations.map((recomendation) => {
          return <Recomendation key={recomendation.id} {...recomendation} />
        })}
      </Grid>
    </Box>
  )
}

export default TargetRecomendations
