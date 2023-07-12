import PropTypes from 'prop-types'
import { Box, IconButton, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { ChevronLeft as ChevronLeftIcon } from '../icons/chevron-left'
import { ChevronRight as ChevronRightIcon } from '../icons/chevron-right'
import { useTranslation } from 'react-i18next'
import { useSettings } from '../contexts/settings-context'

const PaginationRoot = styled('div')(({ theme }) => ({
  alignItems: 'center',
  display: 'flex',
  padding: theme.spacing(2),
}))

export const Pagination = (props) => {
  const { disabled, onPageChange, page, rowsCount, pageSize, ...other } = props
  // NOTE: Usually, this should be received from the server
  const pagesCount = Math.ceil(rowsCount / pageSize)
  const isFirstPage = page === 1
  const isLastPage = page >= pagesCount
  const { t } = useTranslation()
  const {
    settings: { direction },
  } = useSettings()

  const handlePreviousPage = () => {
    onPageChange?.(page - 1)
  }

  const handleNextPage = () => {
    onPageChange?.(page + 1)
  }

  return (
    <PaginationRoot {...other}>
      {pagesCount > 0 && (
        <Typography
          color="textSecondary"
          sx={{
            alignItems: 'center',
            display: 'flex',
          }}
          variant="body2"
          whiteSpace="nowrap"
        >
          <span>{t('pagination.Page')}</span>
          <span> </span>
          <Typography
            color="textPrimary"
            component="span"
            sx={{ mx: 1 }}
            variant="subtitle2"
          >
            {page}
          </Typography>
          <span>{t('pagination.Of')}</span>
          <span> </span>
          <Typography
            color="textPrimary"
            component="span"
            sx={{ ml: 1 }}
            variant="subtitle2"
          >
            {pagesCount}
          </Typography>
        </Typography>
      )}
      <Box sx={{ flexGrow: 1 }} />
      <IconButton
        disabled={isFirstPage || disabled}
        onClick={handlePreviousPage}
      >
        <ChevronLeftIcon
          sx={{ transform: direction === 'rtl' ? 'rotate(180deg)' : null }}
        />
      </IconButton>
      <IconButton disabled={isLastPage || disabled} onClick={handleNextPage}>
        <ChevronRightIcon
          sx={{ transform: direction === 'rtl' ? 'rotate(180deg)' : null }}
        />
      </IconButton>
    </PaginationRoot>
  )
}

Pagination.defaultProps = {
  disabled: false,
  page: 1,
  rowsCount: 1,
}

Pagination.propTypes = {
  disabled: PropTypes.bool,
  onPageChange: PropTypes.func,
  page: PropTypes.number,
  pageSize: PropTypes.number,
  rowsCount: PropTypes.number,
  sx: PropTypes.object,
}
