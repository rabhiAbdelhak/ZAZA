import {
  AttachMoneyOutlined,
  AutoAwesomeSharp,
  StorefrontOutlined,
} from '@mui/icons-material'
import ElectricBoltOutlinedIcon from '@mui/icons-material/ElectricBoltOutlined'
import {
  alpha,
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from '@mui/material'
import { getFirstCharacter } from '../utils/avatar'
import { dinarFormat } from '../utils/formats'
import PropTypes from 'prop-types'
import { Cube as CubeIcon } from '../icons/cube'
const deliveryTypesIcons = {
  FREE: AutoAwesomeSharp,
  EXPRESS: ElectricBoltOutlinedIcon,
  ECONOMY_EXPRESS: AttachMoneyOutlined,
  POINT_RELAIS: StorefrontOutlined,
  // YALIDINE: CloudDoneOutlined,
  STANDARD: CubeIcon,
  // ZR_EXPRESS: CubeIcon,
}

export default function DeliveryCard({
  type,
  price,
  selected = false,
  onClick,
  disabled = false,
  sx,
}) {
  const Icon = deliveryTypesIcons[type?.toUpperCase()?.replace(' ', '_')]
  const hasPrice = typeof price !== undefined
  return (
    <Card
      sx={{
        ...sx,
        ...(selected && {
          borderColor: (theme) => theme.palette.primary.main,
          backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.05),
        }),
        p: 0,
      }}
    >
      <CardActionArea disabled={disabled} onClick={onClick} sx={{ p: 0 }}>
        <CardContent
          sx={{ display: 'flex', gap: 2, alignItems: 'center', p: 1.3 }}
        >
          <Avatar>
            {!!Icon && <Icon />}
            {!Icon && getFirstCharacter(type)}
          </Avatar>
          <Box>
            <Typography
              sx={{ color: 'text.secondary', textTransform: 'capitalize' }}
              variant="body2"
            >
              {type}
            </Typography>
            {hasPrice && (
              <Typography noWrap sx={{ fontWeight: 500 }}>
                {dinarFormat(price)}
              </Typography>
            )}
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

DeliveryCard.propTypes = {
  type: PropTypes.string,
  price: PropTypes.number,
  selected: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
}
