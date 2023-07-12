import { useEffect, useState } from 'react'

import Proptypes from 'prop-types'
import {
  Collapse,
  Box,
  Button,
  IconButton,
  Divider,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from '@mui/material'
import { Pagination } from '../../pagination'
import { ResourceError } from '../../resource-error'
import { ResourceUnavailable } from '../../resource-unavailable'
import { Scrollbar } from '../../scrollbar'
import { Status } from '../../status'
import { ChevronDown } from '../../../icons/chevron-down'
import { Label } from '@mui/icons-material'
import CommandDetails from './CommandDetails'
import { commandsApi } from '../../../api/commands'
import { useCallback } from 'react'

const ExpandableTableRow = ({ children, expandComponent, ...otherProps }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggle = async () => {
    setIsExpanded(!isExpanded)
    //   if(!isExpanded){
    //     try{
    //      let result= await commandsApi.getCommand(commandId)

    //      setDetails(result)

    //     }
    //    catch(err){
    // console.log(err)
    //    }
    //   }
  }

  return (
    <>
      <TableRow {...otherProps}>
        {children}
        <TableCell
          sx={{
            borderBottom: '0px  ',
          }}
        >
          <IconButton onClick={toggle}>
            <ChevronDown />
          </IconButton>
        </TableCell>
      </TableRow>

      <TableRow
        sx={{
          borderBottom: '1px solid #EAECF0 ',
        }}
      >
        <TableCell colSpan="8">
          <Collapse in={isExpanded}>{expandComponent}</Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}

const columns = [
  {
    id: 'name',
    label: 'Nom et Prénom',
  },
  {
    id: 'phoneNumber',
    label: 'Numéro de telephone',
  },
  {
    id: 'boutique',
    label: 'Boutique',
  },
  {
    id: 'statusCommande',
    label: 'Commande Status',
  },
  {
    id: 'Product',
    label: 'Produit',
  },
  {
    id: 'Prix',
    label: 'Prix',
  },
  {
    id: 'Action',
    label: 'Action',
  },
]

const statusVariants = [
  {
    color: 'info.main',
    label: 'Draft',
    value: 'draft',
  },
  {
    color: 'success.main',
    label: 'Published',
    value: 'published',
  },
]

export const CommandeTable = (props) => {
  const commandId = (index) => {
    SetCurrentCommandId(products[index].id)
  }

  const [currentCommandId, SetCurrentCommandId] = useState(-1)
  const [details, setDetails] = useState(false)
  const [isDetailsLoading, setIsDetailsLoading] = useState(true)
  const {
    error,
    isLoading,
    onPageChange,
    onSelect,
    onSelectAll,
    onSortChange,
    page,
    products,
    productsCount,
    selectedProducts,
    sort,
    sortBy,
  } = props

  const displayLoading = isLoading
  const displayError = Boolean(!isLoading && error)
  const displayUnavailable = Boolean(!isLoading && !error && !products.length)

  return (
    <Box
      sx={{
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
      }}
    >
      <Scrollbar>
        <Table sx={{ minWidth: 800 }}>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id}>
                  <TableSortLabel
                    active={sortBy === column.id}
                    direction={sortBy === column.id ? sort : 'asc'}
                    disabled={isLoading}
                    onClick={(event) => onSortChange(event, column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </TableCell>
              ))}
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product, index) => {
              return (
                <ExpandableTableRow
                  commandId={currentCommandId}
                  hover
                  onMouseOver={() => {
                    commandId(index)
                  }}
                  key={index}
                  expandComponent={<CommandDetails id={product.id} />}
                >
                  <TableCell sx={{ borderBottom: '0px' }}>
                    {product.client_first_name + ' ' + product.client_last_name}
                  </TableCell>
                  <TableCell sx={{ borderBottom: '0px' }}>
                    <div>
                      <Typography color="inherit" variant="body2">
                        {product.client_phone}
                      </Typography>
                    </div>
                  </TableCell>
                  <TableCell sx={{ borderBottom: '0px' }}>
                    {product.store.name}
                  </TableCell>
                  <TableCell sx={{ borderBottom: '0px' }}>
                    <div> {product.status} </div>
                  </TableCell>
                  <TableCell sx={{ borderBottom: '0px' }}>
                    <div> produit </div>
                  </TableCell>
                  <TableCell sx={{ borderBottom: '0px' }}>
                    <div> {product.total_price} </div>
                  </TableCell>
                  <TableCell sx={{ borderBottom: '0px' }}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-evenly',
                      }}
                    >
                      <Button
                        variant="contained"
                        color="success"
                        size="small"
                        sx={{
                          backgroundColor: '#2E7D32',
                        }}
                        onClick={(raw) => {
                          console.log(raw.name)
                        }}
                      >
                        CONFIRM
                      </Button>
                      <Button
                        variant="contained"
                        color="success"
                        size="small"
                        sx={{
                          backgroundColor: '#E65100',
                        }}
                      >
                        FAILED
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        sx={{
                          backgroundColor: '#C62828',
                        }}
                      >
                        CANCEL
                      </Button>
                    </Box>
                  </TableCell>
                </ExpandableTableRow>
              )
            })}
          </TableBody>
        </Table>
      </Scrollbar>
      {displayLoading && (
        <Box sx={{ p: 2 }}>
          <Skeleton height={42} />
          <Skeleton height={42} />
          <Skeleton height={42} />
        </Box>
      )}
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
        rowsCount={productsCount}
      />
    </Box>
  )
}

CommandeTable.defaultProps = {
  page: 1,
  products: [],
  productsCount: 0,
  selectedProducts: [],
  sort: 'desc',
  sortBy: 'createdAt',
}

CommandeTable.propTypes = {
  error: Proptypes.string,
  isLoading: Proptypes.bool,
  onPageChange: Proptypes.func,
  onSelect: Proptypes.func,
  onSelectAll: Proptypes.func,
  onSortChange: Proptypes.func,
  page: Proptypes.number,
  products: Proptypes.array,
  productsCount: Proptypes.number,
  selectedProducts: Proptypes.array,
  sort: Proptypes.oneOf(['asc', 'desc']),
  sortBy: Proptypes.string,
}
