import { Card, IconButton, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { useState } from 'react'

export default function DomainCard({
  domain,
  onRemove,
}: {
  domain: Domain
  onRemove?: () => void
}) {
  const [open, setOpen] = useState(false)

  return (
    <Card
      sx={{ px: 2, py: 1 / 2, display: 'flex', gap: 2, alignItems: 'center' }}
    >
      <Typography component="span" variant="subtitle1" flexGrow={1}>
        {domain.name}
      </Typography>
      <IconButton onClick={onRemove} aria-label="remove domain" color="error">
        <DeleteIcon />
      </IconButton>
    </Card>
  )
}
