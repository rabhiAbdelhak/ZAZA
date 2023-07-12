import { Avatar, Box, Button, Typography } from '@mui/material'
import Image from 'next/image'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

type CompProps = {
  options: ImportOption[]
  ChangeOption: (option: ImportOption) => void
  title: string
  subtitle: string
}
const WelcomeImport = (props: CompProps) => {
  const { options, ChangeOption, title, subtitle } = props
  const [selectedOption, setSelectedOption] = useState<ImportOption | null>(
    null,
  )
  const { t } = useTranslation()
  return (
    <Box
      sx={{
        p: 4,
        height: 'calc(100vh - 215px)',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography variant="h2" color="textPrimary">
        {title}
      </Typography>
      <Typography variant="caption" color="textSecondary">
        {subtitle}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '60%',
          my: 4,
        }}
      >
        {options.map((option: ImportOption) => {
          return (
            <Box
              key={option.id}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: 2,
                cursor: 'pointer',
                height: 120,
                width: 120,
                p: '10px',
                borderRadius: '5px',
                bgcolor: selectedOption?.id === option.id ? 'neutral.100' : '',
              }}
              onClick={() => setSelectedOption(option)}
            >
              <Image
                src={option.icon}
                style={{
                  filter:
                    selectedOption?.id === option.id ? '' : 'grayscale(1)',
                }}
                width={40}
                height={40}
              />
              <Typography variant="subtitle2" color="text.secondary">
                {option.label}
              </Typography>
            </Box>
          )
        })}
      </Box>
      <Button
        variant="contained"
        disabled={!Boolean(selectedOption)}
        onClick={() => selectedOption && ChangeOption(selectedOption)}
      >
        {t('Confirm')}
      </Button>
    </Box>
  )
}

export default WelcomeImport
