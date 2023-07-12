import { ArrowOutward, CallMade } from '@mui/icons-material'
import {
  Avatar,
  Box,
  Checkbox,
  Divider,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from '@mui/material'
import Image from 'next/image'
import NextLink from 'next/link'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { dinarFormat } from '../../../utils/formats'
import { Pagination } from '../../pagination'
import { ResourceError } from '../../resource-error'
import { ResourceUnavailable } from '../../resource-unavailable'

//local imports
import { Scrollbar } from '../../scrollbar'
import TableLoading from '../table-loading'
import LandingActions from './landing-actions'

const columns = [
  {
    id: 'title',
    label: 'Page Title',
  },
  {
    id: 'id',
    label: 'ID',
  },
  {
    id: 'url',
    label: 'Link',
  },
  {
    id: 'store_name',
    label: 'Store',
  },
  {
    id: 'price',
    label: 'Price',
  },
  {
    id: 'promo_price',
    label: 'Promo',
  },
  {
    id: 'start_date',
    label: 'Promo Start',
  },
  {
    id: 'end_date',
    label: 'Promo End',
  },
  {
    id: 'template_name',
    label: 'Template',
  },
]

const LandingTable = (props) => {
  const {
    landings = [],
    selectedLandings,
    handleSingleLandingSelection,
    page,
    pageSize,
    onDelete,
    onPageChange,
    sortBy,
    onSortChange,
    onSelect,
    onSelectAll,
    openDrawer,
    clearSelected,
    isLoading,
    showLandingDetails,
    error,
  } = props
  const { t } = useTranslation()
  const displayLoading = isLoading
  const [SingleSelectedRef, setSingleSelectedRef] = useState(null)
  const displayError = Boolean(!isLoading && error)
  const displayUnavailable = Boolean(!isLoading && !error && !landings.length)
  const displayData = Boolean(!isLoading && !error && landings.length)

  const clickProductCheckboxHandler = (landing) => (e) => {
    e.stopPropagation()
    handleSingleLandingSelection(landing.id)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'column',
      }}
    >
      <Divider />
      <Scrollbar>
        <TableContainer
          sx={{
            minWidth: openDrawer ? '500px' : '1000px',
            height: openDrawer ? '470px' : '420px',
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={
                      landings.length > 0 &&
                      selectedLandings.length === landings.length
                    }
                    disabled={isLoading}
                    indeterminate={
                      selectedLandings.length > 0 &&
                      selectedLandings.length < landings.length
                    }
                    onChange={onSelectAll}
                  />
                </TableCell>
                {columns.map((column) => (
                  <TableCell key={column.id}>
                    <TableSortLabel
                      active={sortBy === column.id}
                      direction={sortBy === column.id ? sort : 'asc'}
                      disabled={isLoading}
                      onClick={(event) => onSortChange(event, column.id)}
                    >
                      <Typography noWrap variant="inherit">
                        {t('Attributes.' + column.label)}
                      </Typography>
                    </TableSortLabel>
                  </TableCell>
                ))}
                <TableCell />
              </TableRow>
            </TableHead>
            {displayData && (
              <TableBody>
                {landings.map((landing) => {
                  return (
                    <TableRow
                      hover
                      sx={{ cursor: 'pointer' }}
                      key={landing.id}
                      onClick={() =>
                        showLandingDetails && showLandingDetails(landing.id)
                      }
                      selected={
                        !!selectedLandings.find(
                          (selectedCustomer) => selectedCustomer === landing.id,
                        )
                      }
                      ref={
                        selectedLandings.length === 1 &&
                        selectedLandings.includes(landing.id)
                          ? setSingleSelectedRef
                          : null
                      }
                    >
                      <TableCell
                        padding="checkbox"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Checkbox
                          checked={
                            !!selectedLandings.find(
                              (selected) => selected === landing.id,
                            )
                          }
                          onChange={(event) => onSelect(event, landing.id)}
                          onClick={clickProductCheckboxHandler}
                        />
                      </TableCell>
                      <TableCell>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            width: '100%',
                          }}
                        >
                          {landing.image && (
                            <Image
                              height={40}
                              width={40}
                              src={landing.image}
                              alt={landing.name}
                              sx={{ borderRadius: '5px' }}
                            />
                          )}
                          {!landing.image && <Avatar variant="rounded" />}
                          <Typography
                            noWrap
                            variant="body2"
                            color="inherit"
                          >{`${landing.name}`}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography noWrap color="inherit" variant="inherit">
                          {landing.id}
                        </Typography>
                      </TableCell>
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        <Box
                          sx={{
                            display: 'flex',
                            gap: 0.5,
                            alignItems: 'center',
                          }}
                        >
                          <NextLink
                            noWrap
                            variant="inherit"
                            href={landing.url}
                            passHref
                          >
                            <Link
                              color="primary.main"
                              component="a"
                              underline="none"
                              variant="subtitle2"
                              noWrap
                            >
                              Visit Link
                            </Link>
                          </NextLink>
                          <CallMade
                            sx={{ fontSize: '15px', color: 'primary.main' }}
                          />
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography noWrap variant="inherit">
                          {landing.store_name}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography noWrap variant="inherit" color="inherit">
                          {dinarFormat(landing.price)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography noWrap variant="inherit">
                          {dinarFormat(landing.promo_price)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography noWrap variant="inherit">
                          {landing.start_date}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography noWrap variant="inherit">
                          {landing.end_date}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{landing?.template?.name}</Typography>
                      </TableCell>
                      <TableCell
                        align="right"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <LandingActions
                          onDelete={onDelete}
                          landingid={landing.id}
                        />
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </Scrollbar>
      {displayLoading && <TableLoading />}
      {displayError && (
        <ResourceError
          error={error}
          sx={{
            flexGrow: 1,
            m: 2,
          }}
        />
      )}
      {displayUnavailable && (
        <ResourceUnavailable
          sx={{
            flexGrow: 1,
            m: 2,
          }}
        />
      )}
      <Divider sx={{ mt: 'auto' }} />
      <Pagination
        disabled={isLoading}
        onPageChange={onPageChange}
        page={page}
        pageSize={pageSize}
        rowsCount={0}
      />
    </Box>
  )
}

export default LandingTable
