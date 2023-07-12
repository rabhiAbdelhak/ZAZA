import { Box, ButtonBase } from '@mui/material'
import CameraAltIcon from '@mui/icons-material/CameraAlt'
import PersonIcon from '@mui/icons-material/Person'
import { ChangeEvent, useMemo } from 'react'
import Image from 'next/image'

type AvatarUploadProps = {
  src?: File | string
  onChange?: (photo: File) => void
  disabled?: boolean
  size?: number
}

function AvatarUpload({
  src = '',
  onChange,
  disabled = false,
  size = 48,
}: AvatarUploadProps) {
  const url = useMemo(
    () => (src instanceof File ? URL.createObjectURL(src) : src),
    [src],
  )

  const changeFileHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (onChange && file) {
      onChange(file)
    }
  }

  return (
    <ButtonBase
      disabled={disabled}
      component="label"
      sx={{
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: (theme) => theme.palette.grey[300],
        position: 'relative',
      }}
    >
      <input
        disabled={disabled}
        onChange={changeFileHandler}
        hidden
        value=""
        type="file"
        accept="image/*"
      />

      <PersonIcon
        sx={{
          color: (theme) => theme.palette.grey[600],
          fontSize: size / 2,
        }}
      />

      {Boolean(url) && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: '50%',
            overflow: 'hidden',
          }}
        >
          <Image height={size} width={size} src={url} />
        </Box>
      )}
    </ButtonBase>
  )
}

export default AvatarUpload
