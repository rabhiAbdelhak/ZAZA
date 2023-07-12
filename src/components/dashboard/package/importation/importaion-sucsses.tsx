import { CheckCircleRounded } from '@mui/icons-material'
import { Box, Typography, Button } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'

type CompProps = {
  reImport: () => void
  entity: ImportEntity
  totalImports: number
}

const ImportationSuccess = (props: CompProps) => {
  const { reImport, totalImports, entity } = props
  const router = useRouter()
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '400px',
        gap: 3,
      }}
    >
      <CheckCircleRounded color="success" sx={{ fontSize: '40px' }} />
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h2" color="textPrimary">
          {entity.label} imported successfully
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          {totalImports} {entity.label} were imported successfully. Go back to
          see them.
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 3,
        }}
      >
        <Button variant="outlined" color="secondary" onClick={reImport}>
          Import something else
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => router.push(entity.link)}
        >
          Go to {entity.label}
        </Button>
      </Box>
    </Box>
  )
}

export default ImportationSuccess
