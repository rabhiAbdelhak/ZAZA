import PropTypes from 'prop-types'
import { Button, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { Plus as PlusIcon } from '../icons/plus'
import { QuestionMarkOutlined as QuestionMarkIcon } from '../icons/question-mark-outlined'
import { useTranslation } from 'react-i18next'

const ResourceUnavailableRoot = styled('div')(({ theme }) => ({
  alignItems: 'center',
  backgroundColor:
    theme.palette.mode === 'light'
      ? theme.palette.neutral[100]
      : theme.palette.neutral[900],
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(3),
}))

export const ResourceUnavailable = (props) => {
  const { onCreate, ...other } = props
  const { t } = useTranslation()

  return (
    <ResourceUnavailableRoot {...other}>
      <QuestionMarkIcon sx={{ color: 'text.secondary' }} />
      <Typography color="textSecondary" sx={{ mt: 2 }} variant="body2">
        {t('errors.ResourceUnavailable')}
      </Typography>
      {onCreate && (
        <Button
          color="primary"
          onClick={onCreate}
          startIcon={<PlusIcon fontSize="small" />}
          sx={{ mt: 2 }}
          variant="contained"
        >
          {t('errors.CreateData')}
        </Button>
      )}
    </ResourceUnavailableRoot>
  )
}

ResourceUnavailable.propTypes = {
  onCreate: PropTypes.func,
  sx: PropTypes.object,
}
