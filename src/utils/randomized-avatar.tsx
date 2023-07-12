import { Avatar } from '@mui/material'
const colors = [
  '#F44336', // Red
  '#E91E63', // Pink
  '#9C27B0', // Purple
  '#673AB7', // Deep Purple
  '#3F51B5', // Indigo
  '#2196F3', // Blue
  '#03A9F4', // Light Blue
  '#00BCD4', // Cyan
  '#009688', // Teal
  '#4CAF50', // Green
  '#8BC34A', // Light Green
  '#CDDC39', // Lime
  '#FFEB3B', // Yellow
  '#FFC107', // Amber
  '#FF9800', // Orange
  '#FF5722', // Deep Orange
]
function getContrastColor(hexColor: any) {
  // Convert hex color to RGB
  const rgbColor = hexToRgb(hexColor)

  // Calculate the luminance using the formula from the WCAG 2.0
  const luminance =
    (0.2126 * rgbColor.r + 0.7152 * rgbColor.g + 0.0722 * rgbColor.b) / 255

  // Return black or white based on the luminance value
  return luminance > 0.5 ? '#000000' : '#ffffff'
}

function hexToRgb(hexColor: any) {
  // Remove the hash symbol if it exists
  const hex = hexColor.replace('#', '')

  // Convert the hex color to RGB
  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)

  return { r, g, b }
}
function generateInitials(name: any) {
  let initials = ''
  name.split(' ').forEach((word: any) => {
    initials += word[0]
  })
  return initials.toUpperCase()
}

function generateRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)]
}

export function generateAvatar(name: any, size = 30, assignedStatus?: boolean) {
  const initials = generateInitials(name)
  const generatedColor = generateRandomColor()

  return (
    <Avatar
      sx={{
        width: size,
        height: size,
        border: assignedStatus ? 'solid 3px' : 'none',
        borderColor: 'info.main',
      }}
    >
      {initials}
    </Avatar>
  )
}
