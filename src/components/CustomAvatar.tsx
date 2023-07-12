import { Avatar, Tooltip, AvatarProps } from '@mui/material'
import Image from 'next/image'
import { useCallback } from 'react'

type CustomAvatarProps = {
  src?: string
  size?: number
  alt?: string
  label?: string
  hiddenTooltip?: boolean
  variant?: AvatarProps['variant']
  avatarSx?: AvatarProps['sx']
}

export const getInitials = (name = '') =>
  name
    .replace(/\s+/, ' ')
    .split(' ')
    .slice(0, 2)
    .map((v) => v && v[0].toUpperCase())
    .join('')

function CustomAvatar({
  src,
  size = 40,
  alt,
  label = '',
  hiddenTooltip = false,
  variant,
  avatarSx,
}: CustomAvatarProps) {
  const getAvatar = () => {
    return (
      <Avatar
        variant={variant}
        alt={alt}
        sx={{ ...avatarSx, width: size, height: size, overflow: 'hidden' }}
      >
        {src ? (
          <Image
            objectFit="contain"
            src={src}
            alt={alt}
            width={size}
            height={size}
          />
        ) : (
          getInitials(label)
        )}
      </Avatar>
    )
  }

  if (hiddenTooltip) {
    return getAvatar()
  }

  return (
    <Tooltip arrow title={label}>
      {getAvatar()}
    </Tooltip>
  )
}

export default CustomAvatar
